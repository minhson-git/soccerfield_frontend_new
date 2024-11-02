import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    'san6.jpg',
    'san6.jpg',
    'san6.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 giây chuyển động 1 lần

    return () => clearInterval(interval); 
  }, [currentIndex]);

 
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={styles.sliderContainer}>
      <button onClick={prevSlide} style={{ ...styles.arrow, ...styles.leftArrow }}>
        &#10094;
      </button>
      
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        >
          <img src={image} alt={`Slider ${index}`} style={styles.image} />
        </div>
      ))}
      
      <button onClick={nextSlide} style={{ ...styles.arrow, ...styles.rightArrow }}>
        &#10095;
      </button>
    </div>
  );
};

const styles = {
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    display: 'flex',
  },
  slide: {
    minWidth: '100%',
    transition: 'transform 0.5s ease-in-out', 
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 2,
    fontSize: '24px',
  },
  leftArrow: {
    left: '10px',
  },
  rightArrow: {
    right: '10px',
  },
};

export default ImageSlider;
