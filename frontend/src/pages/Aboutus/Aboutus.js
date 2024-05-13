import React, { useState, useEffect } from "react";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://assets.winni.in/groot/2022/10/28/mobile/birthday-gifts-banners.jpg',
    'https://www.parentmap.com/sites/default/files/styles/1180x660_scaled_cropped/public/2017-10/edited_gifts.png?itok=llWEkOJf',
    'https://hips.hearstapps.com/hmg-prod/images/diy-christmas-gifts-poppers-64a59cdc6e8d3.png?crop=1.00xw:1.00xh;0,0&resize=640:*',
    'https://i.ytimg.com/vi/lDSRbnV1DqU/maxresdefault.jpg',
    'https://images-cdn.ubuy.co.id/634d04a88e1acc70934862f4-sister-birthday-gifts-from-sister.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 1000); // Change interval time (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [currentImageIndex]); // Restart interval on slide change

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <div className="about">
        <div className="slider">
          <button className="prev" onClick={prevSlide}>Previous</button>
          <img src={images[currentImageIndex]} alt="Gift box" />
          <button className="next" onClick={nextSlide}>Next</button>
        </div>
        <div className="text">
          <h2>About Us</h2>
          <p>Welcome to Phoenix Gifts! We're more than just a store – we're a place of wonder and excitement! Our shelves are filled with all kinds of amazing things, carefully chosen to bring smiles to your face and warmth to your heart. Whether you're shopping for a special occasion or just because, our friendly team is here to help you find the perfect gift. Come on in, explore, and let's make some memories together!</p>
        </div>
        <div className="vision-mission-container">
          <h2>Vision & Mission</h2>
          <p><strong>Vision:</strong> To be the leading provider of unique and heartfelt gifts that bring joy to people's lives.</p>
          <p><strong>Mission:</strong> We are committed to curating a diverse selection of high-quality gifts, providing exceptional customer service, and fostering meaningful connections with our community.</p>
        </div>
      </div>

      <style>{`
        .about {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .slider {
          position: relative;
          width: 500px; /* Adjust width as needed */
          margin-bottom: 20px;
        }

        .slider img {
          width: 100%;
          height: auto;
        }

        .prev,
        .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }

        .prev {
          left: 0;
        }

        .next {
          right: 0;
        }

        .vision-mission-container {
          margin-top: 20px;
          padding: 20px;
          background-color: Hex
          ;
          border-radius: 8px;
          text-align: center;
        }

        .vision-mission-container h2 {
          margin-bottom: 10px;
        }

        .vision-mission-container p {
          margin-bottom: 5px;
        }
      `}</style>
    </>
  );
};

export default About;
