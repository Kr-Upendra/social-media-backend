import { expect } from "chai";
import { AppError } from "../utils/AppError.js";

describe("AppError", () => {
  it("should create an instance of AppError", () => {
    const error = new AppError("error message", 400);
    expect(error).to.be.an.instanceOf(AppError);
  });

  it("should have the correct properties", () => {
    const error = new AppError("Test error message", 400);
    expect(error.message).to.equal("Test error message");
    expect(error.statusCode).to.equal(400);
    expect(error.status).to.equal("fail");
  });

  it("should set status to 'error' for non operation errors", () => {
    const error = new AppError("Test error message", 500);
    expect(error.status).to.equal("error");
  });
});
