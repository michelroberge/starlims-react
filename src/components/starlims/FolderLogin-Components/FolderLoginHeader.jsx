import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useClientSearch } from '../generic/ClientSearch';

const FolderLoginHeader = ({ folderNo, readOnly = false, onUpdate }) => {

    const { setClientSearchOptions } = useClientSearch();

    const [data, setData] = useState({
        // Replace with initial data structure based on your backend model
        folderNumber: 'VAR23023120002',
        status: 'Draft',
        salesAffiliate: '',
        applicant: 'test applicant',
        applicantProject: '',
        applicantPriceList: '',
        billTo: '',
        billToProject: '',
        billToPriceList: '',
        reportToShipTo: '',
        internalReferenceId: '',
        businessUnit: '',
        salesRep: '',
        orderTemplate: '',
        bProductCode: '',
        serviceLevel: '',
        dueDateCalculation: '',
        dueDate: null,
        purchaseOrderType: '',
        purchaseOrderNumber: '',
        assignedTo: '',
        conformanceStatement: '',
        witness: '',
        notes: '',
        invoiceNotes: '',
    });

    // Mock data for comboboxes (replace with actual API calls)
    const mockComboBoxData = {
        salesAffiliate: ['Option 1', 'Option 2'],
        applicantProject: ['Project A', 'Project B'],
        applicantPriceList: ['Price List 1', 'Price List 2'],
        billToProject: ['Project X', 'Project Y'],
        billToPriceList: ['Price List X', 'Price List Y'],
        businessUnit: ['Unit 1', 'Unit 2'],
        salesRep: ['Rep 1', 'Rep 2'],
        orderTemplate: ['Template A', 'Template B'],
        bProductCode: ['Code 1', 'Code 2'],
        serviceLevel: ['Level 1', 'Level 2'],
        dueDateCalculation: ['Option A', 'Option B'],
        assignedTo: ['User 1', 'User 2'],
        witness: ['Witness 1', 'Witness 2'],
    };

    // Load data on component mount
    useEffect(() => {
        if (folderNo) {
            // Simulate data loading from backend based on folderNo
            // Replace with your actual data fetching logic
            setTimeout(() => {
                setData({
                    // Replace with fetched data from backend
                    folderNumber: '123',
                    status: 'Active',
                    // ... other fields populated with fetched data
                });
            }, 1000); // Simulate data loading delay
        }
    }, [folderNo]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => {
            const newData = { ...prevData, [name]: value };
            if (onUpdate) {
                onUpdate(newData); // Trigger update callback with the latest data
            }
            return newData; // Return the updated state
        });
    };


    const handleClientSearch = (name) => {
        setClientSearchOptions({ clientType: name, isClientSearchVisible: true, selectCallback: handleSearchClick});
    }

    const handleSearchClick = (name) => {
        console.log(`handleSearchClick for ${name}`);
    };

    const handleKeyPress = (event, name) => {
        if (event.key === 'Enter') {
            handleClientSearch(name);
        }
    };


    const renderSearch = (name, label, isMandatory) => (
        <tr key={name}>
            <td>
                <label htmlFor={name} className="col-form-label">{label}</label>
                {isMandatory && <FontAwesomeIcon icon={faAsterisk} className="text-danger ms-1" />}
            </td>
            <td colSpan={3} className="position-relative">
                <div className="input-group">
                    <input
                        type="text"
                        className={`form-control form-control-sm ${readOnly ? 'bg-gray-200' : ''}`}
                        name={name}
                        disabled={readOnly}
                        onChange={handleChange}
                        placeholder='search'
                        value={data[name]}
                    />

                    <div className="input-group-text">
                        <span
                            className="input-group-text bg-transparent border-0"
                            onClick={() => handleClientSearch(name)}
                            tabIndex="0"
                            role="button"
                            aria-label="Search"
                        >
                            <FontAwesomeIcon icon={faSearch} className="text-secondary cursor-pointer" />
                        </span>
                    </div>
                </div>
            </td>
        </tr>
    );

    const renderInput = (name, label, isMandatory) => (
        <tr key={name}>
            <td>
                <label htmlFor={name} className="col-form-label">{label}</label>
                {isMandatory && <FontAwesomeIcon icon={faAsterisk} className="text-danger ms-1" />}
            </td>
            <td colSpan={3}>
                <input
                    type="text"
                    className={`form-control form-control-sm ${readOnly ? 'bg-gray-200' : ''}`}
                    name={name}
                    value={data[name] || ''}
                    onChange={handleChange}
                    disabled={readOnly}
                />
            </td>
        </tr>
    );

    const renderComboBox = (name, label, options) => (
        <tr key={name}>
            <td>
                <label htmlFor={name} className="col-form-label">{label}</label>
            </td>
            <td colSpan={3}>
                <select
                    className={`form-select ${readOnly ? 'bg-gray-200' : ''}`}
                    name={name}
                    value={data[name]}
                    onChange={handleChange}
                    disabled={readOnly}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </td>
        </tr>
    );

    const renderDatePicker = (name, label) => (
        <tr key={name}>
            <td>
                <label htmlFor={name} className="col-form-label">{label}</label>
            </td>
            <td colSpan={3}>
                <input
                    type="date"
                    className={`form-control ${readOnly ? 'bg-gray-200' : ''}`}
                    name={name}
                    value={data[name] || ''}
                    onChange={handleChange}
                    disabled={readOnly}
                />
            </td>
        </tr>
    );

    const renderTextArea = (name, label) => (
        <tr key={name}>
            <td colSpan="2">
                <label htmlFor={name} className="form-label">{label}</label>
                <textarea
                    className={`form-control ${readOnly ? 'bg-gray-200' : ''}`}
                    name={name}
                    rows="5"
                    value={data[name]}
                    onChange={handleChange}
                    disabled={readOnly}
                />
            </td>
        </tr>
    );

    return (
        <div className="container-fluid">
            {/* <ClientSearch onClose={setIsSearchOpen(false)} isOpen={isSearchOpen} /> */}
            <div className="row">
                <div className="col-lg-6">
                    {/* Left-hand side fields */}
                    <table className="table">
                        <tbody>
                            <tr key='firstline'>
                                <td colSpan={3}>
                                    <label htmlFor={'folderNo'} className="col-form-label fw-bold fs-5">{data["folderNumber"]}</label>
                                </td>
                                <td>
                                    <label htmlFor={'status'} className="col-form-label text-success fw-bold fs-5">{data['status']}</label>
                                </td>

                            </tr>

                            {renderComboBox('salesAffiliate', 'Sales Affiliate:', mockComboBoxData.salesAffiliate, true)}
                            {/* name, label, isMandatory, data */}
                            {renderSearch('applicant', 'Applicant:', true, mockComboBoxData.applicant)}
                            {renderComboBox('applicantProject', 'Applicant Project:', mockComboBoxData.applicantProject, true)}
                            {renderComboBox('applicantPriceList', 'Applicant Price List:', mockComboBoxData.applicantPriceList)}
                            {renderSearch('billTo', 'Bill To', true, mockComboBoxData.applicant)}
                            {renderComboBox('billToProject', 'Bill To Project:', mockComboBoxData.billToProject, true)}
                            {renderComboBox('billToPriceList', 'Bill To Price List:', mockComboBoxData.billToPriceList)}
                            {renderSearch('reportToShipTo', 'Report To-Ship To:', true, mockComboBoxData.applicant)}
                            {renderInput('internalReferenceId', 'Internal Ref. Id:', true)}
                            {renderComboBox('businessUnit', 'Business Unit:', mockComboBoxData.businessUnit, true)}
                            {renderComboBox('salesRep', 'Sales Rep:', mockComboBoxData.salesRep)}
                            {renderComboBox('orderTemplate', 'Order Template:', mockComboBoxData.orderTemplate)}
                            {renderComboBox('bProductCode', 'BOSS Product Code:', mockComboBoxData.bProductCode, true)}
                            {renderComboBox('serviceLevel', 'Service Level:', mockComboBoxData.serviceLevel, true)}
                            {renderComboBox('dueDateCalculation', 'Due Date Calculation:', mockComboBoxData.dueDateCalculation, true)}
                            {renderDatePicker('dueDate', 'Due Date:')}
                            {renderInput('purchaseOrderType', 'Purchase Order Type:')}
                            {renderInput('purchaseOrderNumber', 'Purchase Order #:', true)}
                            {renderComboBox('assignedTo', 'Assigned To:', mockComboBoxData.assignedTo)}
                            {renderInput('conformanceStatement', 'Conformance Statement:')}
                            {renderComboBox('witness', 'Witness:', mockComboBoxData.witness)}
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-6">
                    {/* Right-hand side fields */}
                    <table className="table">
                        <tbody>
                            {renderTextArea('notes', 'Notes:')}
                            {renderTextArea('invoiceNotes', 'Invoice Notes:')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FolderLoginHeader;
