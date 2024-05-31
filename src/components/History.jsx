import axios from "axios"
import React, { useEffect, useState } from "react"

function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      axios
        .get("https://community-connect-backend.onrender.com/auth/history")
        .then(result => {
          if (result.data.Status) {
            setHistory(result.data.Result)
          } else {
            alert(result.data.Error)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="officials-container">
      <h3 className="text-center">Delete History</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reason</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.reason}</td>
              <td>{item.other_reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default History
