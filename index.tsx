import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import ReactDom from "react-dom";
import Iframe from 'react-iframe'

const ContractAbi = require("./artifacts/contracts/indigidaoDropERC721.sol/indigidaoDropERC721.json");

const configs = require("./config");

const products = [
  { key: 1, name: 'ear rings', description: 'jade earrings', image: 'earrings.png', iframeUrl: 'https://gateway.ipfscdn.io/ipfs/Qmd58GBFkctycME4B1s3BRzG4VQJQMCEc4QX9g13VioFYb/nft-drop.html?contract=0x3Ff89576c444E8Ae3357defc4bE987777899e260&chainId=137&primaryColor=purple' },
  { key: 2, name: 'ear rings', description: 'jade earrings', image: 'earrings.png', iframeUrl: 'https://gateway.ipfscdn.io/ipfs/Qmd58GBFkctycME4B1s3BRzG4VQJQMCEc4QX9g13VioFYb/nft-drop.html?contract=0x826509a2c0d4EC0d3B273Aa82f7e7B2e46AE09ef&chainId=137&primaryColor=purple' },
  // { key: 3, name: 'ear rings', description: 'jade earrings', image: 'earrings.png', iframeUrl: 'https://gateway.ipfscdn.io/ipfs/Qmd58GBFkctycME4B1s3BRzG4VQJQMCEc4QX9g13VioFYb/nft-drop.html?contract=0x3Ff89576c444E8Ae3357defc4bE987777899e260&chainId=137&primaryColor=purple' },
  // { key: 4, name: 'ear rings', description: 'jade earrings', image: 'earrings.png', iframeUrl: 'https://gateway.ipfscdn.io/ipfs/Qmd58GBFkctycME4B1s3BRzG4VQJQMCEc4QX9g13VioFYb/nft-drop.html?contract=0x3Ff89576c444E8Ae3357defc4bE987777899e260&chainId=137&primaryColor=purple' },
];

const Index = (props: any) => {
  // const [loadingState, setLoadingState] = useState('not-loaded')

  // useEffect(() => { loadNFTs() }, [])

  // async function loadNFTs() {
  //   const web3Modal = new Web3Modal()
  //   const provider = await web3Modal.connect()
  //   const web3 = new Web3(provider)
  //   // const networkId = await web3.eth.net.getId();
  //   const accounts = await web3.eth.getAccounts();
  //   const account = accounts[0];
  //   /* @ts-ignore:next-line */
  //   const contract = new web3.eth.Contract(ContractAbi.abi, configs.contractAddress);

  //   const owner = await contract.methods.owner().call();
  //   const mine = await Promise.all((await contract.methods.getTokenIds(configs.contractAddress).call())
  //     .map(async (nft) => {
  //       const u = nft[1].replace("ipfs://", "https://ipfs.io/ipfs/");

  //       const ipfsBlob = await fetch(u)
  //         .then(res => {
  //           // console.error("mark1", res)
  //           try {
  //             return res.json()
  //           } catch (e) {
  //             return {};
  //           }

  //         })
  //         .then(
  //           (result) => {
  //             return result
  //           },
  //           // Note: it's important to handle errors here
  //           // instead of a catch() block so that we don't swallow
  //           // exceptions from actual bugs in components.
  //           (error) => {
  //             console.error(error)
  //           }
  //         )

  //       const d = {
  //         ...ipfsBlob,
  //         /* @ts-ignore:next-line */
  //         httpImage: ipfsBlob.image.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"),
  //         id: nft[0],
  //         tokenURI: nft[1],
  //         redeemed: nft[2],
  //       }

  //       console.log("mark3", d);

  //       return d;
  //     }));

  //   console.log("mine", mine)

  //   setLoadingState({ mine, owner, account, mintTextInput: 'your text here' });


  // }

  // async function redeem(nftId) {
  //   const web3Modal = new Web3Modal()
  //   const provider = await web3Modal.connect()
  //   const web3 = new Web3(provider)
  //   const contract = new web3.eth.Contract(ContractAbi.abi, configs.contractAddress);
  //   const accounts = await web3.eth.getAccounts();
  //   const redeemed = await contract.methods.redeem(nftId).send({ from: accounts[0] });
  // }

  // async function mint(text: string) {
  //   const web3Modal = new Web3Modal()
  //   const provider = await web3Modal.connect()
  //   const web3 = new Web3(provider)
  //   const contract = new web3.eth.Contract(ContractAbi.abi, configs.contractAddress);
  //   const accounts = await web3.eth.getAccounts();
  //   const mint = await contract.methods.mintTo(accounts[0], text).send({ from: accounts[0] });
  //   console.log(mint)
  // }


  return (<>
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-5">
        <img width="100% " src="images/indigiexchange_front_pottery_1635438176.webp" />
      </div>
    </header>


    <div className="container">
      {
        products.map((product, ndx) => <div className="row">
          <div className="col-sm">
            <Iframe
              src={product.iframeUrl}
              width="600px"
              height="600px"
              style="max-width:100%;"
              frameborder="0"
            />
          </div>
          <div className="col-sm">
            <img className="mb-5 mb-md-0" src={`images/${product.key}-artist.png`} alt="..." />
          </div>

        </div>)
      }
    </div>

    <footer className="py-5 bg-dark">
      <div className="container"><p className="m-0 text-center text-white">Made with ❤️ for Web3athon 2022</p></div>
    </footer>

  </>);

};

document.addEventListener("DOMContentLoaded", function (event) {
  const body = document.getElementsByTagName('body')
  ReactDom.render(<Index />, body[0]);
});