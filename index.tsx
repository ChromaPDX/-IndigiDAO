import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import ReactDom from "react-dom";

const ContractAbi = require("./artifacts/contracts/ERC721RedeemableEnumerableGettableMint.sol/ERC721RedeemableEnumerableGettableMint.json");

declare var ADDRESS: string;

const Mint = () => {
  return (<section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img class="card-img-top mb-5 mb-md-0" src="/images/s556013787681641268_p538_i1_w1920.webp" alt="..." />
          <img width="200px" class="mb-5 mb-md-0" src="/images/exampleSignet.jpg" alt="..." />
        </div>
        <div class="col-md-6">

          <h1 class="display-5 fw-bolder">Turquoise Bead Earrings</h1>
          <div class="fs-5 mb-5">
            <span>.7 ETH</span>
          </div>
          <p class="lead">Turquoise Beaded Earrings 2 inches from the base of the hook in length from Native Arts of the Rio Grande, owned by Patricia Maestas in Ohkay Owingeh, NM.</p>
          <div class="d-flex">
            <button class="btn btn-outline-dark flex-shrink-0" type="button">
              <i class="bi-cart-fill me-1"></i>
              Mint
            </button>
          </div>
          <img class="mb-5 mb-md-0" src="/images/patricia-50.png" alt="..." />
        </div>
      </div>
    </div>
  </section>)
}

const Index = (props: any) => {

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => { loadNFTs() }, [])

  async function loadNFTs() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    // const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    /* @ts-ignore:next-line */
    const contract = new web3.eth.Contract(ContractAbi.abi, ADDRESS);

    const owner = await contract.methods.owner().call();
    const mine = await contract.methods.getTokenIds(account).call();

    setLoadingState({ mine, owner, account });
  }

  async function redeem(nftId) {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(ContractAbi.abi, ADDRESS);
    const accounts = await web3.eth.getAccounts();
    const redeemed = await contract.methods.redeem(nftId).send({ from: accounts[0] });
  }

  async function mint() {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(ContractAbi.abi, ADDRESS);
    const accounts = await web3.eth.getAccounts();
    const mint = await contract.methods.mintTo(accounts[0], 'some value here').send({ from: accounts[0] });
    console.log(mint)
  }

  return (<>
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5 my-5">
        <image width="100% " src="/images/indigiexchange_front_pottery_1635438176.webp" />
      </div>
    </header>


    {
      loadingState.account != undefined && loadingState.owner != undefined && loadingState.mine != undefined ? <div >


        <section class="py-5">
          <div class="container px-4 px-lg-5 mt-5">


            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <div class="col mb-5">

                {
                  loadingState.mine.map((nft, i) => (
                    <div key={i} >
                      <div >
                        <div class="card h-100">
                          <img class="card-img-top" src="/images/earrings.png" alt="..." />
                          <div class="card-body p-4">
                            <div class="text-center">
                              <h5 class="fw-bolder">{ nft[1]}</h5>
                              $40.00 - $80.00
                            </div>
                          </div>
                        </div>
                        <button onClick={() => redeem(nft.id)}>
                          redeem
                        </button>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>

        </section>

        
        <section class="py-5">
          <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
              <div class="col-md-6">
                <img class="card-img-top mb-5 mb-md-0" src="/images/s556013787681641268_p538_i1_w1920.webp" alt="..." />
                <img width="200px" class="mb-5 mb-md-0" src="/images/exampleSignet.jpg" alt="..." />
              </div>
              <div class="col-md-6">

                <h1 class="display-5 fw-bolder">Turquoise Bead Earrings</h1>
                <div class="fs-5 mb-5">
                  <span>.7 ETH</span>
                </div>
                <p class="lead">Turquoise Beaded Earrings 2 inches from the base of the hook in length from Native Arts of the Rio Grande, owned by Patricia Maestas in Ohkay Owingeh, NM.</p>
                <div class="d-flex">
                  <button onClick={() => mint()} class="btn btn-outline-dark flex-shrink-0" type="button">
                    <i class="bi-cart-fill me-1"></i>
                    Mint
                  </button>
                </div>
                <img class="mb-5 mb-md-0" src="/images/patricia-50.png" alt="..." />
              </div>
            </div>
          </div>
        </section>

      </div> : <pre>{JSON.stringify(loadingState, null, 2)}</pre>
    }

    <footer class="py-5 bg-dark">
      <div class="container"><p class="m-0 text-center text-white">Made with ❤️ for Web3athon 2022</p></div>
    </footer>

  </>);

};

document.addEventListener("DOMContentLoaded", function (event) {
  const body = document.getElementsByTagName('body')
  console.log("hello world", body);
  ReactDom.render(<Index />, body[0]);
});