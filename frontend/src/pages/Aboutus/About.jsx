import React from "react";
import "./About.css";


const AboutUs = () => {
  return (
    <div className="about-us" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/photo-black-giftbox-with-ribbon-wrapped-as-bow-confetti-around-isolated-purple-background_352249-6721.jpg')" }}>
      <div className="about-content">
        <h2>About Us</h2>
        <p>Welcome to Phoenix Gifts! We're more than just a store – we're a place of wonder and excitement! Our shelves are filled with all kinds of amazing things, carefully chosen to bring smiles to your face and warmth to your heart. Whether you're shopping for a special occasion or just because, our friendly team is here to help you find the perfect gift. Come on in, explore, and let's make some memories together!</p>
        <h2>Vision & Mission</h2>
          <p><strong>Vision:</strong> To be the leading provider of unique and heartfelt gifts that bring joy to people's lives.</p>
          <p><strong>Mission:</strong> We are committed to curating a diverse selection of high-quality gifts, providing exceptional customer service, and fostering meaningful connections with our community.</p>

    
{/* <div className="contact-info">
          
            <p>Email: <a href="mailto:contact@example.com">contact@example.com</a></p>
            <p>Phone: <a href="tel:1234567890">123-456-7890</a></p>
            <p>Address: 123 Main Street, City, Country</p>
          
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;

