import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Settings() {
  return (
    <div className="settings-container">
      <Link
        to="/community-connect/dashboard/settings/change-user"
        className="icon-container"
      >
        <i className="bi bi-pen-fill"></i>
        <p>Change username</p>
        <p className="adjust">and password</p>
      </Link>

      <Link
        to="/community-connect/dashboard/settings/create-account"
        className="icon-container"
      >
        <i className="bi bi-person-fill-add"></i>
        <p>Create account</p>
      </Link>

      <Link
        to="/community-connect/dashboard/settings/history"
        className="icon-container"
      >
        <i className="bi bi-clipboard-data-fill"></i>
        <p>History</p>
      </Link>
    </div>
  )
}

export default Settings
