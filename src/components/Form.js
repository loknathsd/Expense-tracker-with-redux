import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, updateTransaction } from "../features/transaction/transactionSlice";

export default function Form() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode ,setEditMode] = useState(false);

    const dispatch = useDispatch();
    const {editing} = useSelector(state=>state.transaction)

    useEffect(()=>{
        const {id,name,type,amount} = editing ||{}
        if(id){
            setEditMode(true)
            setName(name);
            setType(type);
            setAmount(amount)
        }else{
            setEditMode(false)
            reset()
        }

    },[editing])

    const reset=()=>{
        setName('');
        setType('');
        setAmount('')
    }

    const handleAdd = (e)=>{
        e.preventDefault();
        dispatch(addTransaction({name,type,amount}));
        reset();
       
    }
    const handleUpdate=(e)=>{
        e.preventDefault();
            dispatch(updateTransaction({
                id:editing?.id,
                data:{name,type,amount}
            }))
            setEditMode(false)
            reset();
    }
  
    const handleCancel = ()=>{
        setEditMode(false);
        reset()
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleAdd}>
                <div className="form-group">
                    <label for="transaction_name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={e => setType('income')}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={() => setType('expense')}
                        />
                        <label for="transaction_type">Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label for="transaction_amount">Amount</label>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button className="btn">{editMode ? 'Update' : 'Add'} Transaction</button>
            </form>

           {editMode && (<button onClick={handleCancel} className="btn cancel_edit">Cancel Edit</button>)}
        </div>
    );
}
