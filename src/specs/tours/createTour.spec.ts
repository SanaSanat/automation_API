import * as supertest from "supertest";
import { getUser } from "../../data/user";
import { signUp } from "../../data/helpers";
import { tour } from "../../data/tour";
const request = supertest("localhost:8001/api/v1");

describe("TOURS", () => {
  it.skip("Create tour1", async () => {
    let userImport = getUser("admin");
    const res = await signUp(userImport);
    console.log(res.body, "res");
    expect(res.body.status).toBe("success");
    const cookie = res.headers["set-cookie"];
    await request
      .post("/tours")
      .set("Cookie", cookie)
      .send({
        name: "TourForn611",
        duration: 10,
        description: "Could be",
        maxGroupSize: 10,
        summary: "Test tour",
        difficulty: "easy",
        price: 100,
        rating: 4.8,
        imageCover: "tour-3-cover.jpg",
        ratingsAverage: 4.9,
        guides: [],
        startDates: ["2024-04-04"],
        startLocation: {
          type: "Point",
          coordinates: [-74.005974, 40.712776],
        },
      })
      .then((el) => {
        console.log(el.body, "res");
        expect(el.body.status).toBe("success");
      });
  });
  it("Create tour2", async () => {
    let userImport = getUser("admin");
    let tourImport = tour()
    const res = await signUp(userImport);
    console.log(res.body, "res");
    expect(res.body.status).toBe("success");
    const cookie = res.headers["set-cookie"];
    await request
      .post("/tours")
      .set("Cookie", cookie)
      .send(tourImport)
      .then((el) => {
        console.log(el.body, "res");
        expect(el.body.status).toBe("success");
      });
  });
  it("Create tour with role lead-guide", async () => {
    
  })
});
