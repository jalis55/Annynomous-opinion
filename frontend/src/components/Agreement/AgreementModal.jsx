import React, { useState } from 'react';

const content = {
    en: {
        lang: 'EN',
        altLang: 'বাংলা',
        title: 'Site Rules',
        updated: '(last updated 2025-11-12)',
        rules: [
            {
                heading: '100% Anonymous.',
                body: 'Never post anything that could identify you or anyone else (names, addresses, phone numbers, e-mail, social handles, photos, etc.).'
            },
            {
                heading: 'Be respectful.',
                body: 'No hate speech, harassment, threats, or content that attacks a person or group on the basis of race, ethnicity, national origin, religion, gender, sexual orientation, disability, medical condition, or veteran status.'
            },
            {
                heading: 'Nothing illegal.',
                body: "Do not post child-sexual material, non-consensual intimate imagery, copyrighted works you don't own, or anything that encourages serious imminent crime."
            },
            {
                heading: 'No spam or disruption.',
                body: 'Spam = repetitive, off-topic, promotional, or bot-generated posts that impair the service.'
            },
            {
                heading: 'You are legally responsible',
                body: 'for every post or comment you make. You agree to indemnify us against any claim or cost (including legal fees) arising from your content.'
            },
            {
                heading: 'Moderation.',
                body: 'We may remove or edit any content, ban any user, and disclose anything to law-enforcement when required, with or without notice.'
            },
            {
                heading: 'Report abuse.',
                body: 'Use the "⚠️ Report" link under every post. After three validated violations from the same source we will permanently ban it.'
            },
            {
                heading: 'Copyright (DMCA).',
                body: 'If your copyrighted work appears here without permission, e-mail a DMCA notice to dmca@YOURDOMAIN.com. We will act expeditiously.'
            },
            {
                heading: 'Age.',
                body: 'You must be at least 13 years old to use this site. We do not knowingly collect data from children under 13.'
            },
            {
                heading: '"As-is" service.',
                body: 'We provide no warranty and are not liable for any damages, data loss, or downtime.'
            },
            {
                heading: 'Changes.',
                body: 'We may update these rules at any time; continued use means you accept the new version.'
            },
            {
                heading: 'Governing law.',
                body: 'These terms are governed by the laws of YOUR-STATE/COUNTRY; disputes go to courts in YOUR-CITY.'
            },
            {
                heading: 'Acceptance.',
                body: 'By using this application you confirm that you have read, understood, and agreed to these rules.'
            },
        ],
        checkboxLabel: 'I agree with the terms and conditions',
        buttonLabel: 'I Agree',
    },
    bn: {
        lang: 'বাংলা',
        altLang: 'EN',
        title: 'সাইটের নিয়মাবলী',
        updated: '(সর্বশেষ আপডেট: ২০২৫-১১-১২)',
        rules: [
            {
                heading: '১০০% বেনামী।',
                body: 'কখনো এমন কিছু পোস্ট করবেন না যা আপনাকে বা অন্য কাউকে সনাক্ত করতে পারে (নাম, ঠিকানা, ফোন নম্বর, ইমেইল, সোশ্যাল হ্যান্ডেল, ছবি ইত্যাদি)।'
            },
            {
                heading: 'সম্মানজনক আচরণ করুন।',
                body: 'ঘৃণামূলক বক্তব্য, হয়রানি, হুমকি বা জাতি, ধর্ম, লিঙ্গ, যৌন অভিমুখীতা, প্রতিবন্ধীতা বা অন্য কোনো ভিত্তিতে কাউকে আক্রমণ করে এমন কোনো বিষয়বস্তু পোস্ট করবেন না।'
            },
            {
                heading: 'অবৈধ কিছু নয়।',
                body: 'শিশু-যৌন সামগ্রী, অসম্মতিমূলক অন্তরঙ্গ চিত্র, আপনার অনুমতিবিহীন কপিরাইটযুক্ত কাজ বা গুরুতর অপরাধে উৎসাহিত করে এমন কিছু পোস্ট করবেন না।'
            },
            {
                heading: 'স্প্যাম বা বিঘ্ন নয়।',
                body: 'স্প্যাম = পুনরাবৃত্তিমূলক, বিষয়বহির্ভূত, প্রচারমূলক বা বট-তৈরি পোস্ট যা সেবাকে ক্ষতিগ্রস্ত করে।'
            },
            {
                heading: 'আপনি আইনগতভাবে দায়বদ্ধ',
                body: 'আপনার প্রতিটি পোস্ট বা মন্তব্যের জন্য। আপনি সম্মত হন যে আপনার বিষয়বস্তু থেকে উদ্ভূত যেকোনো দাবি বা খরচের (আইনি ফি সহ) বিরুদ্ধে আমাদের ক্ষতিপূরণ দেবেন।'
            },
            {
                heading: 'মডারেশন।',
                body: 'আমরা যেকোনো বিষয়বস্তু সরাতে বা সম্পাদনা করতে, যেকোনো ব্যবহারকারীকে নিষিদ্ধ করতে এবং প্রয়োজনে নোটিশ ছাড়াই আইন প্রয়োগকারী সংস্থার কাছে তথ্য প্রকাশ করতে পারি।'
            },
            {
                heading: 'অপব্যবহার রিপোর্ট করুন।',
                body: 'প্রতিটি পোস্টের নিচে "⚠️ রিপোর্ট" লিঙ্ক ব্যবহার করুন। একই উৎস থেকে তিনটি যাচাইকৃত লঙ্ঘনের পরে আমরা স্থায়ীভাবে নিষিদ্ধ করব।'
            },
            {
                heading: 'কপিরাইট (DMCA)।',
                body: 'যদি আপনার কপিরাইটযুক্ত কাজ এখানে অনুমতি ছাড়া প্রকাশিত হয়, তাহলে dmca@YOURDOMAIN.com-এ একটি DMCA নোটিশ পাঠান। আমরা দ্রুত ব্যবস্থা নেব।'
            },
            {
                heading: 'বয়স।',
                body: 'এই সাইট ব্যবহার করতে আপনার বয়স কমপক্ষে ১৩ বছর হতে হবে। আমরা ১৩ বছরের কম বয়সীদের থেকে জ্ঞাতসারে তথ্য সংগ্রহ করি না।'
            },
            {
                heading: '"যেমন আছে" সেবা।',
                body: 'আমরা কোনো ওয়ারেন্টি প্রদান করি না এবং কোনো ক্ষতি, ডেটা হারানো বা ডাউনটাইমের জন্য দায়বদ্ধ নই।'
            },
            {
                heading: 'পরিবর্তন।',
                body: 'আমরা যেকোনো সময় এই নিয়মগুলি আপডেট করতে পারি; অব্যাহত ব্যবহার মানে আপনি নতুন সংস্করণ গ্রহণ করেছেন।'
            },
            {
                heading: 'প্রযোজ্য আইন।',
                body: 'এই শর্তাবলী YOUR-STATE/COUNTRY-এর আইন দ্বারা পরিচালিত; বিরোধ YOUR-CITY-এর আদালতে নিষ্পত্তি হবে।'
            },
            {
                heading: 'গ্রহণযোগ্যতা।',
                body: 'এই অ্যাপ্লিকেশন ব্যবহার করে আপনি নিশ্চিত করছেন যে আপনি এই নিয়মগুলি পড়েছেন, বুঝেছেন এবং সম্মত হয়েছেন।'
            },
        ],
        checkboxLabel: 'আমি শর্তাবলীতে সম্মত',
        buttonLabel: 'সম্মত',
    }
};

