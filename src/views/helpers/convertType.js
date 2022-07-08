var convertType = function (scope) {
  if (!scope || scope == "") {
    return "";
  }
  if (scope == "client") {
    return "student";
  }
  return "staff";
};

module.exports = convertType;
