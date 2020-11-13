import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import DatabaseConnectionManager from "../database";
//chai
chai.use(chaiHttp);
chai.should();
//server section
import { setupServer } from "../app";
import { getRepository, Repository, Not, IsNull } from "typeorm";
import User from "../entities/User";

describe("tsuttakater API Server", () => {
  let request, server,testUser;
  let userRepository: Repository<User>;

  before(async () => {
    await DatabaseConnectionManager.connect();
    server = setupServer().app;
    userRepository = getRepository(User);
  });
  
  after(async ()=> {
  });

  beforeEach(async () => {
    /*** setup ***/
    //insert test data;
    testUser = new User();
    testUser.id = 1000;
    testUser.username = "test user";
    testUser = await userRepository.save(testUser);

    request = chai.request(server).keepOpen();
  });

  afterEach(async () => {
    request.close();
    /*** Teardown ***/
    //clear users table
    await userRepository.delete({id:Not(IsNull())});
  });

  it("GET /api/users should be return entire user list", async () => {
    //setup
    const endpoint = "/api/users";
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).length.should.equal(1);
  });

  it.skip("GET /api/users/:id should be return user", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id;
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(testUser);
  });

  it.skip("POST /api/users/ should register new user",async () => {
    //setup
    const endpoint = "/api/users";
    const sampleUser = new User();
    sampleUser.id = 2000;
    sampleUser.username = "sampleUser";
    const endpoint2 = "/api/users/" + sampleUser.id;
    //exercise
    const res = await request.post(endpoint).send(sampleUser);
    const res2 = await request.get(endpoint2);
    //assertion
    res.should.have.status(201);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(sampleUser);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(sampleUser);

  })
  it.skip("PATCH /api/users/:id should modify user info",async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id;
    const patchUser = {username:"patch user"};
    //exercise
    const res = await request.post(endpoint).send(patchUser);
    const res2 = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).id.should.equal(testUser.id);
    JSON.parse(res.text).username.should.equal(patchUser.username);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).id.should.equal(testUser.id);
    JSON.parse(res2.text).username.should.equal(patchUser.username);
  })

  it.skip("DELETE /api/users/:id should delete user",async () =>{
    //setup
    const endpoint = "/api/users/" + testUser.id;
    //exercise
    const res = await request.delete(endpoint);
    const res2 = await request.get(endpoint);
    //assertion
    res.should.have.status(204);
    res2.should.have.status(404);
 
  })

});
