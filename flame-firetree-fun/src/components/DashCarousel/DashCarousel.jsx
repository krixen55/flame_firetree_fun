import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import "./DashCarousel.css";

const textLightBg = {
  color: "black",
  fontWeight: "bold",
};
const textDarkBg = {
  color: "white",
  fontWeight: "bold",
};

class DashCarousel extends Component {
  state = {
    index: 0,
    setIndex: 0,
  };
  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex });
  };
  render() {
    return (
      <div>
        <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../assets/nzoth-kill.jpg")}
              alt="First slide"
              style={{ height: "75vh" }}
            />
            <Carousel.Caption>
              <BrowserView>
                <div
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0.75)",
                    width: "30%",
                  }}
                >
                  <h5 style={textLightBg}>Flame N'Zoth Kill 6/22/20</h5>
                </div>
              </BrowserView>
              <MobileView>
                <div
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0.75)",
                  }}
                >
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    Flame N'Zoth Kill 6/22/20
                  </p>
                </div>
              </MobileView>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../assets/jaina-kill.jpg")}
              alt="Second slide"
              style={{ height: "75vh" }}
            />

            <Carousel.Caption>
              <BrowserView>
                <div
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0.75)",
                    width: "30%",
                  }}
                >
                  <h5 style={textLightBg}>Flame Jaina Kill 5/31/19</h5>
                </div>
              </BrowserView>
              <MobileView>
                <div
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0.75)",
                  }}
                >
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    Flame Jaina Kill 5/31/19
                  </p>
                </div>
              </MobileView>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../assets/ghuun-kill.jpg")}
              alt="Third slide"
              style={{ height: "75vh" }}
            />

            <Carousel.Caption>
              <BrowserView>
                <div
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0.75)",
                    width: "30%",
                  }}
                >
                  <h5 style={{ textDarkBg }}>Flame G'huun Kill 1/16/19</h5>
                </div>
              </BrowserView>
              <MobileView>
                <div
                  style={{
                    backgroundColor: "rgba(52, 52, 52, 0.3)",
                  }}
                >
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    Flame G'huun Kill 1/16/19
                  </p>
                </div>
              </MobileView>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default DashCarousel;
