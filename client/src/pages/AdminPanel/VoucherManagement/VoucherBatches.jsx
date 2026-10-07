import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../config/api';
import './VoucherBatches.module.css';

const VoucherBatches = ({ batches, loading, onRefresh, onBatchUpdated }) => {
  const [editingBatch, setEditingBatch] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdatePrice = async (batchId) => {
    if (!newPrice || newPrice <= 0) {
      setMessage('Please enter a valid price');
      return;
    }

    setUpdating(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_BASE_URL}/vouchers/batches/price`,
        {
          batchId,
          price: parseFloat(newPrice)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage('Price updated successfully!');
      setEditingBatch(null);
      setNewPrice('');

      if (onBatchUpdated) {
        onBatchUpdated();
      }
    } catch (error) {
      console.error('Error updating price:', error);
      setMessage(error.response?.data?.message || 'Error updating price');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'orange';
      case 'depleted':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="batches-loading">
        <div className="spinner"></div>
        <p>Loading batches...</p>
      </div>
    );
  }

  return (
    <div className="voucher-batches">
      <div className="batches-header">
        <h2>Manage Voucher Batches</h2>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {batches.length === 0 ? (
        <div className="no-batches">
          <p>No voucher batches found</p>
          <p>Create your first batch to get started</p>
        </div>
      ) : (
        <div className="batches-grid">
          {batches.map((batch) => (
            <div key={batch.batchId} className="batch-card">
              <div className="batch-header">
                <h3>{batch.course} - {batch.subCourse}</h3>
                <span className={`status status-${getStatusColor(batch.status)}`}>
                  {batch.status}
                </span>
              </div>

              <div className="batch-details">
                <div className="detail-row">
                  <span className="label">Batch ID:</span>
                  <span className="value">{batch.batchId}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Price:</span>
                  <span className="value">
                    {editingBatch === batch.batchId ? (
                      <div className="price-edit">
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          min="0"
                          step="0.01"
                          placeholder={batch.price}
                        />
                        <button
                          onClick={() => handleUpdatePrice(batch.batchId)}
                          disabled={updating}
                          className="update-btn"
                        >
                          {updating ? 'Updating...' : 'Update'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingBatch(null);
                            setNewPrice('');
                          }}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="price-display">
                        {formatCurrency(batch.price)}
                        <button
                          onClick={() => {
                            setEditingBatch(batch.batchId);
                            setNewPrice(batch.price.toString());
                          }}
                          className="edit-btn"
                        >
                          ✏️
                        </button>
                      </div>
                    )}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Total Vouchers:</span>
                  <span className="value">{batch.totalVouchers}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Available:</span>
                  <span className="value">{batch.availableVouchers}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Sold:</span>
                  <span className="value">{batch.soldVouchers}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Used:</span>
                  <span className="value">{batch.usedVouchers}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Created:</span>
                  <span className="value">{formatDate(batch.createdAt)}</span>
                </div>
                {batch.description && (
                  <div className="detail-row">
                    <span className="label">Description:</span>
                    <span className="value">{batch.description}</span>
                  </div>
                )}
              </div>

              <div className="batch-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(batch.soldVouchers / batch.totalVouchers) * 100}%`,
                      backgroundColor: batch.availableVouchers === 0 ? '#dc3545' : '#28a745'
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.round((batch.soldVouchers / batch.totalVouchers) * 100)}% sold
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoucherBatches;
