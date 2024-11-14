import * as supertest from "supertest";
import { getUser1, user } from "../../data/user";
import { signUp, logIn, signUp2, deleteFunction } from "../../data/helpers";
const request = supertest("localhost:8001/api/v1");

describe("LOGIN", () => {
  describe("POSITIVE TEST", () => {
    let userImport = getUser1();
    let cookie: string
    beforeEach(async ()=>{
        await signUp(userImport)
    })
    it.skip("login user", async () => {
      await logIn({
        email: userImport.email,
        password: userImport.password,
      }).then((response) => {
        console.log(response.body);
        expect(response.body.status).toBe("success");
        expect(response.body.data.user.role).toBe("user");
      });
    })
    it.only("login user2", async () => {
      let resLogin = await logIn({
        email: userImport.email,
        password: userImport.password,
      })
        console.log(resLogin);
        expect(resLogin.body.status).toBe("success");
        expect(resLogin.body.data.user.role).toBe("user");
        cookie = resLogin.headers['set-cookie']
        const deleteData = await deleteFunction(cookie[0])
        console.log(deleteData)
        expect(deleteData.body.status).toBe("success")
        expect(deleteData.body.message).toBe("User deleted successfully")
      });
    })
})
