import axios from "axios";
import { COUNT_CONTRACT_ADDRESS_MAIN, MARKET_CONTRACT_ADDRESS_MAIN, NFT_CONTRACT_ADDRESS_MAIN } from "../constants";

const A2P_API_PREPARE_URL = "/prepare";
const APP_NAME = '방구석 전시회';
let cnt = 0;

export const buyCard = async (
    tokenId,
    setQrvalue,
    callback
) => {
    const functionJSON = '{"constant": false,"inputs": [{"name": "tokenId","type": "uint256"},{"name":"NFT","type": "address"}],"name": "buyNFT","outputs": [{"name": "","type": "bool"}],"payable": true,"stateMutability": "payable","type": "function"}';
    executeContract(MARKET_CONTRACT_ADDRESS_MAIN, functionJSON, "10000000000000000", `[\"${tokenId}\",\"${MARKET_CONTRACT_ADDRESS_MAIN}\"]`,setQrvalue,callback);
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
    const functionJSON = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(MARKET_CONTRACT_ADDRESS_MAIN, functionJSON, "0", `[\"${fromAddress}\",\"${MARKET_CONTRACT_ADDRESS_MAIN}\",\"${tokenId}\"]`,setQrvalue,callback);
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
    console.log("Start Minting");
    executeContract(
      NFT_CONTRACT_ADDRESS_MAIN,
      functionJson,
      "0",
      `[\"${toAddress}\",\"${tokenId}\",\"${uri}\"]`,
      setQrvalue,
      callback
    );
  };

export const executeContract = (txTo, functionJSON, value, params, setQrvalue, callback) => {
    console.log("minting start");
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
      console.log("Upload file...2");
      setQrvalue(getKlipAccessUrl("QR", request_key));
      console.log(getKlipAccessUrl("QR", request_key));
      let timerId = setInterval(() => {
        axios
          .get(
            `/result?request_key=${request_key}`
          )
          .then((res) => {
            console.log(`minting... ${txTo}, ${res.data.result}, ${request_key}`);
            if (res.data.result) {
              console.log(`[Result] ${JSON.stringify(res.data.result)}`);
              callback(res.data.result);
              clearInterval(timerId);
            }
          });
      }, 10000000);
    });
};

export const setCount = (count) => {
    axios.post(
        A2P_API_PREPARE_URL,{
            bapp: {
                name: APP_NAME,
            },
            type: "execute_contract",
            transation: {
                to: COUNT_CONTRACT_ADDRESS_MAIN,
                abi: '{ "constant": false, "inputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"setCount","outputs":[],"stateMutability":"nonpayable","type":"function"}',
                value: "0",
                params: `[\"${count}\"]`
            }
        }
    ).then((response) => {
        const { request_key } = response.data;
        console.log(`request key ${request_key}`);
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=2c739970-d451-4b52-8a99-12db5214af6e`

        let timerId = setInterval(()=> {
            axios
            .get(
                `/result?request_key=${request_key}`
            )
            .then((res) =>{
                cnt++;
                if(res.data.result){
                    console.log(`[Result] ${JSON.stringify(res.data.result.klaytn_address)} + ${cnt}`);
                    clearInterval(timerId);
                }
                if(cnt >= 100) clearInterval(timerId);
            }, 100000);
        });
        cnt = 0;
    })
};

export const getAddress = (setQrvalue, callback) => {
    axios.post(
        A2P_API_PREPARE_URL,{
            bapp: {
                name: APP_NAME,
            },
            type: "auth",
        }
    ).then((response) => {
        const { request_key } = response.data;
        console.log(`request key ${request_key}`);
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`
        setQrvalue(qrcode);

        let timerId = setInterval(()=> {
            axios
            .get(
                `/result?request_key=${request_key}`
            )
            .then((res) =>{
                cnt++;
                if(res.data.result){
                    console.log(`[Result] ${JSON.stringify(res.data.result)} + ${cnt}`);
                    callback(res.data.result.klaytn_address);
                    clearInterval(timerId);                        
                }
                if(cnt >= 100) clearInterval(timerId);
            }, 100000);
        });
        cnt = 0;
    })
};

