var countBook;

countBook = function (v1, options) {
  if (String(v1) > 0) {
    return options.fn(this);
  }
  return options.inverse(this);
};

module.exports = countBook;
