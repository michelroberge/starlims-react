import React, { useState } from 'react';

const Header = ({ onUpdate, defaultValues = [] }) => {
    const [values, setValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues(prevValues => ({ ...prevValues, [id]: value }));
        if (onUpdate) {
            onUpdate(id, value);
        }
    };
    return (
        <div>
            <p className='lead'>Folder Header</p>
            <div className="mb-3">
                <label htmlFor="businessUnit" className="form-label">Business Unit</label>
                <input type="text" className="form-control" id="businessUnit" name="businessUnit" valuevalue={values['businessUnit']} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="applicant" className="form-label">Applicant</label>
                <input type="text" className="form-control" id="applicant" name="applicant" valuevalue={values['applicant']} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="numSamples" className="form-label">Number of Samples</label>
                <input type="number" className="form-control" id="numSamples" name="numSamples" valuevalue={values['numSamples']} onChange={handleInputChange} />
            </div>
        </div>
    );
};

export default Header;
