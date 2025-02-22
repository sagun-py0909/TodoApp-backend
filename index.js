const express = require("express");
const app = express();
const port = 3000;

const fucn = ()=>{
  console.log("Hello World")
}

app.get("/home" , fucn)

app.get("/hello" , (request , response)=>{
  response.send({"message":
    "Hello World"})
  console.log("Hello World")
})

app.listen(port, () => {
  console.log("Server is running on port " + port);
});