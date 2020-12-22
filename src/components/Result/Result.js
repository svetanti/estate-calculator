import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  payment: PropTypes.number,
  salary: PropTypes.number,
  overpayment: PropTypes.number,
  loan: PropTypes.number
};

const defaultProps = {
  payment: 0,
  salary: 0,
  overpayment: 0,
  loan: 0
};

const Result = (props) => {
  const { payment, salary, overpayment, loan } = props;
  return (
    <div className='result'>
      <div>
        <h2 className='result__heading'>Ежемесячный платёж</h2>
        <p className='result__values'>{payment} {payment && '\u20bd'}</p>
      </div>
      <div>
        <h2 className='result__heading'>Необходимый доход</h2>
        <p className='result__values'>{salary} {salary && '\u20bd'}</p>
      </div>
      <div>
        <h2 className='result__heading'>Переплата</h2>
        <p className='result__values'>{overpayment} {overpayment && '\u20bd'}</p>
      </div>
      <div>
        <h2 className='result__heading'>Тело кредита</h2>
        <p className='result__values'>{loan} {loan && '\u20bd'}</p>
      </div>
    </div>
  );
}

Result.propTypes = propTypes;
Result.defaultProps = defaultProps;

export default Result;
