const express = require('express');
const router = express.Router();
const usersModel = require("../models/users")


const dbHandler = require("../models/dbmong");

router.get("/",
    (req, res, next) => usersModel.checkToken(req, res, next),
    async (req, res) => {

    const artiklarna = await dbHandler.findAll();

    res.status(200).json({
        artiklarna
    });
});

router.post("/", async (req, res) => {
    if(req.body.Heading && req.body.Text){
    const result = await dbHandler.insertOne(req.body);
    return res.status(201).json(result);
    }else {
    return res.status(400).json({
        errors:{message: "Rubrik and Text needed"}
    })}
});

router.put("/", async (req, res) => {
    console.log(req.body)
    if(req.body._id && req.body.Text){
    const result = await dbHandler.updateOne(req.body);
    return res.status(201).json(result);
    } else {
        return res.status(400).json({
            errors:{message: "Id and Text needed"}
        })}
    }
);

module.exports = router;