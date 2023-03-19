import { useSelector } from "react-redux";

export default function Balance() {
    const {transactions} = useSelector(state=>state.transaction)

    const totalAmount=()=>{
        let income = 0;
       transactions.forEach(tx => {
        const{type,amount} = tx;
         if(type === 'income'){
            income += Number(amount)
         }
         else{
            income -= Number(amount)
         }
        
       });
       return income;
    }
    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳ </span>
                <span>{transactions.length>0 ? totalAmount():0}</span>
            </h3>
        </div>
    );
}
