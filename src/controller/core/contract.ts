import Mcp from "mcp.js";
import Big from 'bignumber.js';
const {abi} = require("src/abi/Spoortify.json");

const McpFunc = new Mcp();
McpFunc.Contract.setProvider(process.env.rpcAddress);

const contractAddress = process.env.contractAddress;
import {ethers} from "ethers";

const Contract = new McpFunc.Contract(
    abi,
    contractAddress
);


export const deposit = async (amount: number, account: string) => {
    const approveAmount = new Big(amount).times('1e18').toString();
    const response = await Contract.methods.deposit().sendToBlock({
        from: account,
        amount: approveAmount
    });
    if (response.success) {
        console.log('transaction success: ', response);
    } else {
        console.log('transaction failed: ', response);
    }

    return response;
}

export const getBalance = async (account: string) => {
    const response = await Contract.methods.getBalance().call({
        from: account,
    });
    if (response) {
        return ethers.utils.formatUnits(response, 18);
    }
    return 0;
}


export const withdraw = async (amount: number, account: string) => {
    const approveAmount = new Big(amount).times('1e18').toString();
    const response = await Contract.methods.withdraw(approveAmount).sendToBlock({
        from: account,
        amount: new Big('0').toString()
    });
    if (response.success) {
        console.log('transaction success: ', response);
    } else {
        console.log('transaction failed: ', response);
    }

    return response;
}
export const buy = async (artist: string, playlistId: string, amount: number, account: string) => {
    const approveAmount = new Big(amount).times('1e18').toString();
    const response = await Contract.methods.buy(artist, playlistId, approveAmount).sendToBlock({
        from: account,
        amount: new Big('0').toString()
    });
    if (response.success) {
        console.log('transaction success: ', response);
    } else {
        console.log('transaction failed: ', response);
    }

    return response;
}


export const isPaid = async (playlistId: string, account: string) => {

    const response = await Contract.methods.isPaid(playlistId).call({
        from: account
    });
    return response;
}


export default Contract;