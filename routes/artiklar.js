const express = require("express");
const router = express.Router();

const dbHandler = require("../models/dbmong");

router.post("/", async (req, res) => {
    if(req.body.Heading && req.body.Text && req.body.Author) {
    const result = await dbHandler.insertOne(req.body);
    return res.status(201).json(result);
    } else {
    return res.status(400).json({
        message: "Heading, Text and Author needed"
    });}
});

router.put("/", async (req, res) => {
    if(req.body._id && req.body.Text) {
        const result = await dbHandler.updateOne(req.body);
        return res.status(201).json(result);
    } else {
        return res.status(400).json({
            message: "Id and Text needed"
        });}
    }
);

module.exports = router;