import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import ReactDom from "react-dom";


const ContractAbi = require("./artifacts/contracts/ERC721DropRedeemableEnumerableGettableMint.sol/ERC721DropRedeemableEnumerableGettableMint.json");

const configs = require("./config");

const Index = (props: any) => {

  // const [nfts, setNfts] = useState([])
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
    const contract = new web3.eth.Contract(ContractAbi.abi, configs.contractAddress);

    const owner = await contract.methods.owner().call();
    const mine = await Promise.all((await contract.methods.getTokenIds(configs.contractAddress).call())
      .map(async (nft) => {
        const u = nft[1].replace("ipfs://", "https://ipfs.io/ipfs/");

        const ipfsBlob = await fetch(u)
          .then(res => {
            // console.error("mark1", res)
            try {
              return res.json()
            } catch (e) {
              return {};
            }

          })
          .then(
            (result) => {
              return result
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.error(error)
            }
          )

        const d = {
          ...ipfsBlob,
          /* @ts-ignore:next-line */
          httpImage: ipfsBlob.image.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/"),
          id: nft[0],
          tokenURI: nft[1],
          redeemed: nft[2],
        }

        console.log("mark3", d);

        return d;
      }));

    console.log("mine", mine)

    setLoadingState({ mine, owner, account, mintTextInput: 'your text here' });


  }

  async function redeem(nftId) {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(ContractAbi.abi, configs.contractAddress);
    const accounts = await web3.eth.getAccounts();
    const redeemed = await contract.methods.redeem(nftId).send({ from: accounts[0] });
  }

  async function mint(text: string) {
    const web3Modal = new Web3Modal()
    const provider = await web3Modal.connect()
    const web3 = new Web3(provider)
    const contract = new web3.eth.Contract(ContractAbi.abi, configs.contractAddress);
    const accounts = await web3.eth.getAccounts();
    const mint = await contract.methods.mintTo(accounts[0], text).send({ from: accounts[0] });
    console.log(mint)
  }

  return (<>
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-5">
        <image width="100% " src="images/indigiexchange_front_pottery_1635438176.webp" />
      </div>
    </header>


    {
      loadingState.account != undefined && loadingState.owner != undefined && loadingState.mine != undefined ? <div >


        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">


            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              <div className="col mb-5">

                {
                  loadingState.mine.map((nft, i) => (
                    <div key={i} >
                      <div >
                        <div className="card h-100">
                          <img class="card-img-top" src={nft.httpImage} alt="..." />

                          <div className="card-body p-4">
                            <div className="text-center">

                              <h4 className="fw-bolder">{nft.name}</h4>
                              <h5 className="fw-bolder">{nft.description || "- no description -"}</h5>
                              <h6 >redeemed: {nft.redeemed.toString()}</h6>

                              $40.00 - $80.00
                              {/* <pre>{JSON.stringify(nft, null, 2)}</pre> */}

                            </div>
                            <button onClick={() => redeem(nft.id)}>
                              redeem
                            </button>
                          </div>
                        </div>



                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>

        </section>


        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6">
                <img className="card-img-top mb-5 mb-md-0" src="images/s556013787681641268_p538_i1_w1920.webp" alt="..." />
                <img width="200px" className="mb-5 mb-md-0" src="images/exampleSignet.jpg" alt="..." />
              </div>
              <div className="col-md-6">

                <h1 className="display-5 fw-bolder">Turquoise Bead Earrings</h1>
                <div className="fs-5 mb-5">
                  <span>.7 ETH</span>
                </div>
                <p className="lead">Turquoise Beaded Earrings 2 inches from the base of the hook in length from Native Arts of the Rio Grande, owned by Patricia Maestas in Ohkay Owingeh, NM.</p>
                <div className="d-flex">

                  <input type="text"
                    onChange={(e) => setLoadingState({ ...loadingState, mintTextInput: e.target.value })}
                    value={loadingState.mintTextInput}></input>

                  <button onClick={() => mint(loadingState.mintTextInput)} className="btn btn-outline-dark flex-shrink-0" type="button">
                    <i className="bi-cart-fill me-1"></i>
                    Mint
                  </button>
                </div>
                <img className="mb-5 mb-md-0" src="images/patricia-50.png" alt="..." />
              </div>
            </div>
          </div>
        </section>

      </div> : <pre>{JSON.stringify(loadingState, null, 2)}</pre>
    }

    <footer className="py-5 bg-dark">
      <div className="container"><p className="m-0 text-center text-white">Made with ❤️ for Web3athon 2022</p></div>
    </footer>

  </>);

};

document.addEventListener("DOMContentLoaded", function (event) {
  const body = document.getElementsByTagName('body')
  ReactDom.render(<Index />, body[0]);
});