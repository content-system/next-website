export default function LayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <div id="root">
      <div className="sidebar-parent menu-on">
        <div className="top-banner">
          <div className="logo-banner-wrapper">
            <img
              src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/industries-healthcare/healthcare-lp_banner.png"
              alt="Banner of The Company"
            />
            <img
              src="https://fptsoftware.com/-/media/project/fpt-software/fso/industries/banner/media-desktop.webp"
              className="banner-logo-title"
              alt="Logo of The Company"
            />
          </div>
        </div>
        <div className="menu sidebar">
          <nav id="sysNav" className="expanded-all">
            <ul>
              <li>
                <p className="sidebar-off-menu">
                  <button className="toggle"></button>
                  <i className="expand"></i>
                  <i className="collapse"></i>
                </p>
              </li>
              <li>
                <a className="menu-item" href="/">
                  <button type="button" className="btn-pin"></button>
                  <i className="material-icons">home</i>
                  <span>Home</span>
                </a>
              </li>
              <li className="">
                <a className="menu-item" href="/services">
                  <button type="button" className="btn-pin"></button>
                  <i className="material-icons">settings</i>
                  <span>Services</span>
                </a>
              </li>
              <li className="">
                <a className="menu-item" href="/news">
                  <button type="button" className="btn-pin"></button>
                  <i className="material-icons">assignments</i>
                  <span>News</span>
                </a>
              </li>
              <li className="">
                <a className="menu-item" href="/careers">
                  <button type="button" className="btn-pin"></button>
                  <i className="material-icons">pie_chart</i>
                  <span>Careers</span>
                </a>
              </li>
              <li className="">
                <a className="menu-item" href="/contact">
                  <button type="button" className="btn-pin"></button>
                  <i className="material-icons">contacts</i>
                  <span>Contact</span>
                </a>
              </li>
              <li className="open">
                <div className="menu-item">
                  <button type="button" className="btn-pin"></button>
                  <i className="material-icons">assignments</i>
                  <span>About</span>
                  <i className="entity-icon down"></i>
                </div>
                <ul className="sub-list expanded">
                  <li className="">
                    <a className="menu-item" href="/milestones">
                      <i className="material-icons">local_atm</i>
                      <span>Milestones</span>
                    </a>
                  </li>
                  <li className="">
                    <a className="menu-item" href="/companies">
                      <i className="material-icons">zoom_in</i>
                      <span>companies</span>
                    </a>
                  </li>
                  <li className="">
                    <a className="menu-item" href="/leadership">
                      <i className="material-icons">public</i>
                      <span>Leadership</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="page-container">
          <div className="page-header">
            <form>
              <div className="search-group">
                <section>
                  <button type="button" className="toggle-menu"></button>
                  <button type="button" className="toggle-search"></button>
                  <button type="button" className="close-search"></button>
                </section>
                <div className="logo-wrapper">
                  <img className="logo" src="../logo192.png" alt="Logo of The Company" />
                </div>
                <label className="search-input">
                  <input type="text" id="q" name="q" maxLength={1000} placeholder="Keyword" autoComplete="off" />
                  <button type="button" hidden className="btn-remove-text"></button>
                  <button type="button" className="btn-search"></button>
                </label>
                <section className="quick-nav">
                  <div className="dropdown-menu-profile">
                    <i className="material-icons">person</i>
                    <ul id="dropdown-basic" className="dropdown-content-profile">
                      <li className="menu" data-menu="Menu" data-sidebar="Sidebar">
                        <i className="material-icons">credit_card</i>
                        <span>Menu</span>
                      </li>
                      <hr />
                      <li>
                        <i className="material-icons">timelapse</i>
                        <span>Dark mode</span>
                      </li>
                      <hr />
                      <li>
                        <i className="material-icons">account_circle</i>
                        <a href="/settings">kaka</a>
                      </li>
                      <hr />
                      <li>
                        <i className="material-icons">exit_to_app</i>
                        <button>Sign out</button>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </form>
          </div>
          <div id="pageBody" className="page-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