const AgreementModal = ({ setShowTerms }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [lang, setLang] = useState('en');

    const t = content[lang];

    const handleAgreeButtonClick = () => {
        localStorage.setItem('hasAgreedToTerms', 'true');
        setShowTerms(false);
    };

    return (
        <div className="container my-5 p-5 shadow-lg rounded" id="terms-container">
            {/* Language toggle */}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setLang(l => l === 'en' ? 'bn' : 'en')}
                    style={{ fontFamily: lang === 'bn' ? 'inherit' : 'inherit', minWidth: '80px' }}
                >
                    {t.altLang}
                </button>
            </div>

            <div className="terms-content p-3">
                <h4>{t.title} <small className="text-muted" style={{ fontSize: '0.75rem' }}>{t.updated}</small></h4>
                <ol>
                    {t.rules.map((rule, i) => (
                        <li key={i}>
                            <strong>{rule.heading}</strong> {rule.body}
                        </li>
                    ))}
                </ol>
            </div>

            <div className="form-check my-4">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeCheckbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(prev => !prev)}
                />
                <label className="form-check-label" htmlFor="agreeCheckbox">
                    {t.checkboxLabel}
                </label>
            </div>

            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    id="agreeButton"
                    disabled={!isChecked}
                    onClick={handleAgreeButtonClick}
                >
                    {t.buttonLabel}
                </button>
            </div>
        </div>
    );
};

export default AgreementModal;
