import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import DatabaseConnectionManager from "../database";
//chai
chai.use(chaiHttp);
chai.should();
//server section
import { setupServer } from "../app";

describe("tsuttakater API Server", () => {
  let request, server;

  before(async () => {
    await DatabaseConnectionManager.connect();
    server = setupServer().app;
  });

  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });

  afterEach(() => {
    request.close();
  });

  it("GET /api/users should be return entire user list", async () => {
    const res = await request.get("/api/users");
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).length.should.be.least(0);
  });
});
