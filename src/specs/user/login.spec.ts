import * as supertest from "supertest";
import { getUser, user } from "../../data/user";
import { signUp, logIn, signUp2 } from "../../data/helpers";
const request = supertest("localhost:8001/api/v1");

describe("LOGIN", () => {
  describe("POSITIVE TEST", () => {
    let userImport = getUser();

    it("login user", async () => {
      // const res = await request.post("/users/signup").send(userImport).expect(201);
      const res = await signUp(userImport);
      console.log(res.body, "res");
      // const loginRes = await request
      // .post("/user/login")
      // .send({
      //     email: userImport.email,
      //     password: userImport.password,
      // }).expect(200)
      const loginRes = await logIn({
        email: userImport.email,
        password: userImport.password,
      });
    });
    it("login user option 3 using try and catch", async () => {
      try {
        await signUp(userImport).then((el) => {
          expect(el.body.status).toBe("success");
          console.log(el.body, "res");
        });
        await logIn({
          email: userImport.email,
          password: userImport.password,
        }).then((el2) => {
          expect(el2.body.status).toBe("success");
        });
      } catch (error) {
        // false
        console.log("Error during login process", error);
      }
    });
    it("login user option 4 using then", () => {
      signUp(userImport).then((res) => {
        expect(res.body.status).toBe("success");
        return logIn({
          email: userImport.email,
          password: userImport.password,
        }).then((res2) => {
          expect(res2.statusCode).toBe(200);
        });
      });
      it("login user option 5 using .end without Promise", (done) =>{
        signUp2(userImport).end((err, res)=>{
          if(err) return done(err);
          expect(res.body.status).toBe("success");
          done()
        })
      })
      it.only("login user option 6 using .end without Promise", (done) =>{
                
      })
    });
  });
});
