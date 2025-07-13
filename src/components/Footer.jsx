import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-20 px-4 md:px-24 text-center md:text-left">
      {/* Name with custom border */}
      <div className="border border-black rounded-xl inline-block px-8 py-4 mx-auto md:mx-0 mb-12">
        <h1 className="text-5xl md:text-7xl tracking-wide font-[500] custom-logo-font">
          MATTHIS GARNIER
        </h1>
      </div>

      {/* Subtext and Social Links */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="text-left space-y-4">
          <p className="text-base">
            Made with love and{' '}
            <span className="inline-block align-middle">
              <img
                src="https://uploads-ssl.webflow.com/60afbe5e6e8e1f5cfb2a782f/60b8da889fe41a3f7f3c0a90_webflow-logo.svg"
                alt="Webflow"
                className="inline h-5 ml-1"
              />
            </span>{' '}
            in Akumal, Mexico.
          </p>
          <p className="text-2xl font-medium">
            <span className="text-gray-500 font-normal text-xl">Local time — </span>03:40 AM
          </p>
          <p className="text-xs mt-8">© 2024 MATTHIS GARNIER. ALL RIGHT RESERVED.</p>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          {['Instagram', 'Webflow', 'My course', 'Twitter'].map((link, index) => (
            <button
              key={index}
              className="border border-black py-3 px-6 rounded-md flex justify-between items-center text-sm hover:bg-black hover:text-white transition"
            >
              {link}
              <span className="ml-4">↗</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
    
    </footer>
  );
};

export default Footer;
