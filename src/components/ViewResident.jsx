import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function ViewResident() {
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
      <div className="information-container">
        <div>
          <p>
            <strong>Name:</strong>
          </p>
          <p>
            <strong>Age:</strong>
          </p>
          <p>
            <strong>Sex:</strong>
          </p>
          <p>
            <strong>Date of Birth:</strong>
          </p>
          <p>
            <strong>Home Address:</strong>
          </p>
          <p>
            <strong>Purok:</strong>
          </p>
          <p>
            <strong>Household Number:</strong>
          </p>
          <p>
            <strong>Kinship Term:</strong>
          </p>
          <p>
            <strong>Occupation:</strong>
          </p>
          <p>
            <strong>Educational Attainment</strong>:
          </p>
        </div>
        <div>
          <p>{residents.name}</p>
          <p>{residents.age}</p>
          <p>{residents.sex}</p>
          <p>{newBirthDate}</p>
          <p>{residents.address}</p>
          <p>{residents.purok}</p>
          <p>{residents.houseNumber}</p>
          <p>{residents.kinship}</p>
          <p>{residents.occupation}</p>
          <p>{residents.educationalAttainment}</p>
        </div>
      </div>
      <button
        className="btn btn-success official-add-button"
        onClick={() => {
          navigate("/community-connect/dashboard/residents-record")
        }}
      >
        Back
      </button>
    </div>
  )
}

export default ViewResident
