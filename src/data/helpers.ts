import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");

// export async function signUp(user:string | object | undefined){
//     await request.post("/users/signup").send(user)
// } //simple
export async function signUp(user: string | object | undefined):Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post("/users/signup")
      .send(user)
      .end((err, res) => {
        if (err) return reject(err);
        else resolve(res);
      });
  });
} //advance
export async function logIn(user: string | object | undefined) {
  return await request.post("/users/login").send(user);
}
