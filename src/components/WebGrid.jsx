// src/components/WebGrid.jsx
import React from "react";

const items = [
  {
    title: "CLONE THOSE AND HAVE FUN",
    subtitle: "Cloneables.",
    bg: "bg-yellow-300",
    textColor: "text-black",
    logo: "https://assets.website-files.com/62f.../webflow-logo.png", // optional
  },
  {
    title: "USE AI IN YOUR WEBDESIGN WORKFLOW",
    subtitle: "YouTube serie.",
    bg: "bg-red-500",
    textColor: "text-white",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  },
  {
    title: "SCREEN FREE VACATIONS",
    subtitle: ["#SOLOPRENEUR", "#TRAVELTIPS"],
    bg: "bg-green-400",
    textColor: "text-white",
  },
  {
    title: "BECOME A BADASS DESIGNER",
    subtitle: ["#DESIGNER", "#FIGMA-MASTER"],
    bg: "bg-pink-300",
    textColor: "text-black",
  },
  {
    title: "AWARDS",
    subtitle: ["1X HONORABLE MENTION"],
    bg: "bg-blue-500",
    textColor: "text-white",
  },
];

const WebGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 min-h-screen bg-neutral-900">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-md ${item.bg} ${item.textColor} flex flex-col justify-between h-48`}
        >
          <h2 className="font-bold text-sm md:text-md uppercase">
            {item.title} ↗
          </h2>
          <div className="mt-4">
            {typeof item.subtitle === "string" ? (
              <h3 className="text-xl font-semibold">{item.subtitle}</h3>
            ) : (
              item.subtitle.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block px-2 py-1 bg-white text-black rounded text-xs mr-2 mt-1"
                >
                  {tag}
                </span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebGrid;
