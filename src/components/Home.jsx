import { useState, useEffect } from "react"
import axios from "axios"

function Home() {
  const [residentsTotal, setResidentsTotal] = useState()
  const [maleTotal, setMaleTotal] = useState()
  const [femaleTotal, setFemaleTotal] = useState()
  const [householdTotal, setHouseholdTotal] = useState()

  useEffect(() => {
    residentsCount()
    maleCount()
    femaleCount()
    householdCount()
  }, [])

  const residentsCount = () => {
    try {
      axios
        .get(
          "https://community-connect-backend.onrender.com/auth/residents_count"
        )
        .then(result => {
          setResidentsTotal(result.data.Result[0].residents)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const maleCount = () => {
    try {
      axios
        .get("https://community-connect-backend.onrender.com/auth/male_count")
        .then(result => {
          setMaleTotal(result.data.Result[0].total_male)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const femaleCount = () => {
    try {
      axios
        .get("https://community-connect-backend.onrender.com/auth/female_count")
        .then(result => {
          setFemaleTotal(result.data.Result[0].total_female)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const householdCount = () => {
    try {
      axios
        .get(
          "https://community-connect-backend.onrender.com/auth/household_count"
        )
        .then(result => {
          setHouseholdTotal(result.data.Result[0].total_households)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home-container">
      <div className="total-population">
        <div className="logoTotal">
          <i className="bi bi-people-fill"></i>
          <p>{residentsTotal}</p>
        </div>
        <div className="logoTotalText">
          <p>Total Population</p>
        </div>
      </div>

      <div className="total-male">
        <div className="logoTotal">
          <i className="bi bi-person-standing"></i>
          <p>{maleTotal}</p>
        </div>
        <div className="logoTotalText">
          <p>Total Male</p>
        </div>
      </div>

      <div className="total-female">
        <div className="logoTotal">
          <i className="bi bi-person-standing-dress"></i>
          <p>{femaleTotal}</p>
        </div>
        <div className="logoTotalText">
          <p>Total Female</p>
        </div>
      </div>

      <div className="total-household">
        <div className="logoTotal">
          <i className="bi bi-houses-fill"></i>
          <p>{householdTotal}</p>
        </div>
        <div className="logoTotalText">
          <p>Total Household</p>
        </div>
      </div>
    </div>
  )
}

export default Home
