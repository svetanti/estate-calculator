import React, { useState } from 'react';
import Calc from '../Calc/Calc';
import Result from '../Result/Result';

const Container = () => {
  const [loan, setLoan] = useState(0);
  const [payment, setPayment] = useState(0);
  const [salary, setSalary] = useState(0);
  const [overpayment, setOverpayment] = useState(0);

  const showResult = (result) => {
    setLoan(result.loan);
    setPayment(result.payment);
    setSalary(result.salary);
    setOverpayment(result.overpayment);
  }

  const clearResult = () => {
    setLoan(0);
    setPayment(0);
    setSalary(0);
    setOverpayment(0);
  }

  return (
    <div className='container'>
      <Calc
        showResult={showResult}
        clearResult={clearResult} />
      <Result
        payment={payment}
        salary={salary}
        overpayment={overpayment}
        loan={loan} />
    </div>
  )
};

export default Container;
