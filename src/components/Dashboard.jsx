import React from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css"
import axios from "axios"

function Dashboard() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios
      .get("https://community-connect-backend.onrender.com/auth/logout")
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid")
          navigate("/community-connect/")
        }
      })
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap main-container">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 menu-background">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/community-connect/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline text-center">
                Brgy. 629 Zone 63 Hipodromo
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/community-connect/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 ms-2 bi bi-menu-button-wide"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/community-connect/dashboard/brgy-officials"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Barangay Officials
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/community-connect/dashboard/residents-record"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 ms-2 bi bi-person-vcard"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Residents Record
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/community-connect/dashboard/household-record"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 ms-2 bi bi-house-door"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Household Record
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/community-connect/dashboard/settings"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 ms-2 bi bi-gear"></i>
                  <span className="ms-2 d-none d-sm-inline">Settings</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 ms-2 bi bi-box-arrow-left"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow header">
            <h4>CommunityConnect: Barangay Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
