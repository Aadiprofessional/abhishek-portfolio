import React from 'react';
import { personalInfo, socialLinks } from '../data/personalData';

const Footer = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between items-center px-6 py-20 border-t border-black select-text custom-selection">
      
      {/* Logo Header */}
      <div className="border border-black rounded-xl px-8 py-4 w-fit mb-16 flex items-center justify-center min-h-[120px]">
        <h1 className="text-[12vw] md:text-[8vw] font-normal leading-none tracking-wide" style={{ fontFamily: '"Luckiest Guy"' }}>
          {personalInfo.name.toUpperCase()}
        </h1>
      </div>

      {/* Main Row */}
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between w-full max-w-[1200px]">
        
        {/* Left Info Block */}
        <div className="flex flex-col items-start justify-start gap-3 text-base leading-snug">
          <p className="flex items-center gap-1">
            Built with React and passion in {personalInfo.location}.
          </p>
          <p className="text-[1.7rem] font-semibold">
            <span className="text-gray-500 text-lg font-normal">{personalInfo.availability}</span> — {personalInfo.tagline}
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-600 mb-2">Get in touch:</p>
          <p className="text-base font-medium">abhishek.kvoc@gmail.com</p>
          <p className="text-base font-medium">+91 9289881135</p>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-xs mt-20 text-center">
        © 2024 {personalInfo.name}. All rights reserved.
      </p>

      {/* Selection color override */}
      <style jsx>{`
        .custom-selection ::selection {
          background-color: #d1d5db40; /* light gray */
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Footer;
