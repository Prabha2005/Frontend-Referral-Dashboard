import "./index.css"

const ShareReferral = ({referral}) => {
    const copyLink = () => {
        navigator.clipboard.writeText(referral.link);
    };
    const copyCode = () => {
    navigator.clipboard.writeText(referral.code);
};

    return (
        <section className="share-section">
            <h2> Refer friends and earn more </h2>

            <div className="share-grid">
                <div className="share-item">
                    <label>Your Referral Link </label>

                    <div className="copy-container">
                    <input
                    type="text"
                    value={referral.link}
                    readOnly
                    />
                    <button type="button" onClick={copyLink}>
                        Copy
                    </button>
                    </div>
                    </div> 

                    <div className="share-item">
                        <label>Your Referral Code</label>
                        <div className="copy-container">
                            <input
                            type="text"
                            value={referral.code}
                            readOnly
                            />
                            <button type="button" onClick={copyCode}>Copy</button>
                        </div>
                    </div>


            </div>
        </section>
    );
};

export default ShareReferral;