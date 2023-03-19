import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const {transactions,isLoading ,isError,error} = useSelector(state=>state.transaction);
    const dispatch = useDispatch();
    console.log(transactions,'//')

    useEffect(()=>{
        dispatch(fetchTransactions())
    },[dispatch])

    //decide what to render

    let content = null;
    if(isLoading) <h1>Loading..</h1>
    if(!isLoading && isError) content = <p>Something went wrong</p>;
    if(!isError && !isLoading && transactions.length >0 ){
       content =  transactions.map(tx=><Transaction key={tx.id} transaction ={tx} />)
    }
    if(!isError && !isLoading && transactions.length === 0 ) content = <p>No transactions found</p>

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                    
                </ul>
            </div>
        </>
    );
}
