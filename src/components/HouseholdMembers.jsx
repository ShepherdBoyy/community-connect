import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import axios from "axios"

function HouseholdMembers() {
  const { house_number } = useParams()
  const navigate = useNavigate()
  const [householdMember, setHouseholdMember] = useState([])

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
      {householdMember.map((member, index) => (
        <div key={index} className="household-members-information-container">
          <div className="household-members-details-container">
            <p>
              <strong>{member.kinship}:</strong> {/* kinship */}
            </p>
          </div>
          <div className="household-members-details-container">
            <p>
              <Link
                to={`/dashboard/view-family-member/` + member.id}
                className="anchor-tag"
              >
                {member.name}
                {/* name */}
              </Link>
            </p>
          </div>
        </div>
      ))}

      <button
        className="btn btn-success official-add-button"
        onClick={() => {
          navigate("/dashboard/household-record")
        }}
      >
        Back
      </button>
    </div>
  )
}

export default HouseholdMembers
