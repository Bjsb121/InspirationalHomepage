import './App.css';
import React, { useState } from 'react';

function TextBox() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      setItems((prevItems) => [...prevItems, value]);
      setValue('');
    }
  };

  return (
    <div>
      <label htmlFor="text-box" className="title">Things to do today: </label>
      <input
        id="text-box"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="What are we doing today?"
      />
      <div className='itemBoxBox'>
        <div className='itemBox'>
          {items.map((item, index) => (
            <p key={index} className='items'>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TextBox;
