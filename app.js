const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const dbHandler = require("./models/dbmong");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "kolla kolla"
        }
    };

    res.json(data);
});


app.get("/artiklar", async (req, res) => {
    const artiklarna = await dbHandler.findAll();

    res.status(200).json({
        artiklarna
    });
});

app.post("/artiklar", async (req, res) => {
    if(req.body.Rubrik && req.body.Text){
    const result = await dbHandler.insertOne(req.body);
    return res.status(201).json(result);
    }else {
    return res.status(400).json({
        errors:{message: "Rubrik and Text needed"}
    })}
});

app.put("/artiklar", async (req, res) => {
    if(req.body._id && req.body.Text){
    const result = await dbHandler.updateOne(req.body);
    return res.status(201).json(result);
    } else {
        return res.status(400).json({
            errors:{message: "Id and Text needed"}
        })}
    }
);

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = app