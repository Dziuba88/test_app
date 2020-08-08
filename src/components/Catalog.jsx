import React, {Component} from "react";
import DataTable from "./DataTable";
import firebase from "../firebase";



export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        Header: "#",
        accessor: d => d.id
      },
      {
        Header: "Movie title",
        id: "title",
        accessor: d => d.title
      },
      {
        Header: "Director",
        accessor: d => d.director
      },
      {
        Header: "Year",
        accessor: d => d.year
      },
      {
        Header: "Runtime",
        accessor: d => d.runtime
      }
    ];
    this.state = {movies: []};
  }

  createData = snap => {
    const movies = snap.val().map(movie => ({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      year: movie.year,
      runtime: movie.runtime,
    }))
    this.setState({movies})
  }


  componentDidMount = () => {
    firebase.database()
      .ref('/')
      .once('value', this.createData)
  }
  render = () => {
    return (
      <div className="catalog">
        <DataTable
          columns={this.columns}
          data={this.state.movies} />
      </div>
    )
  }
}

