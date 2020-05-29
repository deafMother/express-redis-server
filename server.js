const app = require("./app");
require("./utils/cache");

app.listen(8000, () => {
  console.log("running on 8000");
});
