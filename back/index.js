const app = require("./app.js")
const http = require("http");


//Swagger API
const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const endpointsFiles = ["./routes/index.js", "./routes/userRoutes.js"];
const doc = {
  host: "127.0.0.1:5000",
};
swaggerAutogen(outputFile, endpointsFiles, doc);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
