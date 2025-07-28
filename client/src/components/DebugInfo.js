import React, { useState } from 'react';
import axios from 'axios';

const DebugInfo = () => {
  const [apiStatus, setApiStatus] = useState('');
  const [testResult, setTestResult] = useState('');

  const testAPI = async () => {
    try {
      console.log('API URL:', process.env.REACT_APP_API_URL);
      console.log('Axios base URL:', axios.defaults.baseURL);
      
      const response = await axios.get('/');
      setApiStatus('✅ API is working: ' + JSON.stringify(response.data));
    } catch (error) {
      setApiStatus('❌ API Error: ' + error.message);
      console.error('API Error:', error);
    }
  };

  const testRegistration = async () => {
    try {
      const response = await axios.post('/api/auth/register', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      setTestResult('✅ Registration successful: ' + JSON.stringify(response.data));
    } catch (error) {
      setTestResult('❌ Registration failed: ' + error.response?.data?.message || error.message);
      console.error('Registration Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h3>🔍 Debug Information</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>API URL:</strong> {process.env.REACT_APP_API_URL || 'Not set'}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Axios Base URL:</strong> {axios.defaults.baseURL || 'Not set'}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testAPI} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Test API Connection
        </button>
        <button onClick={testRegistration} style={{ padding: '8px 16px' }}>
          Test Registration
        </button>
      </div>
      
      {apiStatus && (
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
          <strong>API Status:</strong> {apiStatus}
        </div>
      )}
      
      {testResult && (
        <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
          <strong>Test Result:</strong> {testResult}
        </div>
      )}
    </div>
  );
};

export default DebugInfo; 