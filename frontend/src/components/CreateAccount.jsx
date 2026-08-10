import axios from "axios"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateAccount() {
  const navigate = useNavigate()
  const [account, setAccount] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = e => {
    e.preventDefault()

    try {
      axios
        .post(
          "https://community-connect-backend.onrender.com/auth/add_account",
          account
        )
        .then(result => {
          if (result.data.Status) {
            navigate("/community-connect/dashboard/settings")
            alert("Successfully added account")
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="create-account-container">
      <h3 className="text-center">Create Account</h3>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <div className="email-div">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email address"
            className="form-control rounded-0"
            onChange={e => {
              setAccount({ ...account, email: e.target.value })
            }}
          />
        </div>

        <div className="password-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-control rounded-0"
            onChange={e => {
              setAccount({ ...account, password: e.target.value })
            }}
          />
        </div>

        <div className="col-12 d-flex justify-content-center change-settings-button">
          <button
            type="submit"
            className="btn btn-success official-add-button w-25"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateAccount
