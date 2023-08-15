import chai from "chai";
import chaiHttp from "chai-http";
// import { createPost } from "../controller/postController.js";
import Post from "../models/postModel.js";
import app from "../app.js";

chai.use(chaiHttp);
const expect = chai.expect;

const token = "token";

describe("createPost", () => {
  it("should create a post with all details entered", async () => {
    const response = await chai
      .request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Title", description: "Test Description" });

    expect(response).to.have.status(201);
    expect(response.body.status).to.equal("success");
    expect(response.body.data.title).to.equal("Test Title");
    expect(response.body.data.description).to.equal("Test Description");

    const postId = response.body.data._id;
    const postFromDatabase = await Post.findById(postId);

    expect(postFromDatabase.title).to.equal("Test Title");
    expect(postFromDatabase.description).to.equal("Test Description");
  });

  it("should not create a post when Title field is missing", async () => {
    const token = "your-valid-jwt-token";

    const initialUserPosts = await Post.countUserPosts("user1");

    const response = await chai
      .request(app)
      .post("/api/create-post")
      .set("Authorization", `Bearer ${token}`)
      .send({ description: "Test Description" });

    expect(response).to.have.status(400);
    expect(response.body.status).to.equal("fail");
    expect(response.body.message).to.equal("Path `title` is required.");

    const finalUserPosts = await Post.countUserPosts("user1");

    expect(finalUserPosts).to.equal(initialUserPosts);
  });
});
