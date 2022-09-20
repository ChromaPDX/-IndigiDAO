// import Head from "next/head";
import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import Web3Modal from 'web3modal';
// import axios from 'axios';
import ReactDom from "react-dom";

// import Marketplace from '../build/contracts/Marketplace.json';
const ContractAbi = require("./artifacts/contracts/ERC721RedeemableEnumerableMint.sol/ERC721RedeemableEnumerableMint.json");
// import BoredPetsNFT from '../ERC721RedeemableMint.json';

declare var ADDRESS: string;

const Index = (props: any) => {

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  useEffect(() => { loadNFTs() }, [])

  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();

    // console.log(Marketplace.networks, networkId);

    // Get all listed NFTs
    // const marketPlaceContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address)
    // const listings = await marketPlaceContract.methods.getListedNfts().call() || [];

    // Iterate over the listed NFTs and retrieve their metadata
    // const nfts = await Promise.all(listings.map(async (i) => {
    //   try {
    //     const boredPetsContract = new web3.eth.Contract(BoredPetsNFT.abi, BoredPetsNFT.networks[networkId].address)
    //     const tokenURI = await boredPetsContract.methods.tokenURI(i.tokenId).call()
    //     // const meta = await axios.get(tokenURI)
    //     const nft = {
    //       price: i.price,
    //       tokenId: i.tokenId,
    //       seller: i.seller,
    //       owner: i.buyer,
    //       // tokenURI
    //       // image: meta.data.image,
    //       // name: meta.data.name,
    //       // description: meta.data.description,
    //     }
    //     return nft
    //   } catch(err) {
    //     console.log(err)
    //     return null
    //   }
    // }))
    /* @ts-ignore:next-line */
    const contract = new web3.eth.Contract(ContractAbi.abi, ADDRESS);

    // const balance = await contract.methods.balanceOf(accounts[0]).call();
    
    // const getOwned = await contract.methods.getAll(accounts[0]).call();
    console.log(contract.methods)

    // const supply = await contract.methods.totalSupply().call();
    // console.log(supply);
    // const supply = await contract.methods.tokenURI(0).call();
    // console.log(supply);

    // contract.methods.balanceOf(accounts[0]).send({ from: accounts[0] })
    //   .on('receipt', function (x, y, z) {
    //     debugger
    //     console.log('receipt', x)
    //   });

    // setNfts(nfts.filter(nft => nft !== null))

    // console.log(nfts);

    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId();
    // const marketPlaceContract = new web3.eth.Contract(Marketplace.abi, Marketplace.networks[networkId].address);
    const accounts = await web3.eth.getAccounts();
    // await marketPlaceContract.methods.buyNft(BoredPetsNFT.networks[networkId].address, nft.tokenId).send({ from: accounts[0], value: nft.price });
    loadNFTs()
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return (<h1 className="px-20 py-10 text-3xl">No pets available!</h1>)
  } else {
    return (
      <div >
        <div >
          <div >
            {
              nfts.map((nft, i) => (
                <div key={i} >
                  <div >
                    <pre>{nft.tokenURI}</pre>
                    <button className="mt-4 w-full bg-teal-400 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>
                      Buy for {Web3.utils.fromWei(nft.price, "ether")} ETH
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

};

ReactDom.render(
  <Index />,
  document.getElementsByTagName('body')[0]
);
export default Index;