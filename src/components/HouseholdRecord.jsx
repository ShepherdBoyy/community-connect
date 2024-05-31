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
        <h3>List of House Number and Members</h3>
      </div>
      <div className="household-table">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>House Number (Brgy 629 Zone 63 Hipodromo)</th>
              <th>Household Member</th>
            </tr>
          </thead>
          <tbody>
            {householdRecord.map((item, index) => (
              <tr key={item.house_number}>
                <td>{index + 1}</td>
                <td>{item.house_number}</td>
                <td>
                  <Link
                    to={`/community-connect/dashboard/household-members/${
                      item.house_number
                    }?name=${encodeURIComponent(item.household_members_count)}`}
                    className="anchor-tag"
                  >
                    {item.household_members_count}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HouseholdRecord
