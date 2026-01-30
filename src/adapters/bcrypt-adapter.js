const bcrypt = require("bcrypt");

class BcryptAdapter {
  constructor(saltRounds) {
    this.saltRounds = saltRounds;
  }

  async hash(value) {
    return bcrypt.hash(value, this.saltRounds);
  }

  async compare(value, hash) {
    return bcrypt.compare(value, hash);
  }
}

module.exports = {
  BcryptAdapter,
};
