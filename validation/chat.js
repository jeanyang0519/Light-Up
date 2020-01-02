const Validator = require("validator");
const validText = require("./valid-text");
const validArray = require("./valid-array");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.message = validText(data.message) ? data.message : ""
  let participants = ""
  if (typeof data.participants === 'string') {
    participants = validText(data.participants) ? data.participants : "";
  } else {
    participants = validArray(data.participants) ? "valid" : ""
  }
  

  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  if (Validator.isEmpty(participants)) {
    errors.participants = "Must Select Recipients"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
