// import * as supertest from "supertest";
// import { signUp } from "./src/data/helpers";
// import { getUser } from "./src/data/user";
// const request = supertest("localhost:8001/api/v1");
// const { MongoClient, ObjectId } = require("mongodb");

// const DATABASE_URL =
//   "mongodb+srv://userdbS:paasw0123@cluster0.qec60wb.mongodb.net/";

// describe("MONGO_DB", () => {
//   let connection:any
//   let db:any

//   beforeAll(async () => {
//     try {
//       connection = await MongoClient.connect(DATABASE_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       db = await connection.db();
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//     }
//   });
//   afterAll(async () => {
//     await connection.close();
//   });
//   it.only("Should find the document", async () => {
//     const users = db.collection("users");
//     console.log(users, "+++++======users");
//     const user = await users.findOne({ name: "MichaelS" });
//     console.log(user, "==========user");
//     expect(user.name).toBe("MichaelS");
//   });
//   it("Verify that user was delete in MongoDB", async () => {
//     const userImport = getUser();
//     try{
//     const res = await signUp(userImport);
//     //console.log(res.body, "======res=====");
//     expect(res.statusCode).toBe(201);
//     const users = await db.collection("users");
//     const userData = await users.findOne({ name: userImport.name });
//     console.log(userData, "======userData====");
//     if (!userData) {
//       throw new Error("User not found in MongoDB");
//     }
//     expect(userData.name).toBe(userImport.name);
//     expect(userData.email).toBe(userImport.email.toLowerCase());
//     expect(userData.role).toBe('user');
//     expect(userData._id.toString()).toEqual(res.body.data.user._id);
//     let deleteData = await users.deleteOne({
//         _id: new ObjectId(userData._id)
//     }) 
//     console.log(deleteData, "=====deleteData====");
//     expect(deleteData.deletedCount).toBe(1);
//     let findUser = await users.findOne({_id:userData._id})
//     // if(findUser === null){
//     //     throw new Error("User not deleted from MongoDB")
//     // }
// }catch(error){
//     console.error("Error in user creation", error);
// }
//   });
// });

const supertest = require("supertest");
const request = supertest("localhost:8001/api/v1");
const { MongoClient, ObjectId } = require("mongodb");
import { signUp } from "./src/data/helpers";
import { getUser } from "./src/data/user"
// MongoDB connection URL
const DATABASE_URL =
  "mongodb+srv://michael:pass1234@cluster0.8zhnmva.mongodb.net/";

describe("MongoDB Connection and Operations", () => {
  let connection;
  let db;

  beforeAll(async () => {
    // Connect to the database before running any tests
    try {
      // Connect to the database before running any tests
      connection = await MongoClient.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = await connection.db(); // Optionally specify database name
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  });

  afterAll(async () => {
    // Close the connection after all tests have run
    await connection.close();
  });

  it('should insert a document into the "test" collection', async () => {
    const users = db.collection("users");
    console.log(users, "users");
    // Retrieve the document
    const user = await users.findOne({ name: "MichaelS" });
    console.log(user, "user");

    // // // Assert that the retrieved document is the same
    expect(user.name).toEqual("MichaelS");
  });

  it.only("create new user with imported data", async () => {
    const userImport = getUser();
    console.log(userImport, "getUser");

    try {
      const res = await signUp(userImport);
      expect(res.statusCode).toBe(201);
      console.log(res.body); // Adjust to log only the response body for readability
      const users = db.collection("users");
      const userData = await users.findOne({ name: userImport.name });
      console.log(userData, "===========userData=======");
      if (!userData) {
        throw new Error("User not found");
      }
      expect(userData.name).toBe(userImport.name);
      expect(userData.email).toBe(userImport.email);
      expect(userData.role).toBe("user");
      expect(userData._id.toString()).toEqual(res.body.data.user._id);
      let deleteData = await users.deleteOne({
        _id: new ObjectId(userData._id),
      });
      console.log(deleteData, "===========deleteData=======");
      let findUser = await users.findOne({ _id: userData._id });
      console.log(findUser, "===========findUser=======");
      if (findUser === null) {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error in user creation:", error);
    }
  });
});