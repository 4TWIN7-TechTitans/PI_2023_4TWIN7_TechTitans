const app = require("./app.js");
const http = require("http");

const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const swaggerDocument = require("./swagger.json");
const endpointsFiles = ["./routes/index.js", "./routes/userRoutes.js"];
const doc = {
  host: "127.0.0.1:5000",
};
swaggerAutogen(outputFile, endpointsFiles, doc);

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
