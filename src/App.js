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
      setItems((prevItems) => [
        ...prevItems,
        { text: value, color: '#fffff0', buttonLabel: '✓' },
      ]);
      setValue('');
    }
  };

  const handleColorChange = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
            ...item,
            color: item.color === 'rgba(16, 100, 16, 0.15)' ? '#fffff0' : 'rgba(16, 100, 16, 0.15)',
            buttonLabel: item.buttonLabel === '✓' ? '↺' : '✓',
          }
          : item
      )
    );
  };

  const handleRemove = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
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
      <div className="itemBoxBox">
        <div className="itemBox">
          {items.map((item, index) => (
            <div key={index} className="itemContainer">
              <p
                className="items"
                style={{ backgroundColor: item.color }}
              >
                {item.text}
              </p>
              <div className="itemButtonOne">
                <button onClick={() => handleColorChange(index)}>
                  {item.buttonLabel}
                </button>
              </div>
              <div className="itemButtonTwo">
                <button onClick={() => handleRemove(index)}>✗</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TextBox;
