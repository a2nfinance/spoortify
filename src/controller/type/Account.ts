export type Transaction = {
    _id?: string,
    fromAddress: string,
    toAddress: string,
    transactionType: string,
    transactionHash: string,
    description: string,
    amount: number,
    createdAt?: any
};
export type Account = {
    networkName: string,
    balance: string,
    symbol: string,
    address: string,
    shortAddress: string,
    chainId: number,
    depositAmount: number,
    withdrawAmount: number,
    transactions: Transaction[]
}