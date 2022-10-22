const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js")({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
require("dotenv").config();




router.post("/",async (req, res) => {
    let data = {
    from: "Excited User <"+req.body.sender+">",
    to: req.body.email,
    subject: "You have been invited to edit document: " + req.body.documentName,
    text: "Log in to https://www.student.bth.se/~alst21/editor/ !"
    };
    if(!req.body.documentName) {
        return res.status(400).send("document name is missing");
    }
    await mailgun.messages().send(data, async function (error, body) {
        if(error) {
            return res.status(400).send("Sender or Recipiant is missing.");
        }
        return res.status(200).json(body);
    });
}
);


module.exports = router;
