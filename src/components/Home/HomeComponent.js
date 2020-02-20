import React, { Component } from "react";
import axios from "axios";

const API_KEY = "&api_key=32084b8c1570367216c6f6bf233d6455";

let Chart_Top_Track =
  "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks";

const ARTIST = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists";
// "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=disco";

const ARTIST_INFO =
  "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher";
//			"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=";

let name = "sea";

class HomeComponent extends Component {
  state = {
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
      console.log(this.state.artist.artists.artist[0].name);
      console.log(this.state.artist.artists.artist);

      //			this.setState(prevState => ({
      //				...prevState,
      //				artist: {
      //					...prevState.artist,
      //					topartists: {
      //						...prevState.artist.topartists,
      //						artist: artist.topartists.artist
      //					}
      //				}
      //			}))

      //      console.log(artist.topartists.artist);
    });

    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons1 = res.data;
      this.setState({ persons1: persons1 });
      console.log(this.state.persons1);
    });
  }
  getTrack = () => {
    // axios
    //   .get(
    //     "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=32084b8c1570367216c6f6bf233d6455&format=json"
    //   )
    //   .then(res => {
    //     const artist1 = res.data;
    //     this.setState({ artInfo: artist1 });
    //     console.log("333", this.artist1);
    //   });
  };

  render() {
    return (
      <div>
        <button onClick={this.getTrack}>get Track</button>

        <ul>
          {this.state.chartTrack.tracks.track.map(track => (
            <li key={track.listeners}>
              {track.name} -{" "}
              <a key={track.listeners + 2}>
                <b>{track.artist.name}</b>
              </a>
            </li>
          ))}
        </ul>

        {/* <ul>
          {this.state.artist.artists.artist.map(artist => (
            <li key={artist.mbid}>{artist.name} </li>
          ))}
        </ul> */}
      </div>
    );
  }
}
export default HomeComponent;
