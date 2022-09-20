declare var ADDRESS: string;

import useSWR from "swr";

import ReactDom from "react-dom";
import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Contract } from "@ethersproject/contracts";


const ContractAbi = require("./artifacts/contracts/ERC721RedeemableMint.sol/ERC721RedeemableMint.json");

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    // 1, // Mainet
    // 3, // Ropsten
    4, // Rinkeby
    // 5, // Goerli
    // 42, // Kovan
  ],
})

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const fetcher = (library: Web3Provider | undefined, abi: any) => (...args: any) => {
  if (!library) return

  const [arg1, arg2, ...params] = args
  const address = arg1
  const method = arg2
  const contract = new Contract(address, abi, library)
  return contract[method](...params)
}

const MyNfts = () => {
    const { account, library } = useWeb3React<Web3Provider>()
  // const { data: balance, mutate } = useSWR([ADDRESS, 'balanceOf', account], {
  //   fetcher: fetcher(library, ContractAbi),
  // })
  // const { data, mutate } = useSWR(['getBalance', account, 'latest']);
  const { data: balance, mutate } = useSWR([ADDRESS, 'balanceOf', account], {
    fetcher: fetcher(library, ContractAbi),
  })

  console.log(balance, mutate);


  return (
    <>
      <p>my nfts</p>
      <pre>{JSON.stringify(balance)}</pre>
      <pre>{JSON.stringify(mutate)}</pre>
    </>);
};

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>()

  const onClick = () => {
    activate(injectedConnector)
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>

          <MyNfts account={account} />
        </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  )
}

export const App = () => {
  return (
    /* @ts-ignore:next-line */
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
    </Web3ReactProvider>
  )
}



// import React from "react";
// import usePromise from 'react-use-promise';
// import { Json, ThirdwebSDK } from "@thirdweb-dev/sdk";
// import { ChainId,  ThirdwebSDKProvider, useProvider, useSDK, useSigner } from "@thirdweb-dev/react";
// import { useContract, useContractRead, useMetamask, useAddress } from "@thirdweb-dev/react";
// import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/contracts/smart-contract";
// import { ethers, Signer } from "ethers";
// import Web3 from 'web3';
// import Web3Modal from 'web3modal';
// import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";
// import { ConnectButton } from "@rainbow-me/rainbowkit";






// const IndigdaoApp = (props: { ownerAdress: string }) => {

//   const signer = useSigner();
//   const sdk = useSDK();
//   console.log(sdk)
//   return (<>hello world</>)
//   // const { contract } = useContract(ADDRESS);
//   // const { data, isLoading } = useContractRead(contract, "balanceOf", props.ownerAdress)
//   // if (data) { debugger }

//   // const sdk = new ThirdwebSDK("rinkeby");

//   // const [results, error, state] = usePromise<{ nfts: any, contract: SmartContract }>(
//   //   () => new Promise(resolve => {
//   //     return (sdk.getContract(ADDRESS)
//   //       .then(async (contract) => {
//   //         return {
//   //           contract,
//   //           nftMetadatas: await contract.erc721.getOwned(props.ownerAdress)
//   //         };
//   //       }).then(async ({ contract, nftMetadatas }) => {
//   //         resolve(

//   //           {
//   //             contract,
//   //             nfts: await Promise.allSettled(nftMetadatas.map(async (nft) => {
//   //               return {
//   //                 ...nft,
//   //                 isRedeemable: (await contract.call("isRedeemable", nft.metadata.id._hex))
//   //               }
//   //             })
//   //             )
//   //           }


//   //         )
//   //       }));
//   //   }),
//   //   []
//   // );

//   // console.log(data, isLoading)

//   // return (<div>
//   //   <h3>hello IndigdaoApp</h3>

//   //   <pre>
//   //     {JSON.stringify({ error, state }, null, 2)}
//   //   </pre>

//   //   {
//   //     state === "resolved" && <ul>
//   //       {
//   //         results.nfts.map((nft) => <li key={nft.value.metadata.id._hex} >
//   //           <span>{JSON.stringify(nft, null, 2)}</span>

//   //           {
//   //             nft.isRedeemable ? <pre>NFT is already redeemed.</pre> : <button onClick={(e) => {
//   //               results.contract.call("redeem", nft.value.metadata.id._hex)
//   //             }}> redeem {nft.value.metadata.id._hex}</button>
//   //           }
//   //         </li>)
//   //       }
//   //     </ul>
//   //   }

//   // </div >)
// };

// const Web3Dapp = () => {
//   const web3Modal = new Web3Modal();

//   const [provider, error, state] = usePromise<any>(() => {
//     return web3Modal.connect()
//   }, [])
//   // const provider = await web3Modal.connect()
//   // const web3 = new Web3(provider)
//   // const networkId = await web3.eth.net.getId();

//   // console.log(provider, error, state);
//   // debugger
//   // const connectWithMetamask = useMetamask();
//   // const address = useAddress();

//   return (<div>
//     <p>hello world</p>

//     {provider ? (
//       <>
//         <h2>Connected as {provider.selectedAddress}</h2>
//         <IndigdaoApp ownerAdress={provider.selectedAddress} />
//       </>
//     ) : (
//       // <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
//         <p>connected</p>
//     )}
//   </div>)
// };

// // class MySigner extends Signer {
// //   getAddress(): Promise<string> {
// //     throw new Error("Method not implemented.");
// //   }
// //   signMessage(message: string | ethers.utils.Bytes): Promise<string> {
// //     throw new Error("Method not implemented.");
// //   }
// //   signTransaction(transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>): Promise<string> {
// //     throw new Error("Method not implemented.");
// //   }
// //   connect(provider: ethers.providers.Provider): ethers.Signer {
// //     throw new Error("Method not implemented.");
// //   }

// // }

// const { chains, provider } = configureChains(
//   [chain.rinkeby],
//   [
//     alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API }),
//     publicProvider(),
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   chains,
// });

// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
// });


// function ThirdwebProvider({ wagmiClient, children }: any) {

//   console.log(wagmiClient.config.connectors())
//   return (
//     <ThirdwebSDKProvider
//       desiredChainId={ChainId.Rinkeby}
//       signer={ethersProvider.getSigner(), }
//       provider={wagmiClient.provider}
//       queryClient={wagmiClient.queryClient as any}
//     >
//       {children}
//     </ThirdwebSDKProvider>
//   );
// }

// const ThirdWebApp = () => {
//   // const provider = useProvider();
//   // const signer = new MySigner();
//   // const signer = ethers.Wallet.createRandom();


//   return (<>
//     <h1>IndigDAO</h1>
//     <WagmiConfig client={wagmiClient}>
//       {/* @ts-ignore:next-line */}
//       <RainbowKitProvider chains={chains} >
//         <ThirdwebProvider wagmiClient={wagmiClient}>
//           <Web3Dapp />
//         </ThirdwebProvider>
//       </RainbowKitProvider>
//     </WagmiConfig>
//     {/* <ThirdwebSDKProvider provider={ChainId.Rinkeby}  desiredChainId={ChainId.Rinkeby} signer={signer} >
//       <Web3Dapp />
//     </ThirdwebSDKProvider> */}
//   </>);
// }




ReactDom.render(
  App(),
  document.getElementsByTagName('body')[0]
);
