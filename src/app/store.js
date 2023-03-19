import { configureStore } from "@reduxjs/toolkit";
import  transactionReducer from '../features/transaction/transactionSlice.js'

export const store = configureStore({
    reducer: {
        transaction:transactionReducer
    },
});
