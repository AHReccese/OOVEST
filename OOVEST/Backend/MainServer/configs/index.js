if (process.env.NODE_ENV === "production") {
    module.exports = require("../configs/prod");
} else {
    module.exports = require("../configs/dev");
}