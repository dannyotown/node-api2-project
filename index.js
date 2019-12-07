const express = require("express");
const postHub = require("./router/posts");
const server = express();

server.use(express.json());
// Bring all our subroutes into the main application
// (Remember, subroutes can have more children routers)
server.use("/api/posts", postHub);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
