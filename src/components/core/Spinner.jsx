import React from 'react';

const Spinner = ({text="Loading..."}) => (
  <div className="text-center my-4">
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">{text}</span>
    </div>
    <p className='text-secondary'>{text}</p>
  </div>
);

export default Spinner;
