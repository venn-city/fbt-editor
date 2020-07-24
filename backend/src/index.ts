import app from "@server";
import logger from "@shared/Logger";
import "./LoadEnv"; // Must be the first import

const defaultPort: number = 3000;
// Start the server
const port = Number(process.env.PORT || defaultPort);
app.listen(port, () => {
  logger.info("Express server started on port: " + port);
});
