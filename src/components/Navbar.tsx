import logo from "/images/icon.jpg";

import {
	PersonOutline,
	SettingsOutline,
} from "react-ionicons";

function ToggleButton() {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
}

function Navbar (){
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            FlowTask
          </a>

{/*
to add logo
          <a href="/">
                        <img
                            src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
          />
          </a>
*/}

      <div className="d-flex align-items-center">
              <ToggleButton />
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a className="nav-link text-white" href="#">
                    <SettingsOutline color={"#444"} />
                  </a>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <PersonOutline
                                  color="#444"
                                  width={"40px"}
                                  height={"40px"}
                                />
                    </a>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                          <li>
                              <a className="dropdown-item" href="#">My account</a>
                          </li>
                          <li>
                              <a className="dropdown-item" href="#">Log out</a>
                          </li>
                      </ul>
                  </li>
                </div>
              </div>
            </div>
          </div>
    </nav>
    </>
  );
}

export default Navbar;