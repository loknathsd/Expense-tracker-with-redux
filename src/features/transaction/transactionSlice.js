import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createTransaction, editTransaction, getTransactions, removeTransaction } from "./transactionApi"

const initialState = {
    isLoading: false,
    isError: false,
    error: '',
    transactions: [],
    editing:{}

}

// create thunk function

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransactions();
    return transactions;
})

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (data) => {
    const res = await createTransaction(data);
    return res;
})

export const updateTransaction = createAsyncThunk('transactions/updateTransaction', async ({id, data}) => {
    const res = await editTransaction({id, data});
    return res;
})
export const deleteTransaction = createAsyncThunk('transactions/deleteTransaction', async (id) => {
    const res = await removeTransaction(id);
    return res;
})

//create slice

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state) => {
            state.editing = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchTransactions.fulfilled, (state,action) => {
                state.isLoading = false
                state.isError = false
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true;
                state.error = action.error.message
                state.transactions=[]
            })
            .addCase(addTransaction.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(addTransaction.fulfilled, (state,action) => {
                state.isLoading = false
                state.isError = false
                state.transactions.push(action.payload)
            })
            .addCase(addTransaction.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateTransaction.fulfilled, (state,action) => {
                state.isLoading = false
                state.isError = false
                const indexToUpdate = state.transactions.findIndex(tx=>tx.id === action.payload.id)
                state.transactions[indexToUpdate] = action.payload
            })
            .addCase(updateTransaction.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(deleteTransaction.fulfilled, (state,action) => {
                state.isLoading = false
                state.isError = false

                state.transactions = state.transactions.filter(tx=>tx.id !== action.meta.arg)
            })
            .addCase(deleteTransaction.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true;
                state.error = action.error.message;
            })
    

    }
})

export default transactionSlice.reducer;
export const {editActive,editInActive} = transactionSlice.actions;
