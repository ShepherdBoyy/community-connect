import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function AddResident() {
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

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", residents.name)
    formData.append("age", residents.age)
    formData.append("sex", residents.sex)
    formData.append("birthdate", residents.birthdate)
    formData.append("address", residents.address)
    formData.append("purok", residents.purok)
    formData.append("houseNumber", residents.houseNumber)
    formData.append("kinship", residents.kinship)
    formData.append("educationalAttainment", residents.educationalAttainment)
    formData.append("occupation", residents.occupation)

    try {
      axios
        .post(
          "https://community-connect-backend.onrender.com/auth/add_resident",
          residents
        )
        .then(result => {
          if (result.data.Status) {
            navigate("/dashboard/residents-record")
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="add-resident-container">
      <h3 className="text-center">Add Resident</h3>
      <form className="resident-form" onSubmit={handleSubmit}>
        <div className="input-div">
          <label htmlFor="addResidentName">Name</label>
          <input
            type="text"
            id="addResidentName"
            placeholder="Enter you name"
            className="form-control rounded-0"
            onChange={e => {
              setResidents({ ...residents, name: e.target.value })
            }}
          />
        </div>

        <div className="two-input">
          <div className="input-div">
            <label htmlFor="addResidentAge">Age</label>
            <input
              type="number"
              id="addResidentAge"
              placeholder="Enter you age"
              className="form-control rounded-0 half-width"
              onChange={e => {
                setResidents({ ...residents, age: e.target.value })
              }}
            />
          </div>
          <div className="input-div">
            <label htmlFor="addResidentSex">Sex</label>
            <select
              name="addResidentSex"
              id="addResidentSex"
              defaultValue=""
              className="form-select rounded-0 half-width"
              onChange={e => {
                setResidents({ ...residents, sex: e.target.value })
              }}
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="two-input">
          <div className="input-div">
            <label htmlFor="addResidentBirthdate">Birthdate</label>
            <input
              type="date"
              id="addResidentBirthdate"
              className="form-control rounded-0 half-width"
              onChange={e => {
                setResidents({ ...residents, birthdate: e.target.value })
              }}
            />
          </div>
          <div className="input-div">
            <label htmlFor="addResidentPurok">Purok</label>
            <select
              name="addResidentPurok"
              id="addResidentPurok"
              defaultValue=""
              className="form-select rounded-0 half-width"
              onChange={e => {
                setResidents({ ...residents, purok: e.target.value })
              }}
            >
              <option value="" disabled hidden>
                Select Purok
              </option>
              <option value="Purok 1">Purok 1</option>
              <option value="Purok 2">Purok 2</option>
              <option value="Purok 3">Purok 3</option>
              <option value="Purok 4">Purok 4</option>
              <option value="Purok 5">Purok 5</option>
              <option value="Purok 6">Purok 6</option>
              <option value="Purok 7">Purok 7</option>
            </select>
          </div>
        </div>

        <div className="two-input">
          <div className="input-div">
            <label htmlFor="addResidentHouseNumber">Household Number</label>
            <input
              type="number"
              id="addResidentHouseNumber"
              className="form-control rounded-0 half-width"
              placeholder="Enter your household number"
              onChange={e => {
                setResidents({ ...residents, houseNumber: e.target.value })
              }}
            />
          </div>
          <div className="input-div">
            <label htmlFor="addResidentKinshipTerms">Kinship Terms</label>
            <select
              name="addResidentKinshipTerms"
              id="addResidentKinshipTerms"
              defaultValue=""
              className="form-select rounded-0 half-width"
              onChange={e => {
                setResidents({ ...residents, kinship: e.target.value })
              }}
            >
              <option value="" disabled hidden>
                Select Term
              </option>
              <option value="Husband">Husband</option>
              <option value="Wife">Wife</option>
              <option value="Member">Member</option>
              <option value="Relatives">Relatives</option>
              <option value="Kasambahay">Kasambahay</option>
              <option value="Boarders">Boarders</option>
            </select>
          </div>
        </div>

        <div className="input-div">
          <label htmlFor="addResidentAddress">Complete Address</label>
          <input
            type="text"
            id="addResidentAddress"
            placeholder="Enter you complete address"
            className="form-control rounded-0"
            onChange={e => {
              setResidents({ ...residents, address: e.target.value })
            }}
          />
        </div>
        <div className="input-div">
          <label htmlFor="addResidentEducational">Educational Attainment</label>
          <textarea
            type="text"
            id="addResidentEducational"
            rows={5}
            cols={30}
            placeholder="Enter you Educational Attainment"
            className="form-control rounded-0"
            onChange={e => {
              setResidents({
                ...residents,
                educationalAttainment: e.target.value,
              })
            }}
          />
        </div>
        <div className="input-div">
          <label htmlFor="addResidentOccupation">Occupation</label>
          <input
            type="text"
            id="addResidentOccupation"
            placeholder="Enter you occupation"
            className="form-control rounded-0"
            onChange={e => {
              setResidents({ ...residents, occupation: e.target.value })
            }}
          />
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success official-add-button w-50"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddResident
