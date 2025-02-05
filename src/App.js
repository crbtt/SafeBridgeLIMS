import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    // Sample Info
    reportNumber: 'SB',
    sampleLocation: '',
    sampleCollectedBy: '',
    analyte: '',
    samplesReceived: '',
    totalSamplesReceived: '',
    numberSamplesAnalyzed: '',
    conditionsUponArrival: '',
    storageConditions: 'Refrigerated at ~-20C',

    // Client Info
    clientName: '',
    clientCompany: '',
    clientEmail: '',

    // Analysis Info
    dateRangeOfExtraction: '',
    analysisStartDate: '',
    analysisEndDate: '',

    // Air Samples
    airMediaType: '',
    airMethodUsed: '',

    // Surface Samples
    surfaceMediaType: '',
    surfaceMethodUsed: '',

    // Preparer Info
    reportPreparedBy: '',
    preparerRole: '',
    additionalChemist: '',

    // Reviewer Info
    reportReviewedBy: '',
    reviewerRole: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Automatically update numberSamplesAnalyzed when totalSamplesReceived changes
    if (name === 'totalSamplesReceived') {
      setFormData((prevState) => ({
        ...prevState,
        totalSamplesReceived: value,
        numberSamplesAnalyzed: value,  // Set numberSamplesAnalyzed to match totalSamplesReceived
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
      // I plan to make a success message
  
    } catch (error) {
      console.error('Error:', error);
      // plan to make an error
    } // <-- Missing closing brace added here
  };
  

  return (
    <div className="page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Sample Information */}
          <div className="FormSection">
            <h1 className="SectionTitle">Sample Information</h1>
            <div className="FormContent">
              <label htmlFor="reportNumber">SB####:</label>
              <input
                type="text"
                id="reportNumber"
                name="reportNumber"
                value={formData.reportNumber}
                onChange={handleChange}
              />

              <label htmlFor="sampleLocation">Sample Location:</label>
              <input
                type="text"
                id="sampleLocation"
                name="sampleLocation"
                value={formData.sampleLocation}
                onChange={handleChange}
                placeholder='Site'
              />

              <label htmlFor="sampleCollectedBy">Sample Collected By:</label>
              <input
                type="text"
                id="sampleCollectedBy"
                name="sampleCollectedBy"
                value={formData.sampleCollectedBy}
                onChange={handleChange}
                placeholder='Blaise Pascal'
              />

              <label htmlFor="analyte">Analyte:</label>
              <input
                type="text"
                id="analyte"
                name="analyte"
                value={formData.analyte}
                onChange={handleChange}
                placeholder='Naproxen Sodium'
              />

              <label htmlFor="samplesReceived">Samples Received:</label>
              <input
                type="text"
                id="samplesReceived"
                name="samplesReceived"
                value={formData.samplesReceived}
                onChange={handleChange}
                placeholder='10/31/1517'
              />

              <label htmlFor="totalSamplesReceived">Total Samples Received:</label>
              <input
                type="text"
                id="totalSamplesReceived"
                name="totalSamplesReceived"
                value={formData.totalSamplesReceived}
                onChange={handleChange}
                placeholder='100'
              />

              <label htmlFor="numberSamplesAnalyzed">Number of Samples Analyzed:</label>
              <input
                type="text"
                id="numberSamplesAnalyzed"
                name="numberSamplesAnalyzed"
                value={formData.numberSamplesAnalyzed}
                onChange={handleChange}
                placeholder='100'
              />

              <label htmlFor="conditionsUponArrival">Conditions of Samples Upon Arrival:</label>
              <input
                type="text"
                id="conditionsUponArrival"
                name="conditionsUponArrival"
                value={formData.conditionsUponArrival}
                onChange={handleChange}
                placeholder='Ambient'
              />

              <label htmlFor="storageConditions">Storage Conditions:</label>
              <input
                type="text"
                id="storageConditions"
                name="storageConditions"
                value={formData.storageConditions}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Client Information */}
          <div className="FormSection">
            <h1 className="SectionTitle">Client Information</h1>
            <div className="FormContent">
              <label htmlFor="clientName">Name:</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />

              <label htmlFor="clientCompany">Company:</label>
              <input
                type="text"
                id="clientCompany"
                name="clientCompany"
                value={formData.clientCompany}
                onChange={handleChange}
              />

              <label htmlFor="clientEmail">Email:</label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Analysis Information */}
          <div className="FormSection">
            <h1 className="SectionTitle">Analysis Information</h1>
            <div className="FormContent">
              <label htmlFor="dateRangeOfExtraction">Date Range of Extraction:</label>
              <input
                type="text"
                id="dateRangeOfExtraction"
                name="dateRangeOfExtraction"
                value={formData.dateRangeOfExtraction}
                onChange={handleChange}
              />

              <label htmlFor="analysisStartDate">Analysis Start Date:</label>
              <input
                type="date"
                id="analysisStartDate"
                name="analysisStartDate"
                value={formData.analysisStartDate}
                onChange={handleChange}
              />

              <label htmlFor="analysisEndDate">Analysis End Date:</label>
              <input
                type="date"
                id="analysisEndDate"
                name="analysisEndDate"
                value={formData.analysisEndDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Air Samples */}
          <div className="FormSection">
            <h1 className="SectionTitle">Air Samples</h1>
            <div className="FormContent">
              <label htmlFor="airMediaType">Media Type:</label>
              <input
                type="text"
                id="airMediaType"
                name="airMediaType"
                value={formData.airMediaType}
                onChange={handleChange}
              />

              <label htmlFor="airMethodUsed">Method Used for Quantitation:</label>
              <input
                type="text"
                id="airMethodUsed"
                name="airMethodUsed"
                value={formData.airMethodUsed}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Surface Samples */}
          <div className="FormSection">
            <h1 className="SectionTitle">Surface Samples</h1>
            <div className="FormContent">
              <label htmlFor="surfaceMediaType">Media Type:</label>
              <input
                type="text"
                id="surfaceMediaType"
                name="surfaceMediaType"
                value={formData.surfaceMediaType}
                onChange={handleChange}
              />

              <label htmlFor="surfaceMethodUsed">Method Used for Quantitation:</label>
              <input
                type="text"
                id="surfaceMethodUsed"
                name="surfaceMethodUsed"
                value={formData.surfaceMethodUsed}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Preparer Information */}
          <div className="FormSection">
            <h1 className="SectionTitle">Preparer Information</h1>
            <div className="FormContent">
              <label htmlFor="reportPreparedBy">Report Prepared By:</label>
              <input
                type="text"
                id="reportPreparedBy"
                name="reportPreparedBy"
                value={formData.reportPreparedBy}
                onChange={handleChange}
              />

              <label htmlFor="preparerRole">Role:</label>
              <input
                type="text"
                id="preparerRole"
                name="preparerRole"
                value={formData.preparerRole}
                onChange={handleChange}
              />

              <label htmlFor="additionalChemist">Additional Chemist:</label>
              <input
                type="text"
                id="additionalChemist"
                name="additionalChemist"
                value={formData.additionalChemist}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Reviewer Information */}
          <div className="FormSection">
            <h1 className="SectionTitle">Reviewer Information</h1>
            <div className="FormContent">
              <label htmlFor="reportReviewedBy">Report Reviewed By:</label>
              <select id="reportReviewedBy"
              name="reportReviewedBy" 
              value={formData.reportReviewedBy}
              onChange={handleChange}>
                <option value="WitoldWoroniecki">Witold Woroniecki</option>
                <option value="SeanTang">Sean Tang</option>
              </select>

              <label htmlFor="reviewerRole">Role:</label>
              <input
                type="text"
                id="reviewerRole"
                name="reviewerRole"
                value={formData.reviewerRole}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;
