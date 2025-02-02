import { getResource } from "@resources/index"
import { Attributes, StringMap } from "onecore"

export const userModel: Attributes = {
  username: {
    required: true,
    length: 100,
    resource: "username",
  },
  password: {
    required: true,
    length: 100,
    resource: "password",
  },
}
export interface User {
  username: string
  password: string
  passcode: string
  message: string
}

export const map: StringMap = {
  "2": "fail_authentication",
  "3": "fail_expired_password",
  "4": "fail_locked_account",
  "9": "fail_disabled_account",
}

export default async function Login() {
  const resource = getResource()
  const user = {} as User
  user.message = "Login test"
  return (
    <div className="central-full">
      <form id="signinForm" name="signinForm" className="form" noValidate={true} autoComplete="off" method="POST">
        <div className="view-body row">
          <img className="logo" src="/logo192.png" alt="logo" />
          <h1>{resource.signin}</h1>
          <div className="message alert-error">{user.message}</div>
          <label className="col s12">
            {resource.username}
            <input type="text" id="username" name="username" defaultValue={user.username} maxLength={100} placeholder={resource.placeholder_username} />
          </label>
          <label className="col s12">
            {resource.password}
            <input type="password" id="password" name="password" defaultValue={user.password} maxLength={100} placeholder={resource.placeholder_password} />
          </label>
          <label hidden className="col s12">
            {resource.passcode}
            <input type="password" id="passcode" name="passcode" value={user.passcode} maxLength={10} placeholder={resource.placeholder_passcode} />
          </label>
          <label className="col s12 checkbox-container">
            <input type="checkbox" id="remember" name="remember" />
            {resource.signin_remember_me}
          </label>
          <button type="submit" id="btnSignin" name="btnSignin">
            {resource.button_signin}
          </button>
          <a id="btnForgotPassword" href="/forgot-password">
            {resource.button_forgot_password}
          </a>
          <a id="btnSignup" href="/signup">
            {resource.button_signup}
          </a>
          <a id="btnHome" href="/">
            {resource.button_home}
          </a>
        </div>
      </form>
    </div>
  )
}
