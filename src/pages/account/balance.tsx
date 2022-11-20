import {Button, Container, Text} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback, useEffect} from "react";
import {depositThunk} from "../../controller/thunk/depositThunk";
import {getBalanceThunk} from "../../controller/thunk/getBalanceThunk";
import {withdrawThunk} from "../../controller/thunk/withdrawThunk";

export default function Balance() {
    const dispatch = useAppDispatch();
    const {balance} = useAppSelector(state => state.account);
    useEffect(() => {
        dispatch(getBalanceThunk());
    }, [])
    const doDeposit = useCallback(() => {
        dispatch(depositThunk(0.5));
    }, [])
    const doWithdraw = useCallback(() => {
        dispatch(withdrawThunk(0.3));
    }, [])
    return (
        <Container maxW={"container.lg"}>
            <Button colorScheme={"purple"} onClick={() => doDeposit()}>Withdraw 0.5</Button>
            <Text>
                Balance: {balance}
            </Text>
            <Button colorScheme={"purple"} onClick={() => doWithdraw()}>Withdraw 0.3</Button>
        </Container>
    )
}