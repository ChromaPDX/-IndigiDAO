import Web3 from 'web3';
import Web3Modal from 'web3modal';
import ReactDom from "react-dom";
import React, { useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";


const ContractAbi = require("./artifacts/contracts/ERC721RedeemableSignatureMint.sol/ERC721RedeemableSignatureMint.json");

declare var ADDRESS: string;

const App = async () => {

  console.log("hello redeem.ts", ADDRESS, ContractAbi);
  const web3Modal = new Web3Modal();
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  const accounts = await web3.eth.getAccounts();
  const myWalletAddress = accounts[0]

  const { contract } = useContract("0x35EACB3e82Acbd0ea85467e40C7B1E76a913673b");
  const { data, isLoading } = useContractRead(contract, "balanceOf", myWalletAddress)

  return (<div>
    Hello React
    <pre><code>{JSON.stringify(contract, null, 2)}</code></pre>
    <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
    <pre><code>{JSON.stringify(isLoading, null, 2)}</code></pre>
  </div>)
};

ReactDom.render(
  App(),
  document.getElementsByTagName('body')[0]
);



// // const web3 = new Web3(window.web3.currentProvider);

// // console.log("your account", web3.eth.accounts);

// var contract = new web3.eth.Contract(ContractAbi.abi, ADDRESS);
// contract.methods.walletHoldsToken(myWalletAddress).send({ from: myWalletAddress })
//   .on('receipt', function (r) {
//     console.log("receipt", r)
//   });

// console.log("goodbye redeem.ts", myWalletAddress);

// // const walletHasTokenOfCollection = (collectionId: String): Promise<'NoWallet' | 'NoToken' | 'Yes'> => {
// //   return new Promise((res, rej) => {
// //     res('NoWallet');
// //   })
// // }

// // const redeem = (collectionId: String): any => {
// //   walletHasTokenOfCollection(collectionId).then((usecase) => {
// //     switch (usecase) {
// //       case 'NoWallet':
// //         alert('go install metamask');
// //       case 'NoToken':
// //         alert("you dont have the right token");
// //       case 'Yes':
// //         alert("AOK");
// //     }

// //   })
// // }

// // module.exports = {
// //   walletHasTokenOfCollection,
// //   redeem
// // }