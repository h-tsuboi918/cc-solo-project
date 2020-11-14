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
import Tweet from "../entities/Tweet";

describe("tsuttakater API Server", () => {
  let request, server, testUser, testTweet;
  let userRepository: Repository<User>;
  let tweetRepository: Repository<Tweet>;

  before(async () => {
    await DatabaseConnectionManager.connect();
    server = setupServer().app;
    userRepository = getRepository(User);
    tweetRepository = getRepository(Tweet);
    await userRepository.delete({ id: Not(IsNull()) });
    await tweetRepository.delete({ id: Not(IsNull()) });
  });

  beforeEach(async () => {
    /*** setup ***/
    //insert test data
    testUser = new User();
    testUser.id = "3461cac2-35bd-4d45-a163-f220beb43d76";
    testUser.username = "test user";
    testUser = await userRepository.save(testUser);
    //insert tweet data
    testTweet = new Tweet();
    testTweet.id = "4562cac2-35bd-4d45-a163-f220beb43d76";
    testTweet.text = "test tweet";
    testTweet.userId = testUser.id;
    testTweet = await tweetRepository.save(testTweet);
    //make relation
    testUser.tweets = [];
    testUser.tweets.push(testTweet);

    request = chai.request(server).keepOpen();
  });

  afterEach(async () => {
    request.close();
    /*** Teardown ***/
    //clear users table
    await userRepository.delete({ id: Not(IsNull()) });
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

  it("GET /api/users/:userId should be return user with tweets", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id;
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(testUser);
  });

  it("POST /api/users should register new user", async () => {
    //setup
    const endpoint = "/api/users";
    const sampleUser = new User();
    sampleUser.username = "sampleUser";
    //exercise
    const res = await request.post(endpoint).send(sampleUser);
    //assertion
    res.should.have.status(201);
    res.should.be.json;
    JSON.parse(res.text).id.should.be.not.null;
    JSON.parse(res.text).username.should.equal(sampleUser.username);

    //setup
    sampleUser.id = JSON.parse(res.text).id;
    sampleUser.tweets = [];
    const endpoint2 = "/api/users/" + sampleUser.id;
    //exercise
    const res2 = await request.get(endpoint2);
    //asertion
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).should.deep.equal(sampleUser);
  });

  it("PATCH /api/users/:userId should modify user info", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id;
    const patchUser = { username: "patch user" };
    //exercise
    const res = await request.patch(endpoint).send(patchUser);
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
  });

  it("DELETE /api/users/:userId should delete user", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id;
    //exercise
    const res = await request.delete(endpoint);
    const res2 = await request.get(endpoint);
    //assertion
    res.should.have.status(204);
    res2.should.have.status(404);
  });

  it("GET /api/tweets should return entire tweet list", async () => {
    //setup
    const endpoint = "/api/tweets";
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).length.should.be.at.least(1);
  });

  it("GET /api/users/:userId/tweets should return entire tweet list for user", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id + "/tweets";
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).length.should.be.at.least(1);
  });

  it("GET /api/users/:userId/tweets/:tweetId should return tweet info", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id + "/tweets/" + testTweet.id;
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal(testTweet);
  });

  it("POST /api/users/:userId/tweets should register new tweet", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id + "/tweets";
    const sampleTweet = new Tweet();
    sampleTweet.text = "sampleTweet";
    //exercise
    const res = await request.post(endpoint).send(sampleTweet);
    //assertion
    res.should.have.status(201);
    res.should.be.json;
    JSON.parse(res.text).id.should.be.not.null;
    JSON.parse(res.text).text.should.equal(sampleTweet.text);

    //setup
    sampleTweet.id = JSON.parse(res.text).id;
    const endpoint2 = "/api/users/" + testUser.id + "/tweets/" + sampleTweet.id;
    //exercise
    const res2 = await request.get(endpoint2);
    //asertion
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).text.should.equal(sampleTweet.text);
  });

  it("PATCH /api/users/:userId/tweets/:tweetId should modify tweet info", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id + "/tweets/" + testTweet.id;
    const patchTweet = { text: "patch tweet" };
    //exercise
    const res = await request.patch(endpoint).send(patchTweet);
    const res2 = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).id.should.equal(testTweet.id);
    JSON.parse(res.text).text.should.equal(patchTweet.text);
    res2.should.have.status(200);
    res2.should.be.json;
    JSON.parse(res2.text).id.should.equal(testTweet.id);
    JSON.parse(res2.text).text.should.equal(patchTweet.text);
  });

  it("DELETE /api/users/:userId/tweets/:tweetId should delete tweet", async () => {
    //setup
    const endpoint = "/api/users/" + testUser.id + "/tweets/" + testTweet.id;
    //exercise
    const res = await request.delete(endpoint);
    const res2 = await request.get(endpoint);
    //assertion
    res.should.have.status(204);
    res2.should.have.status(404);
  });
});
