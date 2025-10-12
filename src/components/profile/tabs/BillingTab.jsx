import React, { useState } from 'react';

const BillingTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Premium Platform Subscription - Pro Plan',
      amount: '$19.99',
      status: 'paid',
      invoiceId: 'INV-001'
    },
    {
      id: 2,
      date: '2023-12-15',
      description: 'Premium Platform Subscription - Pro Plan',
      amount: '$19.99',
      status: 'paid',
      invoiceId: 'INV-002'
    },
    {
      id: 3,
      date: '2023-11-15',
      description: 'Premium Platform Subscription - Pro Plan',
      amount: '$19.99',
      status: 'paid',
      invoiceId: 'INV-003'
    },
    {
      id: 4,
      date: '2023-10-15',
      description: 'Premium Platform Subscription - Essential Plan',
      amount: '$9.99',
      status: 'paid',
      invoiceId: 'INV-004'
    }
  ];

  const currentSubscription = {
    plan: 'Pro',
    price: '$19.99',
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    status: 'active'
  };

  const earnings = {
    thisMonth: '$1,245.67',
    lastMonth: '$1,189.23',
    total: '$15,678.90',
    pending: '$234.56'
  };

  const handlePaymentMethodAction = (id, action) => {
    alert(`${action} payment method ${id} (demo)`);
  };

  const handleChangePlan = () => {
    alert('Redirect to plan selection (demo)');
  };

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      alert('Subscription cancelled (demo)');
    }
  };

  const handleDownloadInvoice = (invoiceId) => {
    alert(`Download invoice ${invoiceId} (demo)`);
  };

  const handleWithdrawEarnings = () => {
    alert('Withdraw earnings (demo)');
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      paid: 'success',
      pending: 'warning',
      failed: 'error'
    };
    return `status-badge ${statusColors[status] || 'default'}`;
  };

  return (
    <div className="billing-tab">
      <div className="tab-header">
        <h2>Billing & Payments</h2>
        <p>Manage your subscription, payments, and earnings</p>
      </div>

      <div className="billing-overview">
        <div className="overview-cards">
          <div className="overview-card">
            <h3>Current Plan</h3>
            <div className="plan-info">
              <div className="plan-name">{currentSubscription.plan}</div>
              <div className="plan-price">{currentSubscription.price}/{currentSubscription.billingCycle}</div>
              <div className="plan-status">
                <span className={getStatusBadge(currentSubscription.status)}>
                  {currentSubscription.status}
                </span>
              </div>
            </div>
            <div className="next-billing">
              Next billing: {currentSubscription.nextBilling}
            </div>
          </div>

          <div className="overview-card">
            <h3>Monthly Earnings</h3>
            <div className="earnings-info">
              <div className="earnings-amount">{earnings.thisMonth}</div>
              <div className="earnings-change">
                +$56.44 from last month
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="billing-sections">
        <div className="billing-section">
          <h3>Current Subscription</h3>
          <div className="subscription-details">
            <div className="subscription-info">
              <div className="subscription-plan">
                <h4>Premium Platform - {currentSubscription.plan} Plan</h4>
                <p>Full access to premium features and content</p>
              </div>
              <div className="subscription-pricing">
                <div className="current-price">{currentSubscription.price}/{currentSubscription.billingCycle}</div>
                <div className="next-billing">Renews on {currentSubscription.nextBilling}</div>
              </div>
            </div>
            <div className="subscription-actions">
              <button className="btn-secondary" onClick={handleChangePlan}>
                Change Plan
              </button>
              <button className="btn-danger" onClick={handleCancelSubscription}>
                Cancel Subscription
              </button>
            </div>
          </div>

          <div className="billing-cycle-toggle">
            <h4>Billing Cycle</h4>
            <div className="toggle-buttons">
              <button 
                className={`toggle-btn ${selectedPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`toggle-btn ${selectedPeriod === 'annual' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('annual')}
              >
                Annual <span className="save-badge">Save 17%</span>
              </button>
            </div>
            <p>Switch to annual billing and save money on your subscription</p>
          </div>
        </div>

        <div className="billing-section">
          <h3>Payment Methods</h3>
          <div className="payment-methods">
            {paymentMethods.map(method => (
              <div key={method.id} className="payment-method">
                <div className="method-info">
                  <div className="method-icon">
                    {method.brand === 'Visa' && '💳'}
                    {method.brand === 'Mastercard' && '💳'}
                  </div>
                  <div className="method-details">
                    <div className="method-brand">{method.brand} •••• {method.last4}</div>
                    <div className="method-expiry">Expires {method.expiryMonth}/{method.expiryYear}</div>
                  </div>
                  {method.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                </div>
                <div className="method-actions">
                  <button 
                    className="action-btn secondary"
                    onClick={() => handlePaymentMethodAction(method.id, 'Edit')}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn danger"
                    onClick={() => handlePaymentMethodAction(method.id, 'Remove')}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary">+ Add Payment Method</button>
        </div>

        <div className="billing-section">
          <h3>Creator Earnings</h3>
          <div className="earnings-dashboard">
            <div className="earnings-stats">
              <div className="earnings-stat">
                <div className="stat-label">This Month</div>
                <div className="stat-value">{earnings.thisMonth}</div>
              </div>
              <div className="earnings-stat">
                <div className="stat-label">Last Month</div>
                <div className="stat-value">{earnings.lastMonth}</div>
              </div>
              <div className="earnings-stat">
                <div className="stat-label">Total Earned</div>
                <div className="stat-value">{earnings.total}</div>
              </div>
              <div className="earnings-stat">
                <div className="stat-label">Pending</div>
                <div className="stat-value">{earnings.pending}</div>
              </div>
            </div>
            
            <div className="earnings-actions">
              <button className="btn-primary" onClick={handleWithdrawEarnings}>
                Withdraw Available Balance
              </button>
              <button className="btn-secondary">View Detailed Report</button>
            </div>

            <div className="payout-info">
              <h4>Payout Information</h4>
              <div className="payout-details">
                <div className="payout-item">
                  <span className="payout-label">Bank Account:</span>
                  <span className="payout-value">•••• •••• •••• 1234</span>
                  <button className="btn-link">Update</button>
                </div>
                <div className="payout-item">
                  <span className="payout-label">Payout Schedule:</span>
                  <span className="payout-value">Weekly (Fridays)</span>
                  <button className="btn-link">Change</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="billing-section">
          <h3>Billing History</h3>
          <div className="billing-table">
            <div className="table-header">
              <div className="table-filters">
                <select className="filter-select">
                  <option value="all">All Transactions</option>
                  <option value="subscriptions">Subscriptions</option>
                  <option value="earnings">Earnings</option>
                </select>
                <select className="filter-select">
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
            
            <div className="transactions-list">
              {billingHistory.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-date">{transaction.date}</div>
                    <div className="transaction-description">{transaction.description}</div>
                  </div>
                  <div className="transaction-amount">{transaction.amount}</div>
                  <div className="transaction-status">
                    <span className={getStatusBadge(transaction.status)}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="transaction-actions">
                    <button 
                      className="btn-link"
                      onClick={() => handleDownloadInvoice(transaction.invoiceId)}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="billing-section">
          <h3>Tax Information</h3>
          <div className="tax-info">
            <div className="tax-documents">
              <h4>Tax Documents</h4>
              <div className="documents-list">
                <div className="document-item">
                  <span className="document-name">2023 Tax Summary</span>
                  <button className="btn-secondary small">Download</button>
                </div>
                <div className="document-item">
                  <span className="document-name">2022 Tax Summary</span>
                  <button className="btn-secondary small">Download</button>
                </div>
              </div>
            </div>
            
            <div className="tax-settings">
              <h4>Tax Settings</h4>
              <div className="tax-form">
                <div className="form-group">
                  <label>Tax ID / SSN</label>
                  <input type="text" className="form-input" placeholder="•••-••-••••" disabled />
                  <button className="btn-link">Update</button>
                </div>
                <div className="form-group">
                  <label>Tax Country</label>
                  <select className="form-select" disabled>
                    <option>United States</option>
                  </select>
                  <button className="btn-link">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTab;