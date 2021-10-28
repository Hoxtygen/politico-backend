
import request from 'supertest';
import app from '../app';


describe('Testing / route', () => {
    it("should return welcome message for / route", (done) => {
        request(app).get("/").expect(200).end((err, res) => {
            if (err) return done(err)
            expect(res.body).toMatchObject({ message: "Welcome to Politico API" })
            done()
        })
    });

    it("should return welcome message for /  api version 1 route", (done) => {
        request(app).get("/api/v1").expect(200).end((err, res) => {
            if (err) return done(err)
            expect(res.body).toMatchObject({ message: "Welcome to Politico API v1. Documentation coming soon." })
            done()
        })
    });

})
