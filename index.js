const logColor = require("./log-color");
const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  const url = req.url;

  switch (url) {
    case "/red":
      logColor.red("red string");
      res.end("red string sent to console");
      break;

    case "/blue":
      logColor.blue("blue string");
      res.end("blue string sent to console");
      break;

    case "/green":
      logColor.green("green string");
      res.end("green string sent to console");
      break;

    default:
      res.statusCode = 404;
      res.end("page not found");
  }
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
