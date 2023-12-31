import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { deleteUserCredentials } from '../logic/cookie';

interface Props {
  onClose: () => void; // Specify the type of onClose as a function that takes no arguments and returns void
}

const Settings: React.FC<Props> = ({ onClose }) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true); // state to control visibility
  const [isReportVisible, setIsReportVisible] = useState(false); // state to control report form visibility
  const [reportMessage, setReportMessage] = useState(''); // state to store the report message
  const navigate = useNavigate();

  // Handler to show the report form
  const handleReportOpen = () => {
    setIsReportVisible(true); // Show the report form
  };
  const handleReportSubmit = () => {  // Handler for submitting the report
    
    setReportMessage(''); // Clear the report message
    setIsReportVisible(false); // Hide the report form
    // Here you would handle the report submission to your backend
  };
  const handleGoBack = () => {
    setIsReportVisible(false); // Hide the report form to show settings list
    setStatusMessage(''); // Optionally clear any status messages
  };
  const handleLogout = () => {
    deleteUserCredentials();
    navigate("/login")
  };
  // Handler for closing the settings component
  const handleClose = () => {
    onClose();// Invoke the passed onClose function
    setIsVisible(false); // When the button is clicked, set the visibility to false
  };

  // Return null if the component should not be visible
  if (!isVisible) return null;
  const containerClass = isReportVisible ? "settings-container large" : "settings-container";
  return (
    <div className={containerClass}>
      <div className="settings-header">
        {isReportVisible ? (
          <>
            <span>Report a Problem</span>
            <button className="back-button" onClick={handleGoBack}>
              <span className="material-icons">arrow_back</span>
            </button>
          </>
        ) : (
          <>
         <span>Settings</span>
          <span><button className='generic-close-button' onClick={handleClose}></button></span>
           
          </>
        )}
      </div>
   
      {isReportVisible ? (
        <div className="report-form">
          <div className="textarea-container">
            <textarea
              value={reportMessage}
              onChange={(e) => setReportMessage(e.target.value)}
              placeholder="Describe the problem..."
            ></textarea>
          </div>
          <div className="button-container">
            <button className='generic-btn' onClick={handleReportSubmit}>Report!</button>
          </div>
        </div>
      ) : (
        <ul className="settings-list">
          <li className="settings-item" onClick={handleReportOpen}>
            <span className="icon">🚩</span> Report a problem
          </li>
          <li className="settings-item" onClick={handleLogout}>
            <span className="icon">↩️</span> Log out
          </li>
        </ul>
      )}
      {statusMessage && <div className="status-message">{statusMessage}</div>}
   
    </div>
  );
}

export default Settings;