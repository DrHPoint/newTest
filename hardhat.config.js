require("@nomiclabs/hardhat-waffle");

//import { PRIVATE_KEY } from "./secret.js";
const { PRIVATE_KEY } = require('./secret.js')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const INFURA_URL = 'https://rinkeby.infura.io/v3/74d580525304416e97067901e203d57f';

module.exports = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};