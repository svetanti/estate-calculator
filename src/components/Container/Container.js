import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calc from '../Calc/Calc';
import Result from '../Result/Result';

const Container = ({ initialValues }) => {
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
        initialValues={initialValues}
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

Container.propTypes = {
  initialValues: PropTypes.shape({
    price: PropTypes.string,
    fee: PropTypes.string,
    period: PropTypes.string,
    rate: PropTypes.string
  }),
}

Container.defaultProps = {
  initialValues: { price: '', fee: '', period: '', rate: '' },
}

export default Container;
