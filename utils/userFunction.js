import dummyUsers from "../data/users.js";

export const findOne = (email) => {
  return dummyUsers.find((user) => user.email === email);
};

export const findById = (id) => {
  return dummyUsers.find((user) => user.id === id);
};
