/* global it describe */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();

chai.use(chaiHttp);

describe("Testing app.js/graphql requests", () => {

    it("Test GraphQL expect status 200", () => {
      let body = { query: "{ Docs { Heading Text Author Allowed_users _id }}"};

      chai.request(server)
          .post("/graphql")
          .send(body)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
          });
    });

    it("Test GraphQL without query, expect status 400",  function() {
      chai.request(server)
          .post("/graphql")
          .send()
          .end((err, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
          });
    });

    it("Test GraphQL with nonsense query, expect status 400 not found",  function() {
      let body =  { query: "{ Docs { nonsense }}"};
      chai.request(server)
          .post("/graphql")
          .send(body)
          .end((err, response) => {
            response.should.have.status(400);
            response.body.should.be.a("object");
          });
    });
});
