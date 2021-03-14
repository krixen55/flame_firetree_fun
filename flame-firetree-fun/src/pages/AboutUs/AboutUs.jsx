import React, { Component } from "react";
import "./AboutUs.css";
class AboutUs extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "darkgray",
        }}
        class="text-center"
      >
        <p>
          Hello There! My name is Victor and thank you for checking out my World
          of Warcraft Checker.
        </p>
        <p>
          This tool was designed to be my Senior Project at McKendree University
          in Illinois. It was designed to be a one-stop shop experience for
          World of Warcraft players to be able to check on any player's
          progress.
        </p>
        I hope that this tool can one day become valuable to the World of
        Warcraft Community!
      </div>
    );
  }
}
export default AboutUs;
