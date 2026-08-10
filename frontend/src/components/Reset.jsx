import React, { useContext } from "react"
import { RecoveryContext } from "../App"

function Reset() {
  const { setPage } = useContext(RecoveryContext)

  const changePassword = () => {
    setPage("recovered")
  }

  return (
    <div className="change-settings-container">
      <h3 className="text-center">Change Password</h3>

      <div className="new-password-div">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          placeholder="Enter your new password"
          className="form-control rounded-0"
        />
      </div>

      <div className="cofirm-password-div">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your new password"
          className="form-control rounded-0"
        />
      </div>

      <div className="col-12 d-flex justify-content-center change-settings-button">
        <button
          onClick={() => changePassword()}
          className="btn btn-success official-add-button w-25"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Reset
