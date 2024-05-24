import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function HouseholdRecord() {
  const [householdRecord, setHouseholdRecord] = useState([])

  useEffect(() => {
    try {
      axios
        .get(
          "https://community-connect-backend.onrender.com/auth/household_record"
        )
        .then(result => {
          if (result.data.Status) {
            setHouseholdRecord(result.data.Result)
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="household-record-container">
      <div className="household-header">
        <h3>List of Household and Members</h3>
      </div>
      <div className="household-table">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Household Number</th>
              <th>Household Member</th>
            </tr>
          </thead>
          <tbody>
            {householdRecord.map((item, index) => (
              <tr key={item.house_number}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/dashboard/household-members/` + item.house_number}
                    className="anchor-tag"
                  >
                    {item.house_number}
                  </Link>
                </td>
                <td>{item.household_members_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HouseholdRecord
