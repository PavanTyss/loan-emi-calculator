import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoanState {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
}

const initialState: LoanState = {
  loanAmount: 1000000,
  interestRate: 6.5,
  loanTenure: 5,
  monthlyEMI: 0,
  totalInterest: 0,
  totalAmount: 0,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoanAmount: (state, action: PayloadAction<number>) => {
      state.loanAmount = action.payload;
    },
    setInterestRate: (state, action: PayloadAction<number>) => {
      state.interestRate = action.payload;
    },
    setLoanTenure: (state, action: PayloadAction<number>) => {
      state.loanTenure = action.payload;
    },
    calculateEMI: (state) => {
      const r = state.interestRate / 12 / 100;
      const n = state.loanTenure * 12;
      state.monthlyEMI = (state.loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      state.totalAmount = state.monthlyEMI * n;
      state.totalInterest = state.totalAmount - state.loanAmount;
    },
  },
});

export const { setLoanAmount, setInterestRate, setLoanTenure, calculateEMI } = loanSlice.actions;
export default loanSlice.reducer;