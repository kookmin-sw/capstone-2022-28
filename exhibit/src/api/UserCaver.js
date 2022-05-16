import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import KIP17ABI from '../abi/KIP17TokenABI.json'
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, COUNT_CONTRACT_ADDRESS, CHAIN_ID, Authorization } from '../constants/index'
import { ACCESS_KEY_ID_MAIN, SECRET_ACCESS_KEY_MAIN, COUNT_CONTRACT_ADDRESS_MAIN, NFT_CONTRACT_ADDRESS_MAIN, MARKET_CONTRACT_ADDRESS_MAIN, CHAIN_ID_MAIN } from '../constants/constants.cypress';

var global = global || window; global.Buffer = global.Buffer || require("buffer").Buffer;

const option = {
  headers: [ 
    {
      name: "Authorization",
      value: Authorization // "Basic "+ Buffer.from(ACCESS_KEY_ID + SECRET_ACCESS_KEY).toString("base64")
    },
    { name: "x-chain-id", value: CHAIN_ID }
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const NFTContract = new caver.contract(KIP17ABI, COUNT_CONTRACT_ADDRESS);

export const fetchCardsOf = async (address) => {
  // Fetch Balance
  const balance = await NFTContract.methods.balanceOf(address).call();
  console.log(`[NFT Balance]${balance}`);  
  // Fetch Token IDs
  const tokenIds = [];
  for (let i = 0; i < balance; i++){
    const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(id);
  }
  // Fetch Token URIs
  const tokenUris = [];
  for (let i = 0; i < balance; i++){
    const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
    tokenUris.push(uri);
  }
  console.log(`${tokenIds}`);
  console.log(`${tokenUris}`);
  console.log(`${tokenUris[0]}`);

  const nfts = [];
  for (let i = 0; i< balance;i++){
    nfts.push({uri: tokenUris[i], id: tokenIds[i]});
  }
  console.log(nfts);
  return nfts;
  
}

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(balance);
    return caver.klay.getBalance(address);
  })
}

const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

export const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

export const setCount = async (newCount) => {
  // 사용할 account 설정
  try {
    const privateKey = '0xbf08e12e70d09700bbe2fda3192edad7716bcc158633d8ee2d31835f83042c6a';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
    caver.wallet.add(deployer);

    // 스마트 컨트랙트 실행 트랜잭션 날리기
    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,
      gas: '0x4bfd200'
    })
  }catch(e){
    console.log(e);
  }
}