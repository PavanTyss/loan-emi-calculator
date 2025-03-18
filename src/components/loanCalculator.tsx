import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoanAmount, setInterestRate, setLoanTenure, calculateEMI } from "../redux/loanSlice";
import { RootState } from "../redux/store";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const loanTypes = {
  housing: {
    name: "Housing Loan",
    minAmount: 500000,
    maxAmount: 10000000,
    defaultAmount: 2500000,
    minInterest: 6.5,
    maxInterest: 12,
    defaultInterest: 8.5,
    minTenure: 5,
    maxTenure: 30,
    defaultTenure: 20,
    color: "#4CAF50"
  },
  vehicle: {
    name: "Vehicle Loan",
    minAmount: 100000,
    maxAmount: 2000000,
    defaultAmount: 500000,
    minInterest: 7,
    maxInterest: 15,
    defaultInterest: 9.5,
    minTenure: 1,
    maxTenure: 7,
    defaultTenure: 5,
    color: "#2196F3"
  },
  personal: {
    name: "Personal Loan",
    minAmount: 50000,
    maxAmount: 1500000,
    defaultAmount: 300000,
    minInterest: 10,
    maxInterest: 18,
    defaultInterest: 12,
    minTenure: 1,
    maxTenure: 5,
    defaultTenure: 3,
    color: "#9C27B0"
  }
};

const LoanCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const { loanAmount, interestRate, loanTenure, monthlyEMI, totalInterest, totalAmount } = useSelector(
    (state: RootState) => state.loan
  );

  // State for the active tab
  const [activeTab, setActiveTab] = useState<"housing" | "vehicle" | "personal">("housing");

  // Set loan parameters when tab changes
  useEffect(() => {
    const selectedLoan = loanTypes[activeTab];
    dispatch(setLoanAmount(selectedLoan.defaultAmount));
    dispatch(setInterestRate(selectedLoan.defaultInterest));
    dispatch(setLoanTenure(selectedLoan.defaultTenure));
  }, [activeTab, dispatch]);

  // Calculate EMI whenever loan parameters change
  useEffect(() => {
    dispatch(calculateEMI());
  }, [loanAmount, interestRate, loanTenure, dispatch]);

  const pieData = [
    { name: "Principal", value: loanAmount, color: loanTypes[activeTab].color },
    { name: "Total Interest", value: totalInterest, color: "#FF9800" },
  ];

  const activeLoan = loanTypes[activeTab];

  return (
    <div className="w-full max-w-3xl mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Loan EMI Calculator</h2>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        {Object.entries(loanTypes).map(([key, loan]) => (
          <button
            key={key}
            className={`py-2 px-4 font-medium ${
              activeTab === key
                ? `text-${activeLoan.color.substring(1)} border-b-2 border-${activeLoan.color.substring(1)}`
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(key as "housing" | "vehicle" | "personal")}
          >
            {loan.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Loan Amount Input */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">Loan Amount (₹)</label>
            <input
              type="number"
              min={activeLoan.minAmount}
              max={activeLoan.maxAmount}
              value={loanAmount}
              onChange={(e) => dispatch(setLoanAmount(Number(e.target.value)))}
              className="w-full p-2 border rounded-md text-center mb-2"
            />
            <input
              type="range"
              min={activeLoan.minAmount}
              max={activeLoan.maxAmount}
              step={activeLoan.minAmount / 10}
              value={loanAmount}
              onChange={(e) => dispatch(setLoanAmount(Number(e.target.value)))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{activeLoan.minAmount.toLocaleString()}</span>
              <span>₹{activeLoan.maxAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Interest Rate Input */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">Interest Rate (p.a %)</label>
            <input
              type="number"
              min={activeLoan.minInterest}
              max={activeLoan.maxInterest}
              step="0.1"
              value={interestRate}
              onChange={(e) => dispatch(setInterestRate(Number(e.target.value)))}
              className="w-full p-2 border rounded-md text-center mb-2"
            />
            <input
              type="range"
              min={activeLoan.minInterest}
              max={activeLoan.maxInterest}
              step="0.1"
              value={interestRate}
              onChange={(e) => dispatch(setInterestRate(Number(e.target.value)))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{activeLoan.minInterest}%</span>
              <span>{activeLoan.maxInterest}%</span>
            </div>
          </div>

          {/* Loan Tenure Input */}
          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-1">Loan Tenure (Years)</label>
            <input
              type="number"
              min={activeLoan.minTenure}
              max={activeLoan.maxTenure}
              value={loanTenure}
              onChange={(e) => dispatch(setLoanTenure(Number(e.target.value)))}
              className="w-full p-2 border rounded-md text-center mb-2"
            />
            <input
              type="range"
              min={activeLoan.minTenure}
              max={activeLoan.maxTenure}
              value={loanTenure}
              onChange={(e) => dispatch(setLoanTenure(Number(e.target.value)))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{activeLoan.minTenure} years</span>
              <span>{activeLoan.maxTenure} years</span>
            </div>
          </div>

          {/* EMI Details */}
          <div className="p-4 bg-gray-100 rounded-md text-gray-700">
            <p className="text-lg font-semibold text-center mb-3" style={{ color: activeLoan.color }}>
              Monthly EMI: ₹{monthlyEMI.toLocaleString()}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <p><strong>Principal:</strong> ₹{loanAmount.toLocaleString()}</p>
              <p><strong>Total Interest:</strong> ₹{totalInterest.toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ₹{totalAmount.toLocaleString()}</p>
              <p><strong>Interest Rate:</strong> {interestRate}%</p>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Loan Breakdown</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;