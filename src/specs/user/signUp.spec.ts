import * as supertest from "supertest";
import { user } from "../../data/user";
const request = supertest("localhost:8001/api/v1");

describe("USER SIGNUP", () => {
  it.skip("Create a new user", async () => {
    const res = await request
      .post("/users/signup")
      .send({
        name: "Sana",
        email: "d7212@gmail.com",
        password: "paasw0123",
        passwordConfirm: "paasw0123",
      })
      .expect(201);
    expect(res.body.data.user.name).toBe("Sana");
    expect(res.body.data.user.email).toBe("d7212@gmail.com");
    expect(res.body.status).toBe("success");
    console.log(res.body, "res");
  });
  it("Create a new user", async () => {
    const res = await request.post("/users/signup")
    .send(user).expect(201);
    expect(res.body.data.user.name).toBe("Sana");
    expect(res.body.data.user.email).toBe("d7212@gmail.com");
    expect(res.body.status).toBe("success");
    console.log(res.body, "res");
  });
});
