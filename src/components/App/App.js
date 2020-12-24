import React, { useEffect, useState } from 'react';
import { calculate, getCurrentValues } from '../../utils/utils';
import FormContext from '../../contexts/FormContext';
import ResultContext from '../../contexts/ResultContext';
import Container from '../Container/Container';

function App() {
  const [initialValues, setInitialValues] = useState({ price: '', fee: '', period: '', rate: '' });
  const [loan, setLoan] = useState(0);
  const [payment, setPayment] = useState(0);
  const [salary, setSalary] = useState(0);
  const [overpayment, setOverpayment] = useState(0);

  const feePercents = [10, 15, 20, 25, 30];

  const submitForm = (values) => {
    const result = calculate(getCurrentValues(values));
    setLoan(result.loan);
    setPayment(result.payment);
    setSalary(result.salary);
    setOverpayment(result.overpayment);
  };

  useEffect(() => {
    const localValues = JSON.parse(localStorage.getItem('initialValues'));
    if (localValues) {
      const { price, fee, period, rate } = localValues;
      setInitialValues({
        price: price.toString(),
        fee: fee.toString(),
        period: period.toString(),
        rate: rate.toString()
      });
      submitForm(localValues);
    }
  }, []);

  const clearForm = () => {
    setInitialValues({ price: '', fee: '', period: '', rate: '' });
    setLoan(0);
    setPayment(0);
    setSalary(0);
    setOverpayment(0);
    localStorage.removeItem('initialValues');
  };

  const saveForm = (values) => {
    localStorage.setItem('initialValues', JSON.stringify(getCurrentValues(values)));
  };

  return (
    <FormContext.Provider value={{
      initialValues,
      feePercents,
      loan,
      payment,
      salary,
      overpayment,
      saveForm,
      clearForm,
      submitForm
    }}>
      <ResultContext.Provider value={{ loan, payment, salary, overpayment }}>
        <div className='app'>
          <Container />
        </div>
      </ResultContext.Provider>
    </FormContext.Provider>
  );
}

export default App;
