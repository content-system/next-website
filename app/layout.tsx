import "@assets/css/globals.css"
import LayoutPage from "@core/layout"
import { headers } from "next/headers"
import Script from "next/script"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = headers()
  const pathname = headerList.get("x-current-path")
  const hasLayout = pathname && !pathname.endsWith("/login")

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="../public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#008577" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="apple-touch-icon" href="../public/logo192.png" />
        <title>Next App</title>
      </head>
      <body id="sysBody" className="full-header top-menu">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="sysToast" className="toast-message alert-success"></div>
        <div id="sysLoading" className="loader-wrapper" style={{ display: "none" }}>
          <div className="loader-sign">
            <div className="loader"></div>
          </div>
        </div>
        <div id="sysAlert" className="alert-wrapper">
          <div className="alert">
            <div>
              <div id="sysIcon" className="alert-icon"></div>
              <h4 id="sysMessageHeader"></h4>
              <p id="sysMessage"></p>
            </div>
            <footer>
              <button type="button" className="btn-cancel" id="sysNo" name="btnCancel" />
              <button type="submit" className="btn-accept" id="sysYes" name="btnAccept" />
            </footer>
          </div>
        </div>
        <Script src="/static/script.js"></Script>
        {hasLayout && <LayoutPage>{children}</LayoutPage>}
        {!hasLayout && <>{children}</>}
      </body>
    </html>
  )
}
