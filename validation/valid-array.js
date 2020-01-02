const validArray = array => {
  return array instanceof Array && array.length > 0;
};

module.exports = validArray;
