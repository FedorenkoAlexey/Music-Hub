import React, { Component } from "react";
import axios from "axios";

const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";

let Chart_Top_Track =
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks";

const ARTIST = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists";
// "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=disco";

const ARTIST_INFO =
  "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=";
//	"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={artName}&api_key=32084b8c1570367216c6f6bf233d6455&format=json";

let name = "sea";

class HomeComponent extends Component {
  state = {
    // persons1: [],

    chartTrack: {
      tracks: {
        track: []
      }
    },
    artInfo: [],

    artist: {
      artists: {
        artist: []
      }
    },
    isLoad: true
  };

  componentDidMount() {
    axios.get(`${Chart_Top_Track}${API_KEY}&format=json`).then(res => {
      const track = res.data;
      this.setState({ chartTrack: track });
      console.log(this.state.chartTrack);
      console.log(
        this.state.chartTrack.tracks.track[1].name,
        " - ",
        this.state.chartTrack.tracks.track[1].artist.name
      );
    });

    axios.get(`${ARTIST}${API_KEY}&format=json`).then(res => {
      const artist = res.data;
      this.setState({ artist: artist });
      // console.log(this.state.artist.artists.artist[0].name);
      // console.log(this.state.artist.artists.artist);

      // this.setState(prevState => ({
      //   ...prevState,
      //   artist: {
      //     ...prevState.artist,
      //     artists: {
      //       ...prevState.artist.artists,
      //       artist: artist.artists.artist
      //     }
      //   }
      // }));

      // console.log("64: ", artist.artists.artist);
    });

    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons1 = res.data;
      this.setState({ persons1: persons1 });
      console.log(this.state.persons1);
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
    // console.log("Info: ", this.state.artInfo);

    // setTimeout(() => {
    //   console.log("State: ", this.state);
    // }, 500);
  };

  render() {
    return (
      <div>
        <button onClick={this.getTrack}>get Track</button>

        <ul>
          {this.state.chartTrack.tracks.track.map(track => (
            <li key={track.listeners}>
              {track.name} -{" "}
              <a
                key={track.listeners + 2}
                onClick={() => this.getTrack(track.artist.name)}
              >
                <b>{track.artist.name}</b>
              </a>
            </li>
          ))}
        </ul>
        <div className="art-info">
          {this.state.artInfo.artist ? (
            <p>{this.state.artInfo.artist.bio.content}</p>
          ) : (
            <p>NO</p>
          )}
        </div>
      </div>
    );
  }
}
export default HomeComponent;
