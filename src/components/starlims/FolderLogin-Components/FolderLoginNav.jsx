import React, { useEffect } from 'react';
// import { Tooltip } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faUsers,
  faHistory,
  faPrint,
  faCertificate,
  faShippingFast,
  faFlask,
  faFlaskVial,
  faFileContract,
  faEye,
  faPencil,
  faListAlt,
  faDollarSign,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons';

const defaultGroups = [
  {
    title: 'Folder Details',
    items: [
      { label: 'Folder Accreditations', value: 'folder.accreditations', icon: faCertificate },
      { label: 'Folder Contacts', value: 'folder.contacts', icon: faUsers },
      { label: 'Return Options', value: 'folder.returnoptions', icon: faShippingFast },
      { label: 'History', value: 'folder.history', icon: faHistory },
    ],
  },
  {
    title: 'Samples',
    items: [
      { label: 'Manage Samples', value: 'folder.manageSamples', icon: faFlaskVial },
      { label: 'History', value: 'folder.history', icon: faHistory },
    ],
  },
  {
    title: 'Tests Assignment',
    items: [
      { label: 'Analytes', value: 'folder.analytes', icon: faFlask },
      { label: 'Specifications', value: 'folder.specification', icon: faFileContract },
    ],
  },
  {
    title: 'Prep Test Instructions',
    items: [
      { label: 'View Instructions', value: 'folder.viewInstructions', icon: faEye },
      { label: 'Edit Instructions', value: 'folder.editInstructions', icon: faPencil },
    ],
  },
  {
    title: 'Pricing',
    items: [
      { label: 'Test Plan', value: 'folder.testplanpricing', icon: faListAlt },
      { label: 'View Pricing', value: 'viewPricing', icon: faDollarSign },
    ],
  },
  {
    title: 'Comments',
    items: [
      { label: 'View/Edit', value: 'comment', icon: faCommentDots }, // Or faEyeSlash for differentiation
    ],
  },
  {
    title: 'Printable',
    items: [
      { label: 'Labels', value: 'print-labels', icon: faPrint },
      { label: 'Worksheets', value: 'print-worksheets', icon: faPrint }
    ]
  },
];


const FolderLoginNav = ({ groups = defaultGroups, onItemclick, showLabels }) => {

  // useEffect(() => {
  //   // Initialize tooltips when the component mounts
  //   const tooltips = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  //   tooltips.map((tooltip) => new Tooltip(tooltip));
  // }, []);

  return (
    <div className="shadow mt-2 overflow-hidden bg-primary">
      <table className="table table-hover mb-0 border-0">
        <tbody>
          {groups.map((group, index) => (
            <React.Fragment key={group.title}>
              <tr className='border-0'>
                <th colSpan="2" className="fw-bold text-capitalize text-lg px-2 py-1 border-0 bg-primary text-secondary">
                  {showLabels && group.title}
                </th>
              </tr>
              {group.items && group.items.map((item) => (
                <tr key={item.value} className="align-items-center ">
                  <td className="px-2 py-1 border-0 bg-primary ">
                    <span className="me-2" data-bs-toggle="tooltip" data-bs-placement="right" title={item.label}>
                      <FontAwesomeIcon
                        icon={item.icon || faFolder}
                        className="text-secondary fa-lg fa-fw"
                      />
                    </span>
                  </td>
                  <td className="px-2 py-1 border-0 bg-primary">
                    <a
                      href="#"
                      className="nav-link fw-bold text-capitalize text-secondary lh-sm"
                      onClick={() => onItemclick(item.value)}
                    >
                      {showLabels && item.label}
                    </a>
                  </td>
                </tr>
              ))}
              {index !== groups.length - 1 && <tr className='border-0'><td colSpan="2" className="p-0 border-0"></td></tr>}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default FolderLoginNav;
