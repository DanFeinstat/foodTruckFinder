const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require(`dotenv`);
const app = express();
const routes = require(`./api/route`);
var server = require("http").Server(app);
var io = require("socket.io")(server);
const PORT = process.env.PORT || 3002;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    `Access-Control-Allow-Methods`,
    `GET, POST, OPTIONS, PUT, PATCH, DELETE`
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-type,application/json,x-access-token"
  );
  next();
});

dotenv.config({ path: `.env` });

app.set(process.env.SECRET, `nodeRestApi`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(path.join(__dirname, `client/build`)));
}
// app.get(`*`, (req, res) => {
//   res.sendFile(path.resolve(__dirname, `client`, `build`, `index.html`));
// });

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/foodTruckFinder`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

io.on(`connection`, function(socket) {
  console.log(`a new user is connected: ${socket.id}`);
  socket.on("truckStatusChange", () => {
    io.emit(`newTruckActivity`);
  });
});

app.use(routes);

server.listen(PORT, () => {
  console.log(`Listening on port: ` + PORT);
});
