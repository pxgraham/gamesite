// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

//   app.get("/tables", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/tables.html"));
//   });

//   app.get("/reserve", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/reserve.html"));
//   });

app.get("/privacy", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/privacy.html"));
});
app.get("/store", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/store.html"));
});

  // If no matching route is found default to home
  app.get("/games/element.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/element.html"));
  });
  app.get("/games/element2.html", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/element2.html"));
  });
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};