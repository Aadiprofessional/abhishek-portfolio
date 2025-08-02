import React from 'react';

const Footer = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col justify-between items-center px-6 py-20 border-t border-black select-text custom-selection">
      
      {/* Logo Header */}
      <div className="border border-black rounded-xl px-8 py-4 w-fit mb-16">
        <h1 className="text-[12vw] md:text-[8vw] font-normal leading-none custom-logo-font tracking-wide text-center">
          MATTHIS GARNIER
        </h1>
      </div>

      {/* Main Row */}
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between w-full max-w-[1200px]">
        
        {/* Left Info Block */}
        <div className="flex flex-col items-start justify-start gap-3 text-base leading-snug">
          <p className="flex items-center gap-1">
            Made with love and
            <img
              src="https://uploads-ssl.webflow.com/60afbe5e6e8e1f5cfb2a782f/60b8da889fe41a3f7f3c0a90_webflow-logo.svg"
              alt="Webflow"
              className="h-5"
            />
            in Akumal, Mexico.
          </p>
          <p className="text-[1.7rem] font-semibold">
            <span className="text-gray-500 text-lg font-normal">Local time</span> — 09:03 AM
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-fit">
          {['Instagram', 'Webflow', 'My course', 'Twitter'].map((label, index) => (
            <button
              key={index}
              className="border border-black px-6 py-3 rounded-md flex justify-between items-center text-sm hover:bg-black hover:text-white transition-all duration-200 min-w-[160px]"
            >
              {label}
              <span className="ml-2">↗</span>
            </button>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="text-xs mt-20 text-center">
        © 2024 Matthis Garnier. All right reserved.
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
