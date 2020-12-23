import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';

function App() {
  const [initialValues, setInitialValues] = useState({ price: '', fee: '', period: '', rate: '' });

  useEffect(() => {
    const localValues = localStorage.getItem('initialValues');
    if (localValues) {
      const { price, fee, period, rate } = JSON.parse(localValues);
      setInitialValues({
        price: price.toString(),
        fee: fee.toString(),
        period: period.toString(),
        rate: rate.toString()
      });
    }
  }, []);

  console.log(initialValues)
  return (
    <div className='app'>
      <Container
        initialValues={initialValues} />
    </div>
  );
}

export default App;
