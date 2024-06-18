import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        {/* Left Content */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato Logo" className="footer-logo" />
          <p className="footer-description">
            We are a leading food delivery service, bringing your favorite meals to your doorstep with a smile.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>

        {/* Center Content */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#delivery">Delivery</a></li>
            <li><a href="#privacy">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right Content */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul className="footer-contact">
            <li><span className="contact-label">Phone:</span> +1-212-565-666</li>
            <li><span className="contact-label">Email:</span> <a href="mailto:contact@tomato.com">contact@tomato.com</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Separator */}
      <hr />

      {/* Copyright */}
      <p className="footer-copyright">Copyright © {new Date().getFullYear()} Tomato.com - All rights reserved.</p>
    </div>
  );
}

export default Footer;
