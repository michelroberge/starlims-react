import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import useDynamicTableLogic from './DynamicTableLogic';
import WaitOverlay from './WaitOverlay';

const DynamicTable = ({ jsonData, fieldList, onUpdate, onDelete, table, idfield, onDataUpdate, allowEdit = true, selectable = true }) => {
    
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('Please Wait...');

    const {
        editableRows,
        selectedRows,
        handleSave,
        handleDelete,
        handleCancel,
        renderCellContent,
        handleRowSelection,
        handleEdit,
        handleKeyDown
    } = useDynamicTableLogic(jsonData, fieldList, onUpdate, onDelete, table, idfield, onDataUpdate, setLoading, setLoadingMsg);    
    
    return (
        <div className="table-responsive w-100" onKeyDown={handleKeyDown}>
            {loading && <WaitOverlay message={loadingMsg} />}
            <table className="table table-striped table-bordered table-hover table-sm">
                <thead className="thead-dark">
                    <tr>
                        {selectable && (
                        <th className='col-1'>
                            Select
                        </th>)}
                        {fieldList.map((field, index) => (
                            <th key={index}>{field.Caption}</th>
                        ))}
                        {allowEdit && (<th className='col-2'>Actions</th>)}
                    </tr>
                </thead>
                <tbody>
                    {jsonData?.data?.data?.Tables[0].Rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {selectable && (
                            <td>
                                <input
                                    type='checkbox'
                                    onChange={(event) => handleRowSelection(event, rowIndex)}
                                    checked={selectedRows.includes(rowIndex)}
                                />
                            </td>
                            )}
                            {fieldList.map((field, colIndex) => (
                                <td key={colIndex} onClick={() => handleEdit(rowIndex, colIndex)}>
                                    {renderCellContent(field.FieldName, row, rowIndex, colIndex, field.ReadOnly)}
                                </td>
                            ))}
                            { allowEdit &&
                            (<td>
                                {editableRows[rowIndex] ? (
                                    <>
                                        <FontAwesomeIcon icon={faSave} className='btn btn-primary' onClick={handleSave} />
                                        <FontAwesomeIcon icon={faTimes} className='btn btn-warning' onClick={handleCancel} />
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faEdit} className='btn btn-secondary' onClick={() => handleEdit(rowIndex)} />
                                        {onDelete && <FontAwesomeIcon icon={faTrash} className='btn btn-danger' onClick={handleDelete} /> }
                                    </>
                                )}
                            </td>) }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;
