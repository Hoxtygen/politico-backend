import request from 'supertest';
import app from '../app';

const db = require("../database/dbConfig")


describe('Users', () => {
  beforeAll(function (done) {
    db.migrate.rollback()
      .then(function () {
        db.migrate.latest()
          .then(function () {
            return db.seed.run()
              .then(function () {
                done();
              });
          });
      });
  });

  afterAll(function (done) {
    db.migrate.rollback()
      .then(function () {
        done();
      });
  });

 

  const user = {
    firstName: "John",
    lastName: "Magdalene",
    email: "john@aol.com",
    otherName: "Alison",
    passportUrl: "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551327976/olitorius_xnr3f8.jpg",
    phoneNumber: "09087987809",
    gender: "male",
    isAdmin: false,
    password: "Lkfkgkgkgkk!1"
  }
  it("should create a new user", async () => {
    const result = await request(app).post("/api/v1/user").send(user)
    expect(result.status).toBe(201)
    expect(result.body).toHaveProperty("user")
    expect(result.body).toHaveProperty("token")
    expect(result.body).toHaveProperty("message")

  });

  it("should return a 400 for missing phone number", async () => {
    const newUser = {
      firstName: "Jeff",
      lastName: "Bezos",
      email: "jeff_bezos@aol.com",
      otherName: "Alison",
      passportUrl: "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551327976/olitorius_xnr3f8.jpg",
      gender: "male",
      isAdmin: false,
      password: "Lkfkgkgkgkk!1"
    }
    const result = await request(app).post("/api/v1/user").send(newUser)
    expect(result.status).toBe(400)
  });

  it("should return 400 for wrong password format", async () => {
    const newUser = {
      firstName: "John",
      lastName: "Magdalene",
      email: "john_magda@aol.com",
      otherName: "Alison",
      passportUrl: "https://res.cloudinary.com/dh3jxarvg/image/upload/v1551327976/olitorius_xnr3f8.jpg",
      gender: "male",
      isAdmin: false,
      phoneNumber: "09087987809",
      password: "Lkfkgkgkgkkhj76"
    };

    const result = await request(app).post("/api/v1/user").send(newUser)
    expect(result.status).toBe(400)
  })

  it("should return 409 for duplicating user", async () => {
    const result = await request(app).post("/api/v1/user").send(user)
    expect(result.status).toBe(409)
  });

  it("should return 200 for existing user", (done) => {
    const exist = {
      email: "john@aol.com"
    }
    request(app).get("/api/v1/user").send(exist).expect(200).end((err, res) => {
      if (err) return done(err)
      expect(res.status).toBe(200)
      done()
    })
  })

  it("should return 404 for non-existing user", (done) => {
    const nonexist = {
      email: "john_doe@aol.com"
    }
    request(app).get("/api/v1/user").send(nonexist).expect(404).end((err, res) => {
      if (err) return done(err)
      expect(res.status).toBe(404)
      done()
    })
  })
})
