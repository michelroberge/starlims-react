import { useState, useRef, useEffect } from 'react';
import {runAction} from '../../services/Starlims';

const useDynamicTableLogic = (jsonData, fieldList, onUpdate, onDelete, table, idfield, onDataUpdate, setLoading, setLoadingMsg) => {
    const inputRefs = useRef({});
    const [currentColIndex, setCurrentColIndex] = useState(null);
    const [currentRowIndex, setCurrentRowIndex] = useState(null);

    useEffect(() => {
        if (currentRowIndex !== null && currentColIndex !== null) {
            const cellKey = `${currentRowIndex}-${currentColIndex}`;
            if (inputRefs.current[cellKey]) {
                setTimeout(() => {
                    inputRefs.current[cellKey].focus();
                }, 0);
            }
        }
    }, [currentRowIndex, currentColIndex]);

    const [editableRows, setEditableRows] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);

    const handleKeyDown = (event) => {

        switch (event.key) {
            case 'Enter':
                if (editableRows[currentRowIndex]) {
                    handleSave();
                }
                break;
            case 'Escape':
                if (editableRows[currentRowIndex]) {
                    handleCancel();
                }
                break;
            case 'ArrowUp':
                handleArrowKeys(event, currentRowIndex - 1, currentColIndex);
                break;
            case 'ArrowDown':
                handleArrowKeys(event, currentRowIndex + 1, currentColIndex);
                break;
            case 'ArrowLeft':
                handleArrowKeys(event, currentRowIndex, currentColIndex - 1);
                break;
            case 'ArrowRight':
                handleArrowKeys(event, currentRowIndex, currentColIndex + 1);
                break;
            default:
                break;
        }
    };

    const handleArrowKeys = (event, rowIndex, colIndex) => {
        event.preventDefault();
        const numRows = jsonData.data.data.Tables[0].Rows.length;
        const numCols = fieldList.length;

        // Ensure rowIndex and colIndex are within bounds
        if (rowIndex >= 0 && colIndex >= 0 && rowIndex < numRows && colIndex < numCols) {
            setCurrentRowIndex(rowIndex);
            setCurrentColIndex(colIndex);

            if (!editableRows.hasOwnProperty(rowIndex)) {
                // If the row is not already in edit mode, trigger edit mode
                const updatedEditableRows = { ...editableRows };
                updatedEditableRows[rowIndex] = { ...jsonData?.data?.data?.Tables[0].Rows[rowIndex] };
                setEditableRows(updatedEditableRows);

                // Add the row to the list of selected rows if it's not already there
                if (!selectedRows.includes(rowIndex)) {
                    setSelectedRows(prevSelectedRows => [...prevSelectedRows, rowIndex]);
                }
            }

            // Focus on the input element after a short delay
            setTimeout(() => {
                const cellKey = `${rowIndex}-${colIndex}`;
                if (inputRefs.current[cellKey]) {
                    inputRefs.current[cellKey].focus();
                }
            }, 0);
        }
    };

    const handleEditChange = (rowIndex, fieldName, value) => {
        if (!editableRows.hasOwnProperty(rowIndex)) {
            setEditableRows(prevState => ({
                ...prevState,
                [rowIndex]: { ...jsonData?.data?.data?.Tables[0].Rows[rowIndex] }
            }));
        }

        setEditableRows(prevState => ({
            ...prevState,
            [rowIndex]: {
                ...prevState[rowIndex],
                [fieldName]: value
            }
        }));
    };

    const handleSave = async () => {
        const successfulRows = [];
        const failedRows = [];

        setLoadingMsg && setLoadingMsg('Saving...');
        setLoading && setLoading(true);
        // Iterate over selected rows
        for (const rowIndex of selectedRows) {
            try {
                // Update the row if needed
                if (onUpdate) {
                    onUpdate(editableRows[rowIndex]);
                }
                if (table && idfield) {
                    const originalRow = jsonData?.data?.data?.Tables[0].Rows[rowIndex];
                    const modifiedFields = Object.entries(editableRows[rowIndex])
                        .filter(([fieldName, value]) => {
                            return (
                                originalRow[fieldName] !== value ||
                                (originalRow[fieldName] === null && value !== null) ||
                                (originalRow[fieldName] !== null && value === null)
                            );
                        })
                        .map(([fieldName, value, type]) => [fieldName, value, 'S']);
                    const origRec = jsonData?.data?.data?.Tables[0].Rows[rowIndex]?.[idfield];

                    if (modifiedFields.length > 0) {
                        await runAction("Runtime_Support.WS_UpdateProvider", ["ReactGrid", table, modifiedFields, origRec, idfield], 'script');
                        successfulRows.push(rowIndex); // Record successful row
                    }
                }
            } catch (error) {
                console.error(`An error occurred while updating row ${rowIndex}:`, error);
                failedRows.push(rowIndex); // Record failed row
            }
        }

        // Update state based on successful and failed rows
        const updatedEditableRows = { ...editableRows };
        for (const rowIndex of successfulRows) {
            delete updatedEditableRows[rowIndex]; // Remove successful rows from editableRows
        }
        setSelectedRows(failedRows); // Set failed rows as selected (to remain in edit mode)
        setEditableRows(updatedEditableRows); // Update editableRows with successful rows removed

        // Prepare updated data to send to the onDataUpdate callback
        const updatedRows = jsonData.data.data.Tables[0].Rows.map((row, index) => {
            if (successfulRows.includes(index)) {
                return editableRows[index] || row; // Use the edited row if it exists, otherwise use the original row
            } else {
                return row; // Use the original row for unsuccessful rows
            }
        });

        const updatedData = {
            ...jsonData,
            data: {
                ...jsonData.data,
                data: {
                    ...jsonData.data.data,
                    Tables: [
                        {
                            ...jsonData.data.data.Tables[0],
                            Rows: updatedRows
                        }
                    ]
                }
            }
        };

        // Call the onDataUpdate callback with the updated data
        if (onDataUpdate) {
            onDataUpdate(updatedData);
        }

        setLoading && setLoading(false);
    };




    const handleDelete = () => {
        onDelete &&
            selectedRows.forEach(rowIndex => {
                onDelete(editableRows[rowIndex]);
            });
        setSelectedRows([]);
    };

    const handleCancel = () => {
        selectedRows.forEach(rowIndex => {
            setEditableRows(prevState => {
                const updatedRows = { ...prevState };
                delete updatedRows[rowIndex];
                return updatedRows;
            });
        });
        setSelectedRows([]);
    };

    const handleRowSelection = (event, rowIndex) => {
        const selectedRowIndex = parseInt(rowIndex, 10);
        if (event.target.checked) {
            setSelectedRows(prevSelectedRows => [...prevSelectedRows, selectedRowIndex]);
            handleEdit(rowIndex, 0);
        } else {
            setSelectedRows(prevSelectedRows => prevSelectedRows.filter(row => row !== selectedRowIndex));
        }
    };

    const handleEdit = (rowIndex, colIndex) => {
        const updatedSelectedRows = [...selectedRows];
        const updatedEditableRows = { ...editableRows };

        const index = updatedSelectedRows.indexOf(rowIndex);
        if (index === -1) {
            updatedSelectedRows.push(rowIndex);
        }

        updatedSelectedRows.forEach(selectedRowIndex => {
            if (!updatedEditableRows.hasOwnProperty(selectedRowIndex)) {
                updatedEditableRows[selectedRowIndex] = { ...jsonData?.data?.data?.Tables[0].Rows[selectedRowIndex] };
            }
        });

        setSelectedRows(updatedSelectedRows);
        setEditableRows(updatedEditableRows);
        if (currentColIndex != colIndex) {
            setCurrentColIndex(colIndex);
        }
        if (currentRowIndex != rowIndex) {
            setCurrentRowIndex(rowIndex);
        }
    };

    const renderCellContent = (columnName, rowData, rowIndex, colIndex, ReadOnly =  false) => {
        const cellKey = `${rowIndex}-${colIndex}`;
        if (ReadOnly == false && editableRows.hasOwnProperty(rowIndex) && editableRows[rowIndex].hasOwnProperty(columnName)) {
            return (
                <input
                    type="text"
                    value={editableRows[rowIndex][columnName]}
                    onChange={e => handleEditChange(rowIndex, columnName, e.target.value)}
                    ref={element => {
                        // Assign the ref to inputRefs using the cellKey as the key
                        if (element) {
                            inputRefs.current[cellKey] = element;
                        }
                    }}
                />
            );
        } else {
            return rowData[columnName];
        }
    };

    return {
        editableRows,
        selectedRows,
        handleEditChange,
        handleSave,
        handleDelete,
        handleCancel,
        renderCellContent,
        handleRowSelection,
        handleEdit,
        handleKeyDown
    };
};

export default useDynamicTableLogic;
