import { Nav } from "@components/nav";
import { getLangByPath, getResource } from "@resources";
import { rebuildPath } from "@service/menu";
import { headers } from "next/headers";
import ctx from "./context";

export default async function LayoutPage({ children }: { children: React.ReactNode }) {
  const headerList = await headers()
  const pathname = headerList.get("x-current-path")
  const lang = getLangByPath(pathname)
  const resource = getResource(lang)
  const items = await ctx.menu.load()
  if (lang !== "en") {
    rebuildPath(items, lang)
  }
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
          <Nav items={items} resource={resource}/>
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
