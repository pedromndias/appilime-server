const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Import and use our auth routes:
router.use("/auth", require("./auth.routes"));
// Import and use our lists routes:
router.use("/lists", require("./lists.routes"));
// Import and use our todo routes:
router.use("/todo", require("./todo.routes"));
// Import and use our expenses routes:
router.use("/expenses", require("./expenses.routes"));
// Import and use our profile routes:
router.use("/profile", require("./profile.routes"));
// Import and use our profile routes:
router.use("/main", require("./main.routes"));
// Import and use our profile routes:
router.use("/upload", require("./upload.routes"));

module.exports = router;
