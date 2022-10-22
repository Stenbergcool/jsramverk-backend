/* global it describe */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();

chai.use(chaiHttp);

describe("Testing artiklar.js/artiklar api", () => {

    it("Test artiklar POST expect status 201",  function() {
        let body =  {
                    Heading: "Rubriken",
                    Text: "param param param",
                    Author: "Alex@hotmail.com",
                    Allowed_users: ["1", "2"]
                    };
        chai.request(server)
            .post("/artiklar")
            .send(body)
            .end((err, response) => {
                response.should.have.status(201);
            });
    });

    it("Test artiklar POST with bad params expect status 400",  function(done) {
        let body =  {
                    Heading: "Rubriken",
                    Text: "param param param",
                    Allowed_users: ["1", "2"]
                    };
        chai.request(server)
            .post("/artiklar")
            .send(body)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
            done();
            });
    });

    it("Test artiklar PUT expect status 201",  function(done) {
        let body =  {
                    Heading: "TestOne",
                    Text: "<p>testOne</p>",
                    _id: "633c4ca79672b47997591499"
                    };
        chai.request(server)
            .put("/artiklar")
            .send(body)
            .end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            done();
            });
    });

    it("Test artiklar PUT with bad params expect status 400",  function(done) {
        let body =  {
                        Heading: "TestOne",
                        Text: "<p>testOne</p>"
                    };
        chai.request(server)
            .put("/artiklar")
            .send(body)
            .end((err, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            done();
            });
    });

});
