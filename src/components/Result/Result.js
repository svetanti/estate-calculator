import React, { useContext } from 'react';
import ResultContext from '../../contexts/ResultContext';

const Result = () => {
  const { loan, payment, salary, overpayment } = useContext(ResultContext);

  return (
    <div className='result'>
      <div>
        <h2 className='result__heading'>Ежемесячный платёж</h2>
        <p className='result__values'>
          {Number.isNaN(payment) || payment === 0
            ? ''
            : `${payment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} \u20bd`}
        </p>
      </div>
      <div>
        <h2 className='result__heading'>Необходимый доход</h2>
        <p className='result__values'>
          {Number.isNaN(salary) || salary === 0
            ? ''
            : `${salary.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} \u20bd`}</p>
      </div>
      <div>
        <h2 className='result__heading'>Переплата</h2>
        <p className='result__values'>
          {Number.isNaN(overpayment) || overpayment === 0
            ? ''
            : `${overpayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} \u20bd`}</p>
      </div>
      <div>
        <h2 className='result__heading'>Тело кредита</h2>
        <p className='result__values'>
          {Number.isNaN(loan) || loan === 0
            ? ''
            : `${loan.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} \u20bd`}</p>
      </div>
    </div>
  );
}

export default Result;
