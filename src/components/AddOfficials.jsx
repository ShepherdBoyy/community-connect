import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddOfficials() {
  const [official, setOfficial] = useState({
    name: "",
    age: "",
    position: "",
    image: "",
  })
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", official.name)
    formData.append("age", official.age)
    formData.append("position", official.position)
    formData.append("image", official.image)

    try {
      await axios
        .post(
          "https://community-connect-backend.onrender.com/auth/add_official",
          formData
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
        <h3 className="text-center">Add Barangay Officials</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12 mb-3">
            <label htmlFor="addOfficialName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="addOfficialName"
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
              defaultValue=""
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
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={e => {
                setOfficial({ ...official, image: e.target.files[0] })
              }}
            />
          </div>
          <div className="col-12 d-flex justify-content-center mt-5">
            <button
              type="submit"
              className="btn btn-success official-add-button w-50"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddOfficials
