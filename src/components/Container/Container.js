import React, { useState } from 'react';
import Calc from '../Calc/Calc';
import Result from '../Result/Result';

const Container = () => {
  const [loan, setLoan] = useState(0);
  const [payment, setPayment] = useState(0);
  const [salary, setSalary] = useState(0);
  const [overpayment, setOverpayment] = useState(0);

  const showResult = (result) => {
    setLoan(result.loan.toLocaleString('ru-RU', { maximumFractionDigits: 0 }));
    setPayment(result.payment.toLocaleString('ru-RU', { maximumFractionDigits: 0 }));
    setSalary(result.salary.toLocaleString('ru-RU', { maximumFractionDigits: 0 }));
    setOverpayment(result.overpayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 }));
  }

  return (
    <div className='container'>
      <Calc
        showResult={showResult} />
      <Result
        payment={payment}
        salary={salary}
        overpayment={overpayment}
        loan={loan} />
    </div>
  )
};

export default Container;
