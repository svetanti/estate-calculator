export const calculate = (values) => {
  const { price, fee, period, rate } = values;
  const loan = price >= fee ? price - fee : 0;
  const payment = loan * (rate / 1200 + (rate / 1200) / ((1 + rate / 1200) ** period - 1));
  const salary = 5 * (payment / 3);
  const overpayment = price >= fee ? payment * period - price + fee : 0;
  return { loan, payment, salary, overpayment };
};

export const getCurrentValues = (values) => {
  const valuesToCalculate = { ...values };
  Object.keys(valuesToCalculate).forEach((item) => {
    valuesToCalculate[item] = +valuesToCalculate[item];
  });
  return valuesToCalculate;
};