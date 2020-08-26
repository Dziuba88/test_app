import React, { Component } from "react";
import DataTable from "./DataTable";
import firebase from "../firebase";
import preloader from "../loader.svg";

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        Header: "#",
        accessor: (d) => d.id,
      },
      {
        Header: "Movie title",
        id: "title",
        accessor: (d) => d.title,
      },
      {
        Header: "Director",
        accessor: (d) => d.director,
      },
      {
        Header: "Year",
        accessor: (d) => d.year,
      },
      {
        Header: "Runtime",
        accessor: (d) => d.runtime,
      },
    ];
    this.state = { movies: [], loading: true };
  }

  createData = (snap) => {
    const movies = snap.val().map((movie) => ({
      id: movie.id,
      title: movie.title,
      director: movie.director,
      year: movie.year,
      runtime: movie.runtime,
    }));
    setTimeout(() => {
      this.setState({ movies, loading: false });
    }, 1000);
  };

  componentDidMount = () => {
    firebase.database().ref("/").once("value", this.createData);
  };
  render = () => {
    return (
      <div className="catalog">
        {this.state.loading ? (
          <img className="preloader" src={preloader} alt="" />
        ) : (
          <DataTable columns={this.columns} data={this.state.movies} />
        )}
      </div>
    );
  };
}
