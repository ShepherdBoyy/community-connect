import express from "express"
import con from "../utils/db.js"
import jwt from "jsonwebtoken"
import multer from "multer"
import path from "path"
import nodemailer from "nodemailer"

const router = express.Router()

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? and password = ?"
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" })
    if (result.length > 0) {
      const email = result[0].email
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        {
          expiresIn: "1d",
        }
      )
      res.cookie("token", token)
      return res.json({ loginStatus: true })
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" })
    }
  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: storage,
})

router.post("/add_official", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO barangay_officials (`name`, `age`, `position`, `image`) VALUES (?)"
  const values = [
    req.body.name,
    req.body.age,
    req.body.position,
    req.file.filename,
  ]
  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true })
  })
})

router.get("/official", (req, res) => {
  const sql = "SELECT * FROM barangay_officials"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/official/:id", (req, res) => {
  const id = req.params.id
  const sql = "SELECT * FROM barangay_officials WHERE id = ?"
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.put("/edit_official/:id", (req, res) => {
  const id = req.params.id
  const sql =
    "UPDATE barangay_officials SET name = ?, age = ?, position = ? WHERE id = ?"
  const values = [req.body.name, req.body.age, req.body.position]

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.delete("/delete_official/:id", (req, res) => {
  const id = req.params.id
  const sql = "DELETE FROM barangay_officials WHERE id = ?"
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.post("/add_resident", (req, res) => {
  const sql =
    "INSERT INTO residents (`name`, `age`, `sex`, `birthdate`, `purok`, `house_number`, `kinship`, `address`, `education`, `occupation`) VALUES (?)"
  const values = [
    req.body.name,
    req.body.age,
    req.body.sex,
    req.body.birthdate,
    req.body.purok,
    req.body.houseNumber,
    req.body.kinship,
    req.body.address,
    req.body.educationalAttainment,
    req.body.occupation,
  ]
  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true })
  })
})

router.get("/residents", (req, res) => {
  const sql = "SELECT * FROM residents"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/residents/:id", (req, res) => {
  const id = req.params.id
  const sql = "SELECT * FROM residents WHERE id = ?"
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.put("/edit_residents/:id", (req, res) => {
  const id = req.params.id
  const sql =
    "UPDATE residents SET name = ?, age = ?, sex = ?, birthdate = ?, purok = ?, house_number = ?, kinship = ?, address = ?, education = ?, occupation = ? WHERE id = ?"
  const values = [
    req.body.name,
    req.body.age,
    req.body.sex,
    req.body.birthdate,
    req.body.purok,
    req.body.houseNumber,
    req.body.kinship,
    req.body.address,
    req.body.educationalAttainment,
    req.body.occupation,
  ]

  const birthdate = new Date(req.body.birthdate)
  const formattedBirthdate = birthdate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")

  // Update the birthdate value in the array
  values[3] = formattedBirthdate

  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.delete("/delete_resident/:id", (req, res) => {
  const id = req.params.id
  const sql = "DELETE FROM residents WHERE id = ?"
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/household_record", (req, res) => {
  const sql =
    "SELECT house_number, COUNT(*) AS household_members_count FROM residents GROUP BY house_number"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/household_members/:house_number", (req, res) => {
  const house_number = req.params.house_number
  const sql = "SELECT * FROM residents WHERE house_number = ?"
  con.query(sql, [house_number], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/residents_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS residents FROM residents"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/male_count", (req, res) => {
  const sql = "SELECT COUNT(*) AS total_male FROM residents WHERE sex = 'male'"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/female_count", (req, res) => {
  const sql =
    "SELECT COUNT(*) AS total_female FROM residents WHERE sex = 'female'"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/household_count", (req, res) => {
  const sql =
    "SELECT COUNT(DISTINCT house_number) AS total_households FROM residents"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.get("/logout", (req, res) => {
  res.clearCookie("token")
  return res.json({ Status: true })
})

router.get("/password", (req, res) => {
  const sql = "SELECT password FROM admin"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.put("/change_password", (req, res) => {
  const sql = "UPDATE admin SET password = ?, email = ? WHERE id = 1"

  con.query(sql, [req.body.newPassword, req.body.newEmail], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.post("/add_account", (req, res) => {
  const sql = "INSERT INTO admin (`email`, `password`) VALUES (?)"
  const values = [req.body.email, req.body.password]
  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true })
  })
})

router.post("/delete_history", (req, res) => {
  const sql =
    "INSERT INTO history (`name`, `reason`, `other_reason`) VALUES (?)"
  const values = [req.body.name, req.body.reason, req.body.others]
  con.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true })
  })
})

router.get("/history", (req, res) => {
  const sql = "SELECT * FROM history"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    })

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>CodePen - OTP Email Template</title>
          

        </head>
        <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
            <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Koding 101 Inc</p>
              <p>1600 Amphitheatre Parkway</p>
              <p>California</p>
            </div>
          </div>
        </div>
        <!-- partial -->
          
        </body>
        </html>`,
    }
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error)
        return reject({ message: `An error has occured` })
      }
      return resolve({ message: "Email sent succesfuly" })
    })
  })
}

router.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message))
})

export { router as adminRouter }
