import Web3 from 'web3'
import * as config from "../config/config"
import * as cc from "../config/constants"
var contract = require("truffle-contract")

console.log('config.WEB3_URL=', config.web3_url)

let getWeb3 = new Promise(function (resolve, reject) {
  var web3 = new Web3();
  var provider = new Web3.providers.HttpProvider(config.web3_url);
  web3.setProvider(provider);
  
  var acar = contract({
    abi: config.acar_abi_def
  });
  acar.setProvider(provider);

  if (web3.isConnected()) {
    resolve({
      injectedWeb3: true,
      acar() {
        return acar
      },
      web3 () {
        return web3
      }
    })

  } else {
    console.log('web3.isConnected():', web3.isConnected())
    reject(new Error(cc.MESSAGE_NOT_CONNECTED))
  }
})
  .then(result => {
    
    result.acar().at(config.acar_contract_addr).then(function(acar_instance) {

      result = Object.assign({}, result, { acar_instance })

      console.log('result:', result);

      return new Promise(function (resolve, reject) {
        // Retrieve network ID
        result.web3().version.getNetwork((err, networkId) => {
          if (err) {
            console.log(err)
            reject(new Error(cc.MESSAGE_NOT_CONNECTED))
          } else {
            result = Object.assign({}, result, { networkId })
            resolve(result)
          }
        })
      })

    })
  })
  /*
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error(cc.MESSAGE_NO_COINBASE))
        } else {
          result = Object.assign({}, result, { coinbase })
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error(cc.MESSAGE_NO_BALANCE))
        } else {
          result = Object.assign({}, result, { balance })
          resolve(result)
        }
      })
    })
  })
  */

export default getWeb3
