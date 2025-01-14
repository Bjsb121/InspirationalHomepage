import './App.css';
import React, { useState } from 'react';

function TextBox() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="text-box" className="title">Things to do today: </label>
      <input
        id="text-box"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="What are we doing today?"
      />
      <div className='itemBoxBox'>
        <div className='itemBox'>
          <p className={`items ${!value ? 'blinking' : ''}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default TextBox;
