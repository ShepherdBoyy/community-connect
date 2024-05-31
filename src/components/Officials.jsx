import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Officials() {
  const [official, setOfficial] = useState([])
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios
        .get("https://community-connect-backend.onrender.com/auth/official")
        .then(result => {
          if (result.data.Status) {
            setOfficial(result.data.Result)
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const filteredAndSortedOfficials = official
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })

  return (
    <div className="officials-container">
      <div>
        <div className="header-container">
          <Link
            to="/community-connect/dashboard/add-officials"
            className="btn btn-success add-button"
          >
            Add Officials
          </Link>
        </div>
        <div className="mt-3">
          <div className="table-header">
            <div className="table-header-text">
              <h4>Current Barangay Officials</h4>
            </div>
            <div className="table-header-input">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name"
              />
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date Added</th>
                <th>Image</th>
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
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
                  <tr key={item.id} className="official-data">
                    <td>{index + 1}</td>
                    <td>
                      {date} {localTime}
                    </td>
                    <td>
                      <img
                        src={
                          "https://community-connect-backend.onrender.com/images/" +
                          item.image
                        }
                        alt=""
                        className="official-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.position}</td>
                    <td>
                      <Link
                        to={
                          `/community-connect/dashboard/edit-official/` +
                          item.id
                        }
                        className="btn btn-warning btn-sm me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>

                      <Link
                        to={`/community-connect/dashboard/settings/delete-official/${
                          item.id
                        }?name=${encodeURIComponent(item.name)}`}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="bi bi-trash3"></i>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Officials
