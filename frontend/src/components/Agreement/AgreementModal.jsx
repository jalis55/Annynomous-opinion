import React,{useState} from 'react';

const AgreementModal = ({setShowTerms}) => {
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
            <h1 className="text-center mb-4">Terms and Conditions</h1>
            <div className="terms-content p-3">
                <p>✓ All posts and comments are anonymous. Do not share personal information.</p>
                <p>✓ Be respectful. Do not post offensive, abusive, hateful, defamatory, or discriminatory content.</p>
                <p>✓ Do not post illegal content or encourage illegal activities.</p>
                <p>✓ Do not distribute spam or irrelevant content.</p>
                <p>✓ You are responsible for the content you post and comment on.</p>
                <p>✓ We do not endorse any thoughts or comments shared on this platform.</p>
                <p>✓ We reserve the right to monitor and moderate content. Content that violates these terms may be removed without notice.</p>
                <p>✓ This application is provided "as is." We do not guarantee the accuracy, completeness, or reliability of any content.</p>
                <p>✓ We are not liable for any damages or losses resulting from your use of the application.</p>
                <p>✓ By using this application, you confirm that you have read, understood, and agree to these terms and conditions.</p>

                
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
