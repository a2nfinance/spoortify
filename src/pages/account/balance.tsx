import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading, HStack,
    Input,
    InputGroup,
    InputRightElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback, useEffect} from "react";
import {depositThunk} from "../../controller/thunk/depositThunk";
import {getBalanceThunk} from "../../controller/thunk/getBalanceThunk";
import {withdrawThunk} from "../../controller/thunk/withdrawThunk";
import {updateAttribute} from "../../controller/reducer/accountSlice";
import {actionNames, processKeys, updateProcessStatus} from "../../controller/reducer/proccessesSlice";
import HistoryTable from "../../components/transaction/HistoryTable";
import {getMyHistoryThunk} from "../../controller/thunk/getMyHistoryThunk";

export default function Balance() {
    const dispatch = useAppDispatch();
    const {balance, depositAmount, withdrawAmount} = useAppSelector(state => state.account);
    const {account} = useAppSelector(state => state.network);
    const {deposit, withdraw} = useAppSelector(state => state.process);
    const handleUpdate = useCallback((att: string, value: any) => {
        dispatch(updateAttribute({att: att, value: value}));
    }, [])
    useEffect(() => {
        dispatch(getBalanceThunk());
        dispatch(getMyHistoryThunk());
    }, [deposit.processing, withdraw.processing, account])
    const doDeposit = useCallback(() => {
        dispatch(updateProcessStatus({
            actionName: actionNames.deposit,
            att: processKeys.processing,
            value: true
        }))
        dispatch(depositThunk());
    }, [])
    const doWithdraw = useCallback(() => {
        dispatch(updateProcessStatus({
            actionName: actionNames.withdraw,
            att: processKeys.processing,
            value: true
        }))
        dispatch(withdrawThunk());
    }, [])
    return (
        <Container maxW={"full"}>
            <Stack spacing={4} marginBottom={5}>
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    My Balance:  {balance} CCN
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    This is your balance in Spoortify smart contract. You can withdraw CCN to your ALE wallet.
                </Text>
            </Stack>
            <HStack>
                <FormControl>
                    <FormLabel>Deposit Amount</FormLabel>
                    <InputGroup>
                        <NumberInput min={0}>
                            <NumberInputField value={depositAmount} onChange={e => handleUpdate("depositAmount", e.target.value)}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                        <Button isLoading={deposit.processing} ml={2} size='md' onClick={() => doDeposit()}>
                            Deposit
                        </Button>

                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Withdraw Amount</FormLabel>
                    <InputGroup>
                        <NumberInput min={0} >
                            <NumberInputField value={withdrawAmount} onChange={e => handleUpdate("withdrawAmount", e.target.value)}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                        <Button isLoading={withdraw.processing} ml={2} size='md' onClick={() =>doWithdraw()}>
                            Withdraw
                        </Button>

                    </InputGroup>
                </FormControl>
            </HStack>


            <Stack spacing={4} marginBottom={5} mt={5}>
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: 'lg', sm: '2lg', md: '2lg' }}>
                    Transaction History
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    History of transactions related to your account.
                </Text>
            </Stack>
            <HistoryTable />
        </Container>
    )
}