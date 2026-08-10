import React, { useState } from "react"
import axios from "axios"
import { useNavigate, useParams, useLocation } from "react-router-dom"

function DeleteOfficial() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const name = queryParams.get("name")

  const [history, setHistory] = useState({
    name: name,
    reason: "",
    others: "",
  })

  const handleSubmit = e => {
    e.preventDefault()
    try {
      axios
        .post(
          "https://community-connect-backend.onrender.com/auth/delete_history",
          history
        )
        .then(result => {
          console.log(result.data)
        })

      axios
        .delete(
          "https://community-connect-backend.onrender.com/auth/delete_official/" +
            id
        )
        .then(result => {
          if (result.data.Status) {
            alert("Succesfully Deleted")
            navigate("/community-connect/dashboard")
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="create-account-container">
      <h3 className="text-center">Reason of Delete</h3>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control rounded-0"
            value={name}
            readOnly
          />
        </div>

        <div className="reason-div">
          <label htmlFor="reasonDropdown" className="form-label">
            Reason
          </label>
          <select
            name="reasonDropdown"
            id="reasonDropdown"
            className="form-select"
            defaultValue=""
            onChange={e => {
              setHistory({ ...history, reason: e.target.value })
            }}
          >
            <option value="" disabled>
              Select Reason
            </option>
            <option value="Duplicate Entries">Duplicate Entries</option>
            <option value="Incorrect Information">Incorrect Information</option>
            <option value="Old Records">Old Records</option>
            <option value="User Deletion Request">User Deletion Request</option>
            <option value="Regulatory Requirements">
              Regulatory Requirements
            </option>
            <option value="Entry Errors">Entry Errors</option>
            <option value="Remove Test Entries">Remove Test Entries</option>
            <option value="Resident Relocation">Resident Relocation</option>
          </select>
        </div>

        <div className="other-reason">
          <label htmlFor="otherReason">Other Reason</label>
          <input
            type="text"
            id="otherReason"
            placeholder="Other Reason to Delete"
            className="form-control rounded-0"
            onChange={e => {
              setHistory({ ...history, others: e.target.value })
            }}
          />
        </div>

        <div className="col-12 d-flex justify-content-center change-settings-button">
          <button
            type="submit"
            className="btn btn-success official-add-button w-25"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteOfficial
