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

    it("should return status code for  /  api version 1 route", async () => {
        const res = await request(app).get("/api-docs.json");
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json")

    });

})
