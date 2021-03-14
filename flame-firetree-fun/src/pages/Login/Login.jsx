import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Cookies from "js-cookie";

var BNET_ID = "2f921dc15b264080b0d4aa5d82414475";
var BNET_SECRET = "fKeHKEG0UlXRrfxx424o5rFjeojGPOHU";
var BNET_TOKEN_URI = "https://us.battle.net/oauth/token";
// eslint-disable-next-line
var BNET_AUTH_URI = "	https://us.battle.net/oauth/authorize";
// eslint-disable-next-line
var BNET_SCOPES = ["wow.profile"];

class Login extends Component {
  state = {
    access_token: null,
    loggedIn: false,
    journal_data: {},
  };

  async set_new_token() {
    await fetch(BNET_TOKEN_URI, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        BNET_ID +
        "&client_secret=" +
        BNET_SECRET,
      method: "POST",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        Cookies.set("flame_bnet_token", responseData.access_token, {
          expires: 1,
        });
        this.setState({
          access_token: responseData.access_token,
          loggedIn: true,
        });
      });
  }
  // token may not authorize after expired
  async componentDidMount() {
    if (Cookies.get("flame_bnet_token") == null) {
      await this.set_new_token();
      console.log("new token set");
    } else {
      this.setState({
        access_token: Cookies.get("flame_bnet_token"),

        loggedIn: true,
      });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <NavBar access_token={this.state.access_token} />;
    } else return null;
  }
}
export default Login;
