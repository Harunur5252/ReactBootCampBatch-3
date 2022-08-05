import React from 'react';
import './App.css';
import ControlledForm from './ControlledForm';

function App() {
  // Today Topic : React Form
    // 1) Controlled Component
    // 2) Uncontrolled Component


  return (
    <>
      <div className='react-form'>
          <h2 className='form-heading'>Introduction to react form</h2>
          <ControlledForm />
      </div>
    </>
  );
}

export default App;
