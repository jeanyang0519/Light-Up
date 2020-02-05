const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.first_name = validText(data.first_name) ? data.first_name : "";
    data.last_name = validText(data.last_name) ? data.last_name : "";
    data.userType = validText(data.userType) ? data.userType : ""

    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name field is required";
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name field is required";
    }

    if (Validator.isEmpty(data.userType)) {
        errors.userType = "Select Mentor or Mentee"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};