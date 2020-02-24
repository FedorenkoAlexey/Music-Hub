import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";

const Chart_Top_Track =
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks";

const ARTIST = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists";
// "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=disco";

const ARTIST_INFO =
  "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=";
//	"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={artName}&api_key=32084b8c1570367216c6f6bf233d6455&format=json";

class HomeComponent extends Component {
  componentDidMount() {
    axios.get(`${Chart_Top_Track}${API_KEY}&format=json`).then(res => {
      const track = res.data;
      this.setState({ chartTrack: track });
      // console.log(this.state.chartTrack);
    });

    axios.get(`${ARTIST}${API_KEY}&format=json`).then(res => {
      const artist = res.data;
      this.setState({ artist: artist });
    });

    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons1 = res.data;
      this.setState({ persons1: persons1 });
      // console.log(this.state.persons1);
    });

    // console.log("State: ", this.state);
  }
  getTrack = (name?) => {
    let artName = name;
    axios
      .get(`${ARTIST_INFO}${artName}${API_KEY}&format=json`)
      .then(res => {
        const result = res.data;
        this.setState({ artInfo: result });
        console.log(result);
      })
      .then(() => {
        console.log("State1: ", this.state.artInfo);
        console.log("Bio: ", this.state.artInfo.artist.bio.content);
      });
  };

  render() {
    return <div>Home Component</div>;
  }
}

const mapState = state => {
  return {};
};

const dispatch = {};

export default connect(mapState, dispatch)(HomeComponent);
