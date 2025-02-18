import React from "react";
import LoanCalculator from "../components/loanCalculator";

const LoanPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoanCalculator />
    </div>
  );
};

export default LoanPage;