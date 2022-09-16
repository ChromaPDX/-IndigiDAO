import ReactDom from "react-dom";
import React from "react";
import usePromise from 'react-use-promise';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { useContract, useContractRead, useMetamask, useAddress } from "@thirdweb-dev/react";

const ContractAbi = require("./artifacts/contracts/ERC721RedeemableEnumerableSignatureMint.sol/ERC721RedeemableEnumerableSignatureMint.json");

declare var ADDRESS: string;

const IndigdaoApp = (props: { ownerAdress: string }) => {
  // const { contract } = useContract(ADDRESS);

  // const totalSupplyContractRead = useContractRead(contract, "totalSupply");
  // const balanceOfContractRead = useContractRead(contract, "balanceOf", props.ownerAdress);

  const sdk = new ThirdwebSDK("rinkeby");

  const [result, error, state] = usePromise(
    () => new Promise(resolve => {
      return sdk.getContract(ADDRESS).then((contract) => {
        resolve(contract.erc1155.getAll())
      })
    }),
    // () => {
    //   new Promise.resolve()sdk.getContract(ADDRESS)
    // },
    []
  );

  // const contract = await sdk.getContract("0x35EACB3e82Acbd0ea85467e40C7B1E76a913673b");
  console.log(result)


  return (<div>
    <h3>hello IndigdaoApp</h3>

    <pre>
      {JSON.stringify({ error, state }, null, 2)}
    </pre>

    {/* {
      state === "resolved" : 
    } */}
    {/* 
    {
      totalSupplyContractRead.isLoading ? <pre>loading total supply...</pre> : <pre>total supply: {totalSupplyContractRead.data._hex}</pre>
    }

    {
      balanceOfContractRead.isLoading ? <pre>loading balance of...</pre> : <pre>your NFTs from this collection: {balanceOfContractRead.data._hex}</pre>
    } */}

  </div >)
};

const Web3Dapp = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (<div>
    {address ? (
      <>
        <h2>Connected as {address}</h2>
        <IndigdaoApp ownerAdress={address} />
      </>
    ) : (
      <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
    )}
  </div>)
};

const ThirdWebApp = () =>
  <>
    <h1>IndigDAO</h1>
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Web3Dapp />
    </ThirdwebProvider>
  </>



ReactDom.render(
  ThirdWebApp(),
  document.getElementsByTagName('body')[0]
);
