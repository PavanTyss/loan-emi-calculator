import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoanAmount, setInterestRate, setLoanTenure, calculateEMI } from "../redux/loanSlice";
import { RootState } from "../redux/store";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const LoanCalculator: React.FC = () => {
  const dispatch = useDispatch();
  const { loanAmount, interestRate, loanTenure, monthlyEMI, totalInterest, totalAmount } = useSelector(
    (state: RootState) => state.loan
  );

  useEffect(() => {
    dispatch(calculateEMI());
  }, [loanAmount, interestRate, loanTenure, dispatch]);

  const pieData = [
    { name: "Principal", value: loanAmount, color: "#4CAF50" },
    { name: "Total Interest", value: totalInterest, color: "#FF9800" },
  ];

  return (
    <div className="w-[60%] mx-auto my-2 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Loan EMI Calculator</h2>

      {/* Loan Amount Input */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Loan Amount (₹)</label>
        <input
          type="number"
          min="50000"
          max="5000000"
          value={loanAmount}
          onChange={(e) => dispatch(setLoanAmount(Number(e.target.value)))}
          className="w-32 p-2 border rounded-md text-center mb-2"
        />
        <input
          type="range"
          min="50000"
          max="5000000"
          value={loanAmount}
          onChange={(e) => dispatch(setLoanAmount(Number(e.target.value)))}
          className="w-full"
        />
      </div>

      {/* Interest Rate Input */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Interest Rate (p.a %)</label>
        <input
          type="number"
          min="1"
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => dispatch(setInterestRate(Number(e.target.value)))}
          className="w-20 p-2 border rounded-md text-center mb-2"
        />
        <input
          type="range"
          min="1"
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => dispatch(setInterestRate(Number(e.target.value)))}
          className="w-full"
        />
      </div>

      {/* Loan Tenure Input */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-1">Loan Tenure (Years)</label>
        <input
          type="number"
          min="1"
          max="30"
          value={loanTenure}
          onChange={(e) => dispatch(setLoanTenure(Number(e.target.value)))}
          className="w-20 p-2 border rounded-md text-center mb-2"
        />
        <input
          type="range"
          min="1"
          max="30"
          value={loanTenure}
          onChange={(e) => dispatch(setLoanTenure(Number(e.target.value)))}
          className="w-full"
        />
      </div>

      {/* Pie Chart */}
      <div className="flex flex-col items-center mt-6">
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
                outerRadius={100}
                label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
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

      {/* EMI Details */}
      <div className="mt-6 p-4 bg-gray-100 rounded-md text-gray-700">
        <p className="text-lg font-semibold text-center text-green-700">Monthly EMI: ₹{monthlyEMI.toLocaleString()}</p>
        <p><strong>Principal:</strong> ₹{loanAmount.toLocaleString()}</p>
        <p><strong>Total Interest:</strong> ₹{totalInterest.toLocaleString()}</p>
        <p><strong>Total Amount:</strong> ₹{totalAmount.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default LoanCalculator;
