export type InterestType = "simple" | "compound";

/**
 * Calculates simple interest.
 * @param {number} principal - The principal amount.
 * @param {number} rate - The annual interest rate (in percentage, e.g., 5 for 5%).
 * @param {number} timeInYears - The time period in years.
 * @returns {number} The calculated simple interest.
 */
export function calculateSimpleInterest(
  principal: number,
  rate: number,
  timeInYears: number
) {
  return (principal * rate * timeInYears) / 100;
}

/**
 * Calculates compound interest.
 * @param {number} principal - The principal amount.
 * @param {number} rate - The annual interest rate (in percentage, e.g., 5 for 5%).
 * @param {number} timeInYears - The time period in years.
 * @param {number} n - The number of times that interest is compounded per year.
 * @returns {number} The calculated compound interest.
 */
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  timeInYears: number,
  n = 12
) {
  const amount = principal * Math.pow(1 + rate / (100 * n), n * timeInYears);
  return amount - principal;
}

/**
 * Generates a data series for loan growth over time (monthly).
 * @param {number} principal - The principal amount.
 * @param {number} rate - The annual interest rate (in percentage).
 * @param {number} timeInMonths - The total loan duration in months.
 * @param {InterestType} type - The type of interest to calculate.
 * @returns {Array<{month: number, year: number, interest: number, total: number, principal: number}>}
 */
export function generateLoanGrowthData(
  principal: number,
  rate: number,
  timeInMonths: number,
  type: InterestType = "compound"
) {
  const monthlyRate = rate / 12 / 100;
  const data: {
    month: number;
    year: number;
    interest: number;
    principal: number;
    total: number;
  }[] = [];
  let currentBalance = principal;

  if (type === "compound") {
    for (let i = 1; i <= timeInMonths; i++) {
      const interest = currentBalance * monthlyRate;
      currentBalance += interest;
      data.push({
        month: i,
        year: Math.ceil(i / 12),
        interest: Number(interest.toFixed(2)),
        principal: Number(principal.toFixed(2)),
        total: Number(currentBalance.toFixed(2)),
      });
    }
  } else {
    // simple interest
    const monthlySimpleInterest = (principal * rate) / 100 / 12;
    for (let i = 1; i <= timeInMonths; i++) {
      currentBalance = principal + monthlySimpleInterest * i;
      data.push({
        month: i,
        year: Math.ceil(i / 12),
        interest: Number(monthlySimpleInterest.toFixed(2)),
        principal: Number(principal.toFixed(2)),
        total: Number(currentBalance.toFixed(2)),
      });
    }
  }

  return data;
}
