import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function EditOfficial() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [official, setOfficial] = useState({
    name: "",
    age: "",
    position: "",
  })

  useEffect(() => {
    try {
      axios
        .get(
          "https://community-connect-backend.onrender.com/auth/official/" + id
        )
        .then(result => {
          setOfficial({
            ...official,
            name: result.data.Result[0].name,
            age: result.data.Result[0].age,
            position: result.data.Result[0].position,
          })
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    try {
      axios
        .put(
          "https://community-connect-backend.onrender.com/auth/edit_official/" +
            id,
          official
        )
        .then(result => {
          if (result.data.Status) {
            navigate("/community-connect/dashboard/brgy-officials")
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="add-officials-container">
      <div className="p-3 rounded officials-second-container">
        <h3 className="text-center">Edit Barangay Official</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12 mb-3">
            <label htmlFor="addOfficialName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="addOfficialName"
              value={official.name}
              placeholder="Enter you name"
              onChange={e => {
                setOfficial({ ...official, name: e.target.value })
              }}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="addOfficialAge" className="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="addOfficialAge"
              placeholder="Enter your age"
              value={official.age}
              onChange={e => {
                setOfficial({ ...official, age: e.target.value })
              }}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="addOfficialPosition" className="form-label">
              Position
            </label>
            <select
              name="addOfficialPosition"
              id="addOfficialPosition"
              className="form-select"
              value={official.position}
              onChange={e => {
                setOfficial({ ...official, position: e.target.value })
              }}
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="Punong Barangay">Punong Barangay</option>
              <option value="Barangay Kagawad">Barangay Kagawad</option>
              <option value="SK Chairperson">SK Chairperson</option>
              <option value="Barangay Secretary">Barangay Secretary</option>
              <option value="Barangay Treasurer">Barangay Treasurer</option>
            </select>
          </div>
          <div className="col-12 d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-success official-add-button w-50"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditOfficial
