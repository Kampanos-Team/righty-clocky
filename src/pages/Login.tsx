import { FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"
import heroImg from "../assets/images/hero-login.svg"
import facebookImg from "../assets/images/facebook-icon.svg"
import twitterImg from "../assets/images/twitter-icon.svg"
import googleImg from "../assets/images/google-icon.svg"
import logo from "../assets/images/logo.svg"

import "../styles/login.scss"

export function Login(){
  const { user, signInWithGoogle, signInWithEmailPassword } = useAuth()
  const history = useHistory()
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  async function handleLoginWithEmail(event: FormEvent) {
    event.preventDefault()

    if(emailInput.trim() === ""){
      return
    }
    if(passwordInput.trim() === ""){
      return
    }
    await signInWithEmailPassword(emailInput, passwordInput)
  }

  async function handleLoginWIthGoogle() {
    if(user?.provider !== "google"){
      try {
        await signInWithGoogle()
      } catch (error) {
        return console.log(error)
      } 
    }
    history.push("/dashboard")
  }
  return(
    <div id="page-login">
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </header>
      <main>
          <div className="grid">
          <div className="login">
            <div className="title">
              <h2>Login</h2>
              <p>to your account</p>
            </div>
            <div className="form-wrapper">
              <form onSubmit={event => handleLoginWithEmail(event)}>
                <div className="inputs">
                  <input
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                  placeholder="your email"
                  type="email"
                  autoComplete="username"
                  />
                  <input
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  />
                </div>
                <button type="submit">Login</button>
              </form>
              <div>
                <span>or</span>
                <div className="row">
                    <button disabled>
                      <img src={twitterImg} alt="twitter login" />
                    </button>
                    <button disabled>
                      <img src={facebookImg} alt="facebook login" />
                    </button>
                    <button onClick={handleLoginWIthGoogle}>
                      <img src={googleImg} alt="google login" />
                    </button>
                </div>
              </div>
            </div>
            <span>let's start working guys</span>
          </div>
          <div className="hero">
            <img src={heroImg} alt="Hero" />
          </div>
        </div>
      </main>
    </div>
  )
}