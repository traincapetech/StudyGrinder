import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppPopup = ({ 
  position = "fixed", 
  bottom = "20px", 
  right = "20px",
  size = "60px",
  className = ""
}) => {
  const [showPopup, setShowPopup] = useState(false);

  // const handleIndiaClick = () => {
  //   window.open("https://wa.me/+916280281505", "_blank");
  //   setShowPopup(false);
  // };

  const handleInternationalClick = () => {
    window.open("https://wa.me/+447353049644", "_blank");
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  return (
    <>
      {/* WhatsApp Icon */}
      <div
        className={`whatsapp-icon ${className}`}
        style={{
          position: position,
          bottom: bottom,
          right: right,
          zIndex: 1000,
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
        onClick={() => setShowPopup(true)}
        onMouseEnter={(e) => {
          const iconDiv = e.target.querySelector('div');
          if (iconDiv) {
            iconDiv.style.transform = 'scale(1.1)';
            iconDiv.style.backgroundColor = '#128C7E';
          }
        }}
        onMouseLeave={(e) => {
          const iconDiv = e.target.querySelector('div');
          if (iconDiv) {
            iconDiv.style.transform = 'scale(1)';
            iconDiv.style.backgroundColor = '#25D366';
          }
        }}
      >
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <FaWhatsapp 
            size={parseInt(size) * 0.6} 
            color="white"
            style={{
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className="whatsapp-popup"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={handleBackdropClick}
        >
          <div
            className="popup-content"
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              animation: 'slideIn 0.3s ease'
            }}
          >
            <h3 style={{
              margin: '0 0 20px 0',
              color: '#333',
              fontSize: '24px'
            }}>
              Select your region
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              margin: '20px 0'
            }}>
              {/* <button
                onClick={handleIndiaClick}
                style={{
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  background: '#25D366',
                  color: '#fff',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🇮🇳 India
              </button> */}
              
              <button
                onClick={handleInternationalClick}
                style={{
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  background: '#128C7E',
                  color: '#fff',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                🌍 Connect on WhatsApp
              </button>
            </div>
            
            <button
              onClick={handleClose}
              style={{
                background: '#ccc',
                color: '#333',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '10px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#bbb'}
              onMouseLeave={(e) => e.target.style.background = '#ccc'}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations - Using CSS-in-JS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 480px) {
          .popup-content {
            margin: 20px;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppPopup;
