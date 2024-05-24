import axios from "axios"
import React, { useEffect, useState } from "react"

function Settings() {
  const [oldPassword, setOldPassword] = useState("")
  const [confirmOldPassword, setConfirmOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  useEffect(() => {
    try {
      axios
        .get("https://community-connect-backend.onrender.com/auth/password")
        .then(result => {
          setOldPassword(result.data.Result[0].password)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (oldPassword === confirmOldPassword) {
      try {
        axios
          .put(
            "https://community-connect-backend.onrender.com/auth/change_password",
            {
              newPassword: newPassword,
            }
          )
          .then(result => {
            if (result.data.Status) {
              window.location.reload()
              alert("Successfully changed password")
            } else {
              alert(result.data.Error)
            }
          })
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("Incorrect old password")
    }
  }

  return (
    <div className="settings-container">
      <h3 className="text-center">Change Password</h3>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="old-password-div">
          <label htmlFor="oldPasswordConfirm">Old Password</label>
          <input
            type="password"
            id="oldPasswordConfirm"
            placeholder="Enter your old password"
            className="form-control rounded-0"
            onChange={e => {
              setConfirmOldPassword(e.target.value)
            }}
          />
        </div>

        <div className="new-password-div">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            className="form-control rounded-0"
            onChange={e => {
              setNewPassword(e.target.value)
            }}
          />
        </div>
        <div className="col-12 d-flex justify-content-center settings-button">
          <button
            type="submit"
            className="btn btn-success official-add-button w-25"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
