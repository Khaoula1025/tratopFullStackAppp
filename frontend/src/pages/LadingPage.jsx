import React from "react";
import "../App.css";
import Typewriter from "typewriter-effect";
import Login from "./Login";
import { Link } from "react-router-dom";

const LadingPage = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <div
        className="flex-1 background-container "
        style={{
          backgroundImage:
            "url('https://hotel-paradis-plage.web.app/img/Design.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link to="/travaux">
          <img src="/logo.png" className="h-24" alt="tra top Logo" />
        </Link>

        <div className="flex flex-col justify-center items-center center-vertically">
          <div className="lobster-regular text-4xl">
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
      </div>
      <div className="flex-1">
        <Login />
      </div>
    </div>
  );
};

export default LadingPage;
