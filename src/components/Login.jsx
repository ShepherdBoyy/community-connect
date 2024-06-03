import { useContext, useState } from "react"
import "./styles.css"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { RecoveryContext } from "../App"

function Login() {
  const { setEmail, setPage, email, setOtp } = useContext(RecoveryContext)

  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

  const navigateToOtp = () => {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000)
      console.log(OTP)
      setOtp(OTP)

      axios
        .post(
          "https://community-connect-backend.onrender.com/auth/send_recovery_email",
          {
            OTP,
            recipient_email: email,
          }
        )
        .then(() => setPage("otp"))
        .catch(console.log)
      return
    }
    return alert("Please enter your email address")
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios
        .post(
          "https://community-connect-backend.onrender.com/auth/adminlogin",
          values
        )
        .then(result => {
          if (result.data.loginStatus) {
            localStorage.setItem("valid", true)
            navigate("/community-connect/dashboard")
          } else {
            setError(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vertical vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-center mb-5">
          <h2>Login Page</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter you email address"
              className="form-control rounded-0"
              onChange={e => {
                setValues({ ...values, email: e.target.value })
                setEmail("barangayhipodromo@gmail.com")
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter you password"
              className="form-control rounded-0"
              onChange={e => setValues({ ...values, password: e.target.value })}
            />
          </div>

          <div className="text-warning mb-2 forgot-password">
            <Link
              to="/community-connect/otp-input"
              onClick={() => navigateToOtp()}
            >
              <strong>Forgot Password?</strong>
            </Link>
          </div>

          <div className="text-warning mb-5">
            <strong>{error && error}</strong>
          </div>

          <div className="text-center">
            <button className="btn btn-success w-50 rounded-20">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
