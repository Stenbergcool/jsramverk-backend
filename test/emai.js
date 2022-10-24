/* global it describe */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();

chai.use(chaiHttp);

describe("Testing email.js/Mailgunner", () => {

    it("Tests email POST without emailRecipiant expect error 400", function() {
      const data = {
        sender: "test@test.com",
        documentName: "Tjolahopp"
      };
      chai.request(server)
          .post("/email")
          .send(data)
          .end((err, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.text.should.be.eq("Sender or Recipiant is missing.");
          });
    });

    it("Tests email POST without documentName expect error 400", function() {
      const data = {
        sender: "test@test.com",
        email: "test@test.com"
      };
      chai.request(server)
          .post("/email")
          .send(data)
          .end((err, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
            response.text.should.be.eq("document name is missing");
          });
    });
});
