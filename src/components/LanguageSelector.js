// LanguageSelector.js

import React from 'react';

const LanguageSelector = ({ setSelectedLanguage }) => {
    const languages = ['C', 'Cpp', 'Java', 'Python'];

    return (
        <select
            className="form-control"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            defaultValue=""
            required
        >
            <option value="" disabled>
                Select a Language
            </option>
            {languages.map((lang, idx) => (
                <option key={idx} value={lang}>
                    {lang}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
