import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer ">
          <div className="container-fluid">
              <nav className="pull-left">
                  <ul>
                      <li>
                          <a href="https://www.creative-tim.com">
                              Creative Tim
                          </a>
                      </li>
                      <li>
                          <a href="http://presentation.creative-tim.com">
                              About Us
                          </a>
                      </li>
                      <li>
                          <a href="http://blog.creative-tim.com">
                              Blog
                          </a>
                      </li>
                      <li>
                          <a href="https://www.creative-tim.com/license">
                              Licenses
                          </a>
                      </li>
                  </ul>
              </nav>
              <div className="copyright pull-right">
                  &copy;
                  <script>
                      document.write(new Date().getFullYear())
                  </script>, made with love by
                  <a href="/" >Creative Tim</a> for a better web.
              </div>
          </div>
      </footer>
    );
  }
}

export default Footer;
