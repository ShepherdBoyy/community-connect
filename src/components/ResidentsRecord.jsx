import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function ResidentsRecord() {
  const [residents, setResidents] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios
        .get("https://community-connect-backend.onrender.com/auth/residents")
        .then(result => {
          if (result.data.Status) {
            setResidents(result.data.Result)
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const filteredAndSortedOfficials = residents
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })

  const handleDelete = id => {
    try {
      axios
        .delete(
          "https://community-connect-backend.onrender.com/auth/delete_resident/" +
            id
        )
        .then(result => {
          if (result.data.Status) {
            navigate("/community-connect/dashboard/residents-record")
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="residents-record">
      <div className="residents-record-header">
        <Link
          to="/community-connect/dashboard/add-resident"
          className="btn btn-success add-button"
        >
          Add Resident
        </Link>
      </div>

      <div className="residents-table">
        <div className="table-header">
          <div className="table-header-text">
            <h4>Current Barangay Residents</h4>
          </div>
          <div className="table-header-input">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date Added</th>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Purok</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedOfficials.map((item, index) => {
              const splitDate = item.date.split("T")
              const date = splitDate[0]
              const utcDate = new Date(item.date)
              const localTime = utcDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })

              return (
                <tr key={item.id} className="residents-data">
                  <td>{index + 1}</td>
                  <td>
                    {date} {localTime}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.sex}</td>
                  <td>{item.purok}</td>
                  <td>
                    <Link
                      to={
                        `/community-connect/dashboard/view-resident/` + item.id
                      }
                      className="btn btn-info btn-sm me-2"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link
                      to={
                        `/community-connect/dashboard/edit-resident/` + item.id
                      }
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResidentsRecord
