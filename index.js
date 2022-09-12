const HDWalletProvider = require('@truffle/hdwallet-provider');
const { OpenSeaSDK, Network } = require('opensea-js');

// Opensea API key
const OPENSEA_API_KEY = ''

// Wallet Mnemonic
const WALLET_MNEMONIC = '';
const wallet = new HDWalletProvider({
  mnemonic: {
    phrase: WALLET_MNEMONIC,
  },
  providerOrUrl: 'https://mainnet.infura.io/v3/',
  addressIndex: 0,
});

// Initiate SDK
const openseaSDK = new OpenSeaSDK(wallet, {
  networkName: Network.Main,
  apiKey: OPENSEA_API_KEY
})

/** Create a listing on Opensea */
async function createListing(tokenAddress, tokenId, amount) {
  const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)
  const order = await openseaSDK.createSellOrder({
    asset: {
      tokenId,
      tokenAddress,
    },
    accountAddress: wallet.getAddress(),
    startAmount: amount,
    expirationTime
  })

  return order;
}

/** Create an offer on Opensea */
async function createOffer(tokenAddress, tokenId, amount) {
  const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)
  const order = await openseaSDK.createBuyOrder({
    asset: {
      tokenId,
      tokenAddress,
    },
    accountAddress: wallet.getAddress(),
    startAmount: amount,
    expirationTime
  })

  return order;
}

// createListing('0xda2686fd32c6b74d55605cfb48bef331771e7fc6', '15', ethers.BigNumber.from('101'))
// createOffer('0xda2686fd32c6b74d55605cfb48bef331771e7fc6', '14', '0.000001');