import React from 'react'

function Header() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{background: "#e3f2fd"}}>
          <div className="container-fluid">
            <img className='ms-5' src="https://www.quironsalud.es/es/banners/88302-quironsalud-logo-original.png" width="120" height="50" alt="Quironsalud" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item me-5">
                  <a className="nav-link active mx-5" aria-current="page" href="http://localhost:5173/"><i className="fa fa-home fa-2x" aria-hidden="true"></i></a>
                </li>
                <li className="nav-item me-5">
                </li>
                <li className="nav-item ms-5">
                  <a className="nav-link" href="https://twitter.com/quironsalud" target="_blank">
                    <i className="fa fa-twitter fa-2x"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.facebook.com/quironsalud.es" target="_blank">
                    <i className="fa fa-facebook-official fa-2x"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.youtube.com/channel/UC1Xp5xg-r2Au-kQdIorviwg" target="_blank">
                    <i className="fa fa-youtube-square fa-2x"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.linkedin.com/company/quironsalud/mycompany/verification/" target="_blank">
                    <i className="fa fa-linkedin-square fa-2x"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.instagram.com/quironsalud/" target="_blank">
                    <i className="fa fa-instagram fa-2x"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.quironsalud.es/es/feed-rss" target="_blank">
                    <i className="fa fa-rss-square fa-2x"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  )
}

export default Header