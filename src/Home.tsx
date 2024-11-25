import React from "react";
import boardImage from './assets/images/BoardComponent3.jpg';


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

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Column 1: About */}
          <div className="col-md-6">
            <h5 className="text-center">About Us</h5>
            <p>
              We are a leading company providing top-notch solutions to help
              businesses succeed in the digital era.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="text-center col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; Netanel Bondar & Tzofiya Rozen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


function BoardComponent(props) {
  const { title, imageUrl, href} = props;
  return (
  <a href={href} className="card bg-dark text-white" style={{ 
    maxWidth: '250px',
    height: '150px', 
    margin: '1rem',     
    borderRadius: '8px', 
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  }}>
  <img 
        className="card-img" 
        src={imageUrl} 
        alt="Card image"
        style={{width: '100%',
          height: '100%',
          objectFit: 'cover',  }}
      />
  <div className="card-img-overlay">
    <h5 className="card-title">{title}</h5>
  </div>
</a>
  );
}



function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <ToggleButton />
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="#">
                Settings
              </a>
              <a className="nav-link" href="#">
                Profile
              </a>
            </div>
          </div>
        </div>
      </nav>



<BoardComponent
  title="Board title"
  imageUrl={boardImage}
  href="#"
/>

      <Footer />
    </>
  );
}








export default Home;
