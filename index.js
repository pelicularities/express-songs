const app = require("./app");
require("./utils/db");
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Express app started on localhost:${PORT}`);
});
