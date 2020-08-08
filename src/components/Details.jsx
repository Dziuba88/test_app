import React, {Component} from "react";
import firebase from "../firebase";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {movie: []};
  }

  createData = snap => {
    const movie = snap.val()[this.props.match.params.slug -1]
    this.setState({movie})
  }

  componentDidMount = () => {
    firebase
      .database().ref('/')
      .orderByChild('id')
      .equalTo( parseInt(this.props.match.params.slug) )
      .once('value', this.createData)
  }

  render = () => {
    const {movie} = this.state;

    return (
      <div className="details">
        <h1>{movie.title}  </h1>
        <p className="subtitle">
          <span>Director: {movie.director}</span> |
          <span>{movie.year}</span> |
          <span>Runtime: {movie.runtime} min.</span>
        </p>

        <code>
          poster: {movie.posterUrl}
        </code>

        <p>
          <strong>Description:</strong>
          {movie.plot}
        </p>

        <p><strong>Actors:</strong> {movie.actors}</p>
      </div>
    )
  }
}

