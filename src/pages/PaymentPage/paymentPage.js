import React, { useState } from "react";
import { FaCreditCard, FaUniversity, FaRocket } from "react-icons/fa";
import "./paymentPage.css";

const PaymentPage = () => {
  const [billingName, setBillingName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [plan, setPlan] = useState("annual");

  return (
    <div className="payment-page">
      <div className="payment-left">
        <h2>Upgrade to Plus</h2>
        <p>Do more with unlimited blocks, files, automations & integrations.</p>
        <div className="billing-section">
          <label htmlFor="billing-name">Billed To</label>
          <input
            type="text"
            id="billing-name"
            value={billingName}
            onChange={(e) => setBillingName(e.target.value)}
            placeholder="Account Name"
          />
        </div>
        <div className="payment-details">
          <h3>Payment Details</h3>
          <div className="payment-methods">
            <button
              className={`payment-method ${paymentMethod === "Credit Card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Credit Card")}
            >
              <FaCreditCard /> Credit Card
            </button>
            <button
              className={`payment-method ${paymentMethod === "Bank Transfer" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Bank Transfer")}
            >
              <FaUniversity /> Bank Transfer
            </button>
            <button
              className={`payment-method ${paymentMethod === "Cosmic Points" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Cosmic Points")}
            >
              <FaRocket /> Cosmic Points
            </button>
          </div>
          {paymentMethod === "Credit Card" && (
            <div className="credit-card-info">
              <input type="text" placeholder="Card Number" />
              <div className="card-expiry-cvc">
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVC" />
              </div>
              <input type="text" placeholder="Country" />
              <input type="text" placeholder="Zip Code" />
            </div>
          )}
        </div>
        <div className="payment-actions">
          <button className="cancel-button">Cancel</button>
          <button className="subscribe-button">Subscribe</button>
        </div>
        <p className="payment-note">
          By providing your card information, you allow us to charge your card for future payments in accordance with their terms.
        </p>
      </div>
      <div className="payment-right">
        <h3>Starter Plan</h3>
        <div className="plan-options">
          <label>
            <input
              type="radio"
              name="plan"
              value="monthly"
              checked={plan === "monthly"}
              onChange={() => setPlan("monthly")}
            />
            Pay Monthly <span>$20 / Month / Member</span>
          </label>
          <label>
            <input
              type="radio"
              name="plan"
              value="annual"
              checked={plan === "annual"}
              onChange={() => setPlan("annual")}
            />
            Pay Annual <span className="save-tag">Save 15%</span> <span>$16 / Month / Member</span>
          </label>
        </div>
        <div className="total-section">
          <h3>Total</h3>
          <p>{plan === "monthly" ? "$20 / Month" : "$16 / Month"}</p>
          <p className="security-note">
            🔒 Guaranteed to be safe & secure, ensuring that all transactions are protected with the highest level of security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
