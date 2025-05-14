// const request = require("supertest");
// const mongoose = require("mongoose");
// const { MongoMemoryServer } = require("mongodb-memory-server");
// const app = require("../app"); // Your Express app

// let mongoServer;

// beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri);
// });

// afterAll(async () => {
//     await mongoose.disconnect();
//     await mongoServer.stop();
// });

// test("Should return all users", async () => {
//     const response = await request(app).get("/api/users");
//     expect(response.status).toBe(200);
// });
 const request=require('supertest');
 const app=require('./express')

 describe("API Testing",()=>{
    it("shuld return 200 for the home route",async()=>{
        const res=await request(app).get("/");
        expect(res.statusCode).toBe(200);
    })
    it("should store a user message",async()=>{
        const res=await request(app)
        .send({name:"",message:"")});
     expect(res.statusCode).toBe(201);
     expect(res.body.message).toBe("Message stored sucessfully");
    });
 });