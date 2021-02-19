'use strict';

const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp); // associate the module with chai
const app = require('../server');
const { TDL_URL } = require('../config/CONSTS.json');

describe(`A simple test `, () => {

    // does 1 + 1 = 2
    it(`should return when 1+1`, () => {
        const expression = 1 + 1;
        expect(expression).to.equal(2);
    });

    it("Another one", () => {
        const val = null;
        expect(val).to.be.null;
    });
});

describe('TDL Routes', () => {

    it(`Test /hello route`, (done) => {
        // check if the call is successful
        // app = http://localhost:5000
        chai.request(app)
            .get("/hello")
            .end((err, res) => {
                if (err) {
                    console.log(`Something went wrong!`);
                    done(err);
                }
                expect(res).to.have.status(200);
                // expect(res).to.have.property(`hello`);
                done();
            });
    });

    it(`Test /getAll route`, (done) => {
        chai.request(app)
            .get(`${TDL_URL}/read/getAll`)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.body).to.not.be.null;
                res.body.map((item) => expect(item).to.contain.key(`_id`));
                res.body.map((item) => expect(item._id).to.be.a(`string`));
                done();
            });
    });

    it(`Test /create route`, (done) => {
        chai.request(app)
            .post(`${TDL_URL}/create`)
            .send({ 'title': 'Clean dishes' })
            .end((err, res) => {
                if (err) done(err);
                expect(err).to.to.be.null;
                expect(res).to.not.be.undefined;
                expect(res).to.have.status(201);
                expect(res).to.have.property(`text`, `Clean dishes added`);
                done();
            });
    });

    after(() => {
        app.close();
    });
});