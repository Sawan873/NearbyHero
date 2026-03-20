import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

const images = [hero1, hero2, hero3];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [loadingPath, setLoadingPath] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Loading navigation
  const handleNavigate = (path) => {
    setLoadingPath(path);
    setProgress(0);

    let value = 0;
    const interval = setInterval(() => {
      value += 4;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        navigate(path);
      }
    }, 40);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Slideshow */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Community help"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100 scale-105" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 text-white">

          <div className="text-center md:text-left">

            {/* Typing Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-yellow-400">
                <Typewriter
                  words={[
                    "Be Someone's Hero",
                    "Be the Change",
                    "Be the Hope"
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-10 opacity-90">
              Connect with neighbors who need help and community members ready to assist.
              Make your neighborhood stronger, one good deed at a time.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">

              {/* Browse Button */}
              <button
                onClick={() => handleNavigate("/browse")}
                disabled={loadingPath === "/browse"}
                className="relative overflow-hidden bg-white text-red-600 font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-300"
              >
                {loadingPath === "/browse" && (
                  <span
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  ></span>
                )}

                <span className="relative z-10">
                  {loadingPath === "/browse" ? `${progress}%` : "Browse Requests"}
                </span>
              </button>

              {/* Create Button */}
              <button
                onClick={() => handleNavigate("/create")}
                disabled={loadingPath === "/create"}
                className="relative overflow-hidden bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-300"
              >
                {loadingPath === "/create" && (
                  <span
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  ></span>
                )}

                <span className="relative z-10">
                  {loadingPath === "/create" ? `${progress}%` : "Create a Request"}
                </span>
              </button>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
