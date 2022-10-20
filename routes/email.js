const express = require('express');
const router = express.Router();
const domain = 'sandbox590999eacb2f4d2f899ce7f985f1a71f.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
require('dotenv').config();




router.post("/",async (req, res) => {
    let data = {
    from: 'Excited User <'+req.body.sender+'>',
    to: req.body.email,
    subject: 'You have been invited to edit document: ' + req.body.documentName,
    text: 'Log in to https://www.student.bth.se/~alst21/editor/ !'
    };
    console.log(data)
    await mailgun.messages().send(data, async function (error, body) {
        if(error) {
            return res.status(401).json(error)
        }
        return res.status(200).json(body)
    });
}
);


module.exports = router;
