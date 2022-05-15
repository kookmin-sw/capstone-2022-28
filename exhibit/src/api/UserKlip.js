import axios from "axios";
import { COUNT_CONTRACT_ADDRESS_MAIN, MARKET_CONTRACT_ADDRESS_MAIN, NFT_CONTRACT_ADDRESS_MAIN } from "../constants";

const A2P_API_PREPARE_URL = "/prepare";
const APP_NAME = '방구석 전시회';

export const buyCard = async (
    tokenId,
    setQrvalue,
    callback
) => {
    const functionJSON = '{ "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "seller", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }';
    executeContract(MARKET_CONTRACT_ADDRESS_MAIN, functionJSON, "10000000000000000", `[\"${tokenId}\",\"${NFT_CONTRACT_ADDRESS_MAIN}\"]`,setQrvalue,callback);
};

export const listingCard = async (
    fromAddress,
    tokenId,
    setQrvalue,
    callback
) => {
    const functionJSON = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(NFT_CONTRACT_ADDRESS_MAIN, functionJSON, "0", `[\"${fromAddress}\",\"${MARKET_CONTRACT_ADDRESS_MAIN}\",\"${tokenId}\"]`,setQrvalue,callback);
};

export const mintCardWithURI = async (toAdress, tokenId, uri, setQrvalue, callback) => {
    const functionJSON = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(NFT_CONTRACT_ADDRESS_MAIN, functionJSON, "0", `[\"${toAdress}\",\"${tokenId}\",\"${uri}\"]`,setQrvalue,callback);
};

export const executeContract = (txTo, functionJSON, value, params, setQrvalue, callback) => {
    axios.post(
        A2P_API_PREPARE_URL,{
            bapp: {
                name: APP_NAME,
            },
            type: "execute_contract",    
            transation: {
                to: txTo,
                abi: functionJSON,
                value: value,
                params: params
            }
        }
    ).then((response) => {
        const { request_key } = response.data;
        console.log(`request key ${request_key}`);
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`

        let timerId = setInterval(()=> {
            axios
            .get(
                `/result?request_key=${request_key}`
            )
            .then((res) =>{
                if(res.data.result){
                    console.log(`[Result] ${JSON.stringify(res.data.result.klaytn_address)}`);
                    callback(res.data.result);
                    clearInterval(timerId);
                }
            }, 100000);
        });
    })
}

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
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`

        let timerId = setInterval(()=> {
            axios
            .get(
                `/result?request_key=${request_key}`
            )
            .then((res) =>{
                if(res.data.result){
                    console.log(`[Result] ${JSON.stringify(res.data.result.klaytn_address)}`);
                    clearInterval(timerId);
                }
            }, 100000);
        });
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
                if(res.data.result){
                    console.log(`[Result] ${JSON.stringify(res.data.result)}`);
                    callback(res.data.result.klaytn_address);
                    clearInterval(timerId);                        
                }
            }, 100000);
        });
    })
};

