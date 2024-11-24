import React from "react";

function Home() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Brand
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Workspace
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Recent
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Starred
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Templates
              </a>
            </li>
            <li>
              <button className="btn btn-primary" type="button">
                Create
              </button>
            </li>
          </ul>
        </div>
      </div>
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
  );
}

export default Home;
