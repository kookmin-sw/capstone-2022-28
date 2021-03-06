import axios from "axios";
import {
  COUNT_CONTRACT_ADDRESS_MAIN,
  MARKET_CONTRACT_ADDRESS_MAIN,
  NFT_CONTRACT_ADDRESS_MAIN,
} from "../constants";

const A2P_API_PREPARE_URL = "/prepare";
const APP_NAME = "방구석 전시회";
let cnt = 0;

export const buyCard = async (tokenId, setQrvalue, callback) => {
  const functionJSON =
    '{"constant": false,"inputs": [{"name": "tokenId","type": "uint256"},{"name": "NFT","type": "address"}],"name": "buyNFT","outputs": [{"name": "","type": "bool"}],"payable": true,"stateMutability": "payable","type": "function"}';
  executeContract(
    MARKET_CONTRACT_ADDRESS_MAIN,
    functionJSON,
    "10000000000000000",
    `[\"${tokenId}\",\"${NFT_CONTRACT_ADDRESS_MAIN}\"]`,
    setQrvalue,
    callback
  );
};

const getKlipAccessUrl = (method, request_key) => {
  if (method === "QR") {
    return `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
  if (method === "iOS") {
    return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
  if (method === "android") {
    return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  }
  return `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
};

export const listingCard = async (
  fromAddress,
  tokenId,
  setQrvalue,
  callback
) => {
  const functionJSON =
    '{"constant": false,"inputs": [{"name": "from","type": "address"},{"name": "to","type": "address"},{"name": "tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"}';
  executeContract(
    NFT_CONTRACT_ADDRESS_MAIN,
    functionJSON,
    "0",
    `[\"${fromAddress}\",\"${MARKET_CONTRACT_ADDRESS_MAIN}\",\"${tokenId}\"]`,
    setQrvalue,
    callback
  );
};

export const mintCardWithURI = async (
  toAddress,
  tokenId,
  uri,
  setQrvalue,
  callback
) => {
  const functionJson =
    '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
  executeContract(
    NFT_CONTRACT_ADDRESS_MAIN,
    functionJson,
    "0",
    `[\"${toAddress}\",\"${tokenId}\",\"${uri}\"]`,
    setQrvalue,
    callback
  );
};

export const executeContract = (
  txTo,
  functionJSON,
  value,
  params,
  setQrvalue,
  callback
) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "execute_contract",
      transaction: {
        to: txTo,
        abi: functionJSON,
        value: value,
        params: params,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      setQrvalue(getKlipAccessUrl("QR", request_key));
      let timerId = setInterval(() => {
        axios.get(`/result?request_key=${request_key}`).then((res) => {
          if (res.data.result) {
            callback(res.data.result);
            clearInterval(timerId);
          }
        });
      }, 20000);
    });
};

export const setCount = (count) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "execute_contract",
      transation: {
        to: COUNT_CONTRACT_ADDRESS_MAIN,
        abi: '{ "constant": false, "inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"setCount","outputs":[],"stateMutability":"nonpayable","type":"function"}',
        value: "0",
        params: `[\"${count}\"]`,
      },
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=2c739970-d451-4b52-8a99-12db5214af6e`;

      let timerId = setInterval(() => {
        axios.get(`/result?request_key=${request_key}`).then((res) => {
          cnt++;
          if (res.data.result) {
            clearInterval(timerId);
          }
          if (cnt >= 100) clearInterval(timerId);
        }, 100000);
      });
      cnt = 0;
    });
};

export const getAddress = (setQrvalue, callback) => {
  axios
    .post(A2P_API_PREPARE_URL, {
      bapp: {
        name: APP_NAME,
      },
      type: "auth",
    })
    .then((response) => {
      const { request_key } = response.data;
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
      setQrvalue(qrcode);

      let timerId = setInterval(() => {
        axios.get(`/result?request_key=${request_key}`).then((res) => {
          cnt++;
          if (res.data.result) {
            callback(res.data.result.klaytn_address);
            clearInterval(timerId);
          }
          if (cnt >= 100) clearInterval(timerId);
        }, 100000);
      });
      cnt = 0;
    });
};
