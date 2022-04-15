const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

//If there is time to hash passwords later....

// companySchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });

const company = mongoose.model("Company", companySchema);
module.exports = company;
