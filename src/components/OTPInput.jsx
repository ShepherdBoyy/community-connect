import React, { useContext, useEffect, useState } from "react"
import { RecoveryContext } from "../App"
import axios from "axios"

function OTPInput() {
  const { email, otp, setPage } = useContext(RecoveryContext)
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0])
  const [timerCount, setTimerCount] = useState(60)
  const [disable, setDisable] = useState(true)

  const resendOTP = () => {
    if (disable) return
    axios
      .post(
        "https://community-connect-backend.onrender.com/auth/send_recovery_email",
        {
          OTP: otp,
          recipient_email: email,
        }
      )
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email"))
      .then(() => setTimerCount(60))
      .catch(console.log)
  }

  const verifyOTP = () => {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset")
      return
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    )
    return
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimerCount(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval)
        if (lastTimerCount <= 1) setDisable(false)
        if (lastTimerCount <= 0) return lastTimerCount
        return lastTimerCount - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [disable])

  return (
    <div className="otp-input-container">
      <div className="otp-header">
        <h3>Email Verification</h3>
        <p>We have sent a code to your email {email}</p>
      </div>

      <div className="otp-number">
        <input
          maxLength="1"
          type="text"
          name=""
          id=""
          className="form-control rounded-0"
          onChange={e =>
            setOTPinput([e.target.value, OTPinput[1], OTPinput[2], OTPinput[3]])
          }
        />

        <input
          maxLength="1"
          type="text"
          name=""
          id=""
          className="form-control rounded-0"
          onChange={e =>
            setOTPinput([OTPinput[0], e.target.value, OTPinput[2], OTPinput[3]])
          }
        />

        <input
          maxLength="1"
          type="text"
          name=""
          id=""
          className="form-control rounded-0"
          onChange={e =>
            setOTPinput([OTPinput[0], OTPinput[1], e.target.value, OTPinput[3]])
          }
        />

        <input
          maxLength="1"
          type="text"
          name=""
          id=""
          className="form-control rounded-0"
          onChange={e =>
            setOTPinput([OTPinput[0], OTPinput[1], OTPinput[2], e.target.value])
          }
        />
      </div>

      <div className="otp-button">
        <button onClick={() => verifyOTP()}>Verify Account</button>
      </div>

      <div className="resend-code">
        <p>Didn't receive the code?</p>{" "}
        <a
          className="flex flex-row items-center"
          style={{
            color: disable ? "gray" : "blue",
            cursor: disable ? "none" : "pointer",
            textDecorationLine: disable ? "none" : "underline",
          }}
          onClick={() => resendOTP()}
        >
          {disable ? `Resend OTP about ${timerCount}s` : "Resend OTP"}
        </a>
      </div>
    </div>
  )
}

export default OTPInput
