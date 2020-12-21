import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  payment: PropTypes.string,
  salary: PropTypes.string,
  overpayment: PropTypes.string,
  loan: PropTypes.string
};

const defaultProps = {
  payment: '',
  salary: '',
  overpayment: '',
  loan: ''
};

const Result = (props) => {
  const { payment, salary, overpayment, loan } = props;
  return (
    <div className='result'>
      <div>
        <h2 className='result__heading'>Ежемесячный платёж</h2>
        <p className='result__values'>{payment} {'\u20bd'}</p>
      </div>
      <div>
        <h2 className='result__heading'>Необходимый доход</h2>
        <p className='result__values'>{salary} {'\u20bd'}</p>
      </div>
      <div>
        <h2 className='result__heading'>Переплата</h2>
        <p className='result__values'>{overpayment} {'\u20bd'}</p>
      </div>
      <div>
        <h2 className='result__heading'>Тело кредита</h2>
        <p className='result__values'>{loan} {'\u20bd'}</p>
      </div>
    </div>
  );
}

Result.propTypes = propTypes;
Result.defaultProps = defaultProps;

export default Result;
