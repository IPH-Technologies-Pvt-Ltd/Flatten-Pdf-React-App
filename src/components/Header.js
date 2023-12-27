import React, {useState} from "react";
import "../App.css";
const Header = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const handleLogoHover = () => {
    setIsLogoHovered(true);
  };

  const handleLogoLeave = () => {
    setIsLogoHovered(false);
  };

  const logoStyles = {
    background: "#0b8",
    width: "70px",
    transform: isLogoHovered ? "rotate(360deg)" : "rotate(0deg)",
    transition: "transform 0.5s ease",
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container py-2 fw-semibold px-5">
          <a className="navbar-brand" href="!#" style={{ color: "#0b8" }} 
           onMouseEnter={handleLogoHover}
           onMouseLeave={handleLogoLeave}
           >
            <span
              className="p-2 px-3 fw-bold me-2 rounded-circle text-white rotate-on-hover"
              // style={{ background: "#0b8", width: "70px" }}
              style={logoStyles}

            >
              L
            </span>
            Lekha
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item dummy">
                <a className="nav-link active" aria-current="page" href="!#">
                  All Tools
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Compress
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Edit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Fill & Sign
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Merge
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Delete Pages
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="!#">
                  Crop
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="!#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="dropdownMenuLink"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a className="dropdown-item" href="!#">Action</a></li>
                  <li><a className="dropdown-item" href="!#">Another action</a></li>
                  <li><a className="dropdown-item" href="!#">Something else here</a></li>
                  </ul>
              </li>
            </ul>
            <div className="ml-auto d-flex me-0 ms-auto">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <a className="nav-link" href="!#">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="!#">
                    Desktop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="!#">
                    Log in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
