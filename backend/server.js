const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors(http://localhost:3000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'YOUR_GMAIL_ACCOUNT',
    pass: 'YOUR_GMAIL_PASSWORD',
  },
});

app.post('/api/sendmail', (req, res) => {
  const message = {
    from: req.body.email,
    to: 'YOUR_EMAIL_ADDRESS',
    subject: 'New Message from Contact Form',
    html: `
      <p>Name: ${req.body.name}</p>
      <p>Email: ${req.body.email}</p>
      <p>Message: ${req.body.message}</p>
    `,
  };
  
  smtpTransport.sendMail(message, (error, response) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(200).send({ message: 'Email sent successfully!' });
    }
    smtpTransport.close();
  });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
