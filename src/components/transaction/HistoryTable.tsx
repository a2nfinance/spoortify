import {useAppSelector} from "../../controller/hooks";
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

export default function HistoryTable() {
    const {transactions} = useAppSelector(state => state.account);
    const {account} = useAppSelector(state => state.network);
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Description</Th>
                        <Th isNumeric>Amount (CCN)</Th>
                        <Th>Created At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        transactions.map((transaction, index) => {
                            let transactionType = transaction.transactionType;
                            if (transactionType === "Buy" && account === transaction.toAddress) {
                                transactionType = "User bought your playlist";
                            }
                            return  (
                                <Tr key={`tr-history-${transaction._id}`}>
                                    <Td>{transactionType}</Td>
                                    <Td>{transaction.description}</Td>
                                    <Td isNumeric>{transaction.amount}</Td>
                                    <Td>{new Date(transaction.createdAt).toLocaleString()}</Td>
                                </Tr>
                            )
                        })
                    }

                </Tbody>
            </Table>
        </TableContainer>
    )
}