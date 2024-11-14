import { signUp, tourFunction } from "../../data/helpers";
import { tour } from "../../data/tour";
import { getUser } from "../../data/user";
import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");

describe("REVIEW", () => {
  it("Create review", async () => {
    let cookie;
    const userImport = getUser("admin");
    const tourImport = tour();
    let userId;
    let tourId;
    await signUp(userImport).then((el) => {
      expect(el.body.status).toBe("success");
      console.log(el.body, "res");
      cookie = el.headers["set-cookie"];
      userId = el.body.data.user._id;
    });
    await tourFunction(cookie, tourImport)
      .then((el) => {
        console.log(el.body, "res");
        expect(el.body.status).toBe("success");
        tourId = el.body.data.data._id;
      });
    await request
    .post("reviews")
    .set("Cookie", cookie)
    .send({
      review: "This is a test review",
      rating: 3,
      tour: tourId,
      user: userId,
    });
  });
});
