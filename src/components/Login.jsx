import { useState } from "react"
import "./styles.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

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
            navigate("/dashboard")
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
              autoComplete="off"
              placeholder="Enter you email address"
              className="form-control rounded-0"
              onChange={e => setValues({ ...values, email: e.target.value })}
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
