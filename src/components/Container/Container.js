import React from 'react';
import Calc from '../Calc/Calc';
import Result from '../Result/Result';

const Container = () => (
  <div className='container'>
    <Calc />
    <Result
      payment='224 656'
      salary='374 427'
      overpayment='9 958 750'
      loan='17 000 000' />
  </div>
);

export default Container;
