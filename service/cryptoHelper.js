const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const cryptoRandomString = require('crypto-random-string');

export default class CryptoHelper {
  constructor() {
    this.generateCodeVerifier = this.generateCodeVerifier.bind(this);
    this.generateChallenge = this.generateChallenge.bind(this);
  }

  generateCodeVerifier = async () => {
    return cryptoRandomString({
      length: 100,
      type: 'alphanumeric',
    });
  };

  generateChallenge = async (value) => {
    const digest = sha256(value);
    return Base64.stringify(digest);
  };
}
