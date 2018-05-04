const Web3 = require('web3');

const url = process.env.PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(url));

const privatekey = process.env.PK; // '0x...'

const contract_abi = require('./contract/Chargingbox.json').abi;
const contract_addr = process.env.ADDRESS;
const chargingBox = new web3.eth.Contract(contract_abi, contract_addr);

const gas = 400000;

const rent = async () => {
  const data = chargingBox.methods.rent().encodeABI();

  const tx = {
    to: contract_addr,
    data: data,
    gas: gas,
    value: web3.utils.toWei('0.002', 'ether')
  };
  const result = await web3.eth.accounts.signTransaction(tx, privatekey);

  console.log(result);

  const receipt = await web3.eth.sendSignedTransaction(result.rawTransaction);
  console.log(`receipt: ${JSON.stringify(receipt)}`);
}

rent().then(() => {

});