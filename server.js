const config = require("./config/config");
const app = require("./app");

/**
 * Starting point of the application
 * configuration file is initialized
 * and server is started.
 */
app.listen(config.port, () => {
  console.log("Server running on", config.port);
});

module.exports = app; // for testing
