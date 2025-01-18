import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import image1 from './Resources/kyle-bushnell-Zi3Pt6lW1eo-unsplash.webp';
import image2 from './Resources/hans-isaacson-4h-V22aj4cs-unsplash.webp';

function TextBox() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [weather, setWeather] = useState(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = useMemo(() => [image1, image2], []);

  useEffect(() => {
    const imageLoadPromises = backgrounds.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
      });
    });

    Promise.all(imageLoadPromises);
  }, [backgrounds]);

  useEffect(() => {
    const fetchWeather = async () => {
      const url =
        'https://api.weatherapi.com/v1/current.json?key=4f10f6b1b6ea4a6cb7a191533251801&q=Dallas&aqi=no';

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          console.error('Failed to fetch weather data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleArrowRight = () => {
    setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  const handleArrowLeft = () => {
    setBackgroundIndex((prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length);
  };

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
            color:
              item.color === 'rgba(16, 100, 16, 0.15)' ? '#fffff0' : 'rgba(16, 100, 16, 0.15)',
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
    <div
      style={{
        backgroundImage: `url(${backgrounds[backgroundIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        transition: 'background-image 0.5s ease',
      }}
    >
      <label htmlFor="text-box" className="title">
        Things to do today:{' '}
      </label>
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
              <p className="items" style={{ backgroundColor: item.color }}>
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

      <div className="weatherPanel">
        {weather ? (
          <>
            <h3>Weather in {weather.location.name}</h3>
            <p>
              <strong>Temperature:</strong> {weather.current.temp_c}°C
            </p>
            <p>
              <strong>Condition:</strong> {weather.current.condition.text}
            </p>
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
            />
            <p>
              <strong>Feels Like:</strong> {weather.current.feelslike_c}°C
            </p>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>

      <button className="arrowLeft" onClick={handleArrowLeft}>
        &#60;
      </button>
      <p className="quote">
        "The ability to speak does not make you intelligent" - Qui-Gon Jinn
      </p>
      <button className="arrowRight" onClick={handleArrowRight}>
        &#62;
      </button>
    </div>
  );
}

export default TextBox;
