import { expect } from "chai";
import * as userService from "../utils/userFunction.js";
import dummyUsers from "../data/users.js";

describe("userService", () => {
  it("findOne should find a user by email", () => {
    const foundUser = userService.findOne("tony@stark.io");
    expect(foundUser).to.deep.equal(dummyUsers[0]);
  });

  it("findById should find a user by Id", () => {
    const foundUser = userService.findById(1001);
    expect(foundUser).to.deep.equal(dummyUsers[0]);
  });
});
