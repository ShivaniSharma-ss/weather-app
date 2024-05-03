const express = require("express");
const PORT = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const routeProtect = require("./middleware/auth.js");

const connection = require("./connection");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/getUserByEmail", (req, res) => {
  const email = req.query.email;
  connection.query(
    `SELECT * from users where email='${email}'`,
    function (err, rows, fields) {
      if (!err) {
        res.send(JSON.stringify(rows));
      } else {
        res.status(401).json(err);
      }
    }
  );
});

app.post("/addUser", (req, res) => {
  const { name, email } = req.body;
  connection.query(
    `insert into users (name,email) values('${name}','${email}')`,
    function (err, rows, fields) {
      if (!err) {
        res.send(JSON.stringify(rows));
      } else {
        res.status(401).json(err);
      }
    }
  );
});

app.post("/updateUser", (req, res) => {
  const { password, email } = req.body;
  connection.query(
    `update users set password='${password}', is_verified=1 where email='${email}'`,
    function (err, rows, fields) {
      if (!err) {
        res.send(JSON.stringify(rows));
      } else {
        res.status(401).json(err);
      }
    }
  );
});

app.post("/send-email", (req, res) => {
  const email = req.query.email;

  // Create a transporter with nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "senddummymail7@gmail.com",
      pass: "pkhl ygyj pqrx loax",
    },
  });

  // Email content
  const mailOptions = {
    from: "senddummymail7@gmail.com",
    to: email,
    subject: "Welcome to Our App!",
    text: `Thank you for signing up! Here is the link to our web application: http://localhost:3000/setPassword?email=${email}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});
