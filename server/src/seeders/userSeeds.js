const User = require("../../models/User");

const seedData = require("./userSeeds.json");

User.deleteMany({})
  .then(() => {
    return User.insertMany(seedData);
  })
  .then(console.log(seedData))
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
