import * as supertest from "supertest";
import { getUser, user } from "../../data/user";
import { signUp, logIn } from "../../data/helpers";
const request = supertest("localhost:8001/api/v1");

describe("LOGIN", () => {
  describe("POSITIVE TEST", () => {
    let userImport = getUser();

    it("login user", async () => {
        // const res = await request.post("/users/signup").send(userImport).expect(201);
        const res = await signUp(userImport)
        console.log(res.body, 'res')
        // const loginRes = await request
        // .post("/user/login")
        // .send({
        //     email: userImport.email,
        //     password: userImport.password,
        // }).expect(200)
        const loginRes = await logIn({
            email: userImport.email,
            password: userImport.password,
        })
    });
  });
});
