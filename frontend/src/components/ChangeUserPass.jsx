import axios from "axios"
import React, { useState } from "react"

function ChangeUserPass() {
  const [confirmOldPassword, setConfirmOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    try {
      axios
        .post(
          "https://community-connect-backend.onrender.com/auth/verify_password",
          { password: confirmOldPassword }
        )
        .then(verifyResult => {
          if (!verifyResult.data.Status) {
            alert(verifyResult.data.Error || "Something went wrong")
            return
          }
          if (!verifyResult.data.Match) {
            alert("Incorrect old password")
            return
          }

          axios
            .put(
              "https://community-connect-backend.onrender.com/auth/change_password",
              {
                newPassword: newPassword,
                newEmail: newEmail,
              }
            )
            .then(result => {
              if (result.data.Status) {
                window.location.reload()
                alert("Successfully changed email and password")
              } else {
                alert(result.data.Error)
              }
            })
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="change-settings-container">
      <h3 className="text-center">Change Password</h3>
      <form className="change-settings-form" onSubmit={handleSubmit}>
        <div className="new-email-div">
          <label htmlFor="newEmail">New Email</label>
          <input
            type="text"
            id="newEmail"
            placeholder="Enter your new email address"
            className="form-control rounded-0"
            onChange={e => {
              setNewEmail(e.target.value)
            }}
          />
        </div>

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
        <div className="col-12 d-flex justify-content-center change-settings-button">
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

export default ChangeUserPass