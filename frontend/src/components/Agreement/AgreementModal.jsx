import React, { useState } from 'react';

const AgreementModal = ({ setShowTerms }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleAgreeButtonClick = () => {
        localStorage.setItem('hasAgreedToTerms', 'true');
        setShowTerms(false);
    };


    return (
        <div className="container my-5 p-5 shadow-lg rounded" id="terms-container">
            <div className="terms-content p-3">
                <h4>Site Rules (last updated 2025-11-12)</h4>
                <ol>
                    <li><strong>100 % anonymous.</strong> Never post anything that could identify you or anyone else (names, addresses, phone numbers, e-mail, social handles, photos, etc.).</li>

                    <li><strong>Be respectful.</strong> No hate speech, harassment, threats, or content that attacks a person or group on the basis of race, ethnicity, national origin, religion, gender, sexual orientation, disability, medical condition, or veteran status.</li>

                    <li><strong>Nothing illegal.</strong> Do not post child-sexual material, non-consensual intimate imagery, copyrighted works you don’t own, or anything that encourages serious imminent crime.</li>

                    <li><strong>No spam or disruption.</strong> Spam = repetitive, off-topic, promotional, or bot-generated posts that impair the service.</li>

                    <li><strong>You are legally responsible</strong> for every post or comment you make. You agree to indemnify us against any claim or cost (including legal fees) arising from your content.</li>

                    <li><strong>Moderation.</strong> We may remove or edit any content, ban any user, and disclose anything to law-enforcement when required, with or without notice.</li>

                    <li><strong>Report abuse.</strong> Use the “⚠️ Report” link under every post. After three validated violations from the same source we will permanently ban it.</li>

                    <li><strong>Copyright (DMCA).</strong> If your copyrighted work appears here without permission, e-mail a DMCA notice to <strong>dmca@YOURDOMAIN.com</strong>. We will act expeditiously.</li>

                    <li><strong>Age.</strong> You must be at least 13 years old to use this site. We do not knowingly collect data from children under 13.</li>

                    <li><strong>“As-is” service.</strong> We provide no warranty and are not liable for any damages, data loss, or downtime.</li>

                    <li><strong>Changes.</strong> We may update these rules at any time; continued use means you accept the new version.</li>

                    <li><strong>Governing law.</strong> These terms are governed by the laws of <strong>YOUR-STATE/COUNTRY</strong>; disputes go to courts in <strong>YOUR-CITY</strong>.</li>

                    <li><strong>Acceptance.</strong> By using this application you confirm that you have read, understood, and agreed to these rules.</li>
                </ol>
            </div>
            <div className="form-check my-4">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeCheckbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="agreeCheckbox">I agree with the terms and conditions</label>
            </div>
            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    id="agreeButton"
                    disabled={!isChecked}
                    onClick={handleAgreeButtonClick}
                >
                    I agree with the terms and conditions
                </button>
            </div>
        </div>
    )
}

export default AgreementModal;
