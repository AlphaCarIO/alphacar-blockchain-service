import getWeb3 from '../libs/getWeb3'
var contract = require("truffle-contract")

import * as config from "../config/config"

export async function balanceOf(address) {
  //0xdA83aeE0F49802a331d455f503341A5FDCbDE923
  getWeb3.then(result => {
      let instance = result.acar_instance
        return instance.balanceOf.call(address);
    }).then(function(balance){
        return balance.toNumber()
    }).catch(function(err){
        console.log(err);
    });
  }
