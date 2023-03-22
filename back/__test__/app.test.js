const app = require("../app.js");
const request = require("supertest");
const mongoose = require("mongoose");


describe("user", () => {
  it("create user", async () => {
    const res = await request(app).post("/signup").send({
      email: "aaaaaaaaa@gmail.com",
      password: "12345678",
      last_name: "Flen",
      first_name: "Ben Flen",
      gender: "Male",
      role: "Client",
      date_of_birth: "1990/01/01",
      phone_number: "+21612345678",
      address: "Elmourouj",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("User Created, Success");
    expect(res.body.status).toEqual("success");
  }, 20000);
  it("verify mail", async () => {
    // const res = await request(app).post;
  });
  it("login", async () => {
    const res = await request(app).post("/signup").send({
      email: "aaaaaaaaa@gmail.com",
      password: "12345678",
    });
  });
  it("enable 2fa", async () => {});
  it("login 2fa", async () => {});
});
