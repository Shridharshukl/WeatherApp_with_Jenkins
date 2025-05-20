const http = require("http");
const fs = require("fs");
var requests = require("requests");
const url = require("url");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (temval, orgval) => {
  let temperature = temval.replace('{%tempval%}', orgval.main.temp);
  temperature = temperature.replace('{%tempmin%}', orgval.main.temp_min);
  temperature = temperature.replace('{%tempmax%}', orgval.main.temp_max);
  temperature = temperature.replace('{%city%}', orgval.name);
  temperature = temperature.replace('{%country%}', orgval.sys.country);
  temperature = temperature.replace('{%tempstatus%}', orgval.weather[0].main);
  return temperature;
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Handle static CSS files
  if (req.url.endsWith('.css')) {
    const cssPath = req.url.substring(1);
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('CSS file not found');
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });
    return;
  }
  
  // Handle root path or specific city request
  if (parsedUrl.pathname === "/") {
    const cityName = parsedUrl.query.city || "kanpur"; // Default to Kanpur if no city provided
    //add Your api token in place of <api-token>
    requests(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=<api-token>`
    )
      .on("data", (chunk) => {
        try {
          const objdata = JSON.parse(chunk);
          const arrData = [objdata];
          const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join(" ");
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(realTimeData);
        } catch (error) {
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.write("<h1>Error: City not found or API error</h1><a href='/'>Go back</a>");
          res.end();
        }
      })
      .on("end", (err) => {
        if (err) {
          console.log("connection closed due to errors", err);
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.write("<h1>Error: Connection error</h1><a href='/'>Go back</a>");
        }
        res.end();
      });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
