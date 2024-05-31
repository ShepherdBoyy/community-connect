import { useEffect, useState } from "react"
import { useNavigate, useParams, Link, useLocation } from "react-router-dom"
import axios from "axios"

function HouseholdMembers() {
  const { house_number } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [householdMember, setHouseholdMember] = useState([])

  const queryParams = new URLSearchParams(location.search)
  const membersCount = queryParams.get("name")

  useEffect(() => {
    try {
      axios
        .get(
          "https://community-connect-backend.onrender.com/auth/household_members/" +
            house_number
        )
        .then(result => {
          if (result.data.Status) {
            setHouseholdMember(result.data.Result)
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="household-members-container">
      <h3>Household Members</h3>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Kinship Term</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {householdMember.map((member, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{member.kinship}</td>
              <td>
                <Link
                  to={
                    `/community-connect/dashboard/view-family-member/` +
                    member.id
                  }
                  className="anchor-tag"
                >
                  {member.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Total Members: {membersCount}</h5>

      <button
        className="btn btn-success official-add-button"
        onClick={() => {
          navigate("/community-connect/dashboard/household-record")
        }}
      >
        Back
      </button>
    </div>
  )
}

export default HouseholdMembers
