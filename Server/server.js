const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());  // Allows parsing JSON bodies
app.use(cors());         // Enables Cross-Origin Resource Sharing

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'johncorbett',
    host: 'localhost',
    database: 'safebridge',
    password: 'Safebridge',
    port: 5432,
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Main form submission endpoint
app.post('/submit', async (req, res) => {
    const data = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');  // Start transaction

        // 1. Insert client information
        const clientQuery = `
            INSERT INTO ClientID (email, name, company)
            VALUES ($1, $2, $3)
            RETURNING client_id;
        `;
        const clientResult = await client.query(clientQuery, [
            data.clientEmail,
            data.clientName,
            data.clientCompany
        ]);
        const clientId = clientResult.rows[0].client_id;

        // 2. Insert client intake information
        const intakeQuery = `
            INSERT INTO ClientIntake (
                client_id, 
                num_samples,
                site_sampling,
                sample_collector,
                reporting_unit_air,
                reporting_unit_surface,
                method
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING sbreport;
        `;
        const intakeResult = await client.query(intakeQuery, [
            clientId,
            parseInt(data.totalSamplesReceived),
            data.sampleLocation,
            data.sampleCollectedBy,
            data.airMediaType,
            data.surfaceMediaType,
            data.airMethodUsed || data.surfaceMethodUsed
        ]);
        const sbreport = intakeResult.rows[0].sbreport;

        // 3. Insert analysis information
        const analysisQuery = `
            INSERT INTO AnalysisReporterInfo (
                sbreport,
                num_samples_analyzed,
                conditions_upon_arrival,
                storage_conditions,
                extraction_date,
                analysis_start_date,
                analysis_end_date,
                preparer_id,
                reviewer_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
        `;
        await client.query(analysisQuery, [
            sbreport,
            parseInt(data.numberSamplesAnalyzed),
            data.conditionsUponArrival,
            data.storageConditions,
            data.dateRangeOfExtraction,
            data.analysisStartDate,
            data.analysisEndDate,
            data.reportPreparedBy,  // You might want to use a lookup table for this
            data.reportReviewedBy   // You might want to use a lookup table for this
        ]);

        await client.query('COMMIT');
        res.status(201).json({
            message: 'Form submitted successfully',
            sbreport: sbreport
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Database error:', error);
        res.status(500).json({
            error: 'Failed to process form submission',
            details: error.message
        });
    } finally {
        client.release();
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        details: err.message
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});