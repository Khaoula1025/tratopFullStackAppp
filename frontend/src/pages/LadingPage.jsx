import React from "react";
import "../App.css";
import Typewriter from "typewriter-effect";
import Login from "./Login";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[/bgOne.png]">
      <div
        className="flex-1 flex flex-col justify-center items-center p-8 md:p-0 background-container"
        style={{
          backgroundImage:
            "url('https://hotel-paradis-plage.web.app/img/Design.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link to="/travaux" className="self-start md:self-center mb-4 md:mb-8">
          <img src="/logo.png" className="h-16 md:h-24" alt="Tra Top Logo" />
        </Link>
        <div className="lobster-regular text-2xl md:text-4xl text-center text-white">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Vos données, notre attention: ")
                .pauseFor(1000)
                .typeString("Simplifiez,")
                .pauseFor(100)
                .typeString("Notifiez,")
                .pauseFor(100)
                .typeString(" Agissez!")
                .start();
            }}
          />
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center p-8 md:p-0 bg-white">
        <Login />
      </div>
    </div>
  );
};

export default LandingPage;
