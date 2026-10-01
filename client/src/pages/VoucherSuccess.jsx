import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VoucherSuccess.module.css';

const VoucherSuccess = () => {
  const [searchParams] = useSearchParams();
  const [purchaseData, setPurchaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const purchaseId = searchParams.get('purchaseId');

  useEffect(() => {
    if (purchaseId) {
      // In a real implementation, you would fetch the purchase details
      // For now, we'll simulate the success state
      setPurchaseData({
        purchaseId,
        voucherCode: 'DEMO-VOUCHER-123',
        course: 'Microsoft',
        subCourse: 'MicrosoftAzureFundamentals',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        amount: 1599
      });
      setLoading(false);
    }
  }, [purchaseId]);

  if (loading) {
    return (
      <div className="voucher-success-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Processing your purchase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="voucher-success-page">
        <div className="error-container">
          <h1>❌ Purchase Error</h1>
          <p>{error}</p>
          <Link to="/training" className="back-btn">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="voucher-success-page">
      <div className="success-container">
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1>Purchase Successful!</h1>
          <p>Your voucher has been purchased and sent to your email</p>
        </div>

        <div className="voucher-details">
          <h2>Voucher Details</h2>
          <div className="detail-card">
            <div className="detail-row">
              <span className="label">Purchase ID:</span>
              <span className="value">{purchaseData?.purchaseId}</span>
            </div>
            <div className="detail-row">
              <span className="label">Voucher Code:</span>
              <span className="value voucher-code">{purchaseData?.voucherCode}</span>
            </div>
            <div className="detail-row">
              <span className="label">Course:</span>
              <span className="value">{purchaseData?.course} - {purchaseData?.subCourse}</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount Paid:</span>
              <span className="value">${purchaseData?.amount}</span>
            </div>
            <div className="detail-row">
              <span className="label">Customer:</span>
              <span className="value">{purchaseData?.customerName}</span>
            </div>
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{purchaseData?.customerEmail}</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>Next Steps</h3>
          <div className="steps-list">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Check Your Email</h4>
                <p>You'll receive a detailed email with your voucher code and instructions</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Use Your Voucher</h4>
                <p>Use the voucher code when registering for your certification exam</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Get Certified</h4>
                <p>Take your exam and earn your certification</p>
              </div>
            </div>
          </div>
        </div>

        <div className="support-info">
          <h3>Need Help?</h3>
          <p>If you have any questions about your voucher or need assistance, please contact our support team:</p>
          <div className="support-options">
            <a href="mailto:register@studygrinder.com" className="support-btn">
              📧 Email Support
            </a>
            <a href="tel:+44 1253 928501" className="support-btn">
              📞 Call Support
            </a>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/training" className="secondary-btn">
            Browse More Courses
          </Link>
          <Link to="/" className="primary-btn">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoucherSuccess;
