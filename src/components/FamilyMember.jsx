import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import axios from "axios"

function FamilyMember() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [residents, setResidents] = useState({
    name: "",
    age: "",
    sex: "",
    birthdate: "",
    address: "",
    purok: "",
    houseNumber: "",
    kinship: "",
    educationalAttainment: "",
    occupation: "",
  })

  useEffect(() => {
    try {
      axios
        .get(
          "https://community-connect-backend.onrender.com/auth/residents/" + id
        )
        .then(result => {
          setResidents({
            ...residents,
            name: result.data.Result[0].name,
            age: result.data.Result[0].age,
            sex: result.data.Result[0].sex,
            birthdate: result.data.Result[0].birthdate,
            address: result.data.Result[0].address,
            purok: result.data.Result[0].purok,
            houseNumber: result.data.Result[0].house_number,
            kinship: result.data.Result[0].kinship,
            educationalAttainment: result.data.Result[0].education,
            occupation: result.data.Result[0].occupation,
          })
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const splitDate = residents.birthdate.split("T")
  const newBirthDate = splitDate[0]

  return (
    <div className="view-resident-container">
      <h3>More Information</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Name:</strong>
            </td>
            <td>
              <p>{residents.name}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Age:</strong>
            </td>
            <td>
              <p>{residents.age}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Sex:</strong>
            </td>
            <td>
              <p>{residents.sex}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Date of Birth:</strong>
            </td>
            <td>
              <p>{newBirthDate}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Home Address:</strong>
            </td>
            <td>
              <p>{residents.address}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Purok:</strong>
            </td>
            <td>
              <p>{residents.purok}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>House Number:</strong>
            </td>
            <td>
              <p>{residents.houseNumber}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Kinship Term:</strong>
            </td>
            <td>
              <p>{residents.kinship}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Occupation:</strong>
            </td>
            <td>
              <p>{residents.occupation}</p>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Educational Attainment</strong>
            </td>
            <td>
              <p>{residents.educationalAttainment}</p>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="btn btn-success official-add-button"
        onClick={() => {
          navigate(
            `/community-connect/dashboard/household-members/` +
              residents.houseNumber
          )
        }}
      >
        Back
      </button>
    </div>
  )
}

export default FamilyMember
