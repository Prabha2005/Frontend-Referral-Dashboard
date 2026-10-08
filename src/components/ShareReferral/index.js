import { useState } from "react";
import "./index.css";

/**
 * ShareReferral Component
 *
 * NOTE: This component displays a reference demo referral link (https://gobusiness.com/?referral=ABCXYZ)
 * and demo referral code (ABCXYZ) as specified in the reference dashboard design.
 * This is for UI reference and demonstration purposes, not an active tracking implementation.
 */
const ShareReferral = ({ referral = {} }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const link = referral.link || "https://gobusiness.com/?referral=ABCXYZ";
  const code = referral.code || "ABCXYZ";

  const copyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.warn("Could not copy link:", err);
    }
  };

  const copyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const el = document.createElement("textarea");
        el.value = code;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.warn("Could not copy code:", err);
    }
  };

  return (
    <section className="share-section">
      <h2>Refer friends and earn more</h2>

      <div className="share-grid">
        <div className="share-item">
          <label htmlFor="ref-link-input">YOUR REFERRAL LINK</label>
          <div className="copy-container">
            <input
              id="ref-link-input"
              type="text"
              value={link}
              readOnly
            />
            <button
              type="button"
              className={`copy-button ${copiedLink ? "copied" : ""}`}
              onClick={copyLink}
            >
              {copiedLink ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="share-item">
          <label htmlFor="ref-code-input">YOUR REFERRAL CODE</label>
          <div className="copy-container">
            <input
              id="ref-code-input"
              type="text"
              value={code}
              readOnly
            />
            <button
              type="button"
              className={`copy-button ${copiedCode ? "copied" : ""}`}
              onClick={copyCode}
            >
              {copiedCode ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareReferral;