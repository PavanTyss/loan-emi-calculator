# Tabbed Loan Calculator

A React-based loan calculator with support for multiple loan types (Housing, Vehicle, and Personal loans).

## Features

- **Multiple Loan Types**: Switch between Housing, Vehicle, and Personal loans using tabs
- **Interactive UI**: Adjust loan parameters using sliders or direct input fields
- **Real-time Calculations**: EMI and other loan details update instantly as you change parameters
- **Visual Breakdown**: Pie chart showing the proportion of principal amount and total interest
- **Responsive Design**: Works well on both desktop and mobile devices

## Technical Details

### Dependencies

- React
- Redux (for state management)
- Recharts (for data visualization)
- Tailwind CSS (for styling)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Usage

1. Select the type of loan using the tabs at the top
2. Adjust the loan amount, interest rate, and tenure using the sliders or input fields
3. View the calculated monthly EMI and breakdown of total payment
4. The pie chart visualizes the proportion of principal amount and interest

## Component Structure

The main component is `LoanCalculator.tsx` which:
- Manages the UI state for the active loan tab
- Connects to Redux for loan calculation state
- Renders the tabbed interface, sliders, and visualization

## Redux Integration

This component works with a Redux store that should include:
- A `loanSlice` with actions for setting loan parameters and calculating EMI
- State containing `loanAmount`, `interestRate`, `loanTenure`, `monthlyEMI`, `totalInterest`, and `totalAmount`

## Customization

The loan parameters for each type can be easily modified in the `loanTypes` object at the top of the component:

```js
const loanTypes = {
  housing: {
    name: "Housing Loan",
    minAmount: 500000,
    maxAmount: 10000000,
    // other parameters...
  },
  // other loan types...
};
```
