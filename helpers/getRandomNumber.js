const getRandomNumber = (min, max) => Math.floor(
  Math.random() * (Math.floor(max) - Math.ceil(min) + 1),
) + Math.ceil(min);

module.exports = getRandomNumber;
