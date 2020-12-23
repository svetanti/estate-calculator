import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { id } = props;
  return (
    <>
      <label htmlFor={id} className='form__label'>{label}</label>
      <input className='form__filed' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='form__error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const Calc = (props) => {
  const { showResult, clearResult } = props;

  const calculate = (values) => {
    const { price, fee, period, rate } = values;
    const loan = price - fee;
    const payment = loan * (rate / 1200 + (rate / 1200) / ((1 + rate / 1200) ** period - 1));
    const salary = 5 * (payment / 3);
    const overpayment = payment * period - price + fee;
    console.log(`price: ${typeof price}`);
    console.log(`fee: ${typeof fee}`);
    console.log(`period: ${typeof period}`);
    console.log(`rate: ${typeof rate}`);

    return { loan, payment, salary, overpayment };
  }

  const submitForm = (values) => {
    showResult(calculate(values));
  }

  const getCurrentValues = (values) => {
    const valuesToCalculate = { ...values };
    Object.keys(valuesToCalculate).forEach((item) => {
      valuesToCalculate[item] = +valuesToCalculate[item];
    });
    return valuesToCalculate;
  }

  return (
    <>
      <Formik
        setFieldValue
        validateOnChange
        initialValues={{ price: '', fee: '', period: '', rate: '' }}
        validationSchema={Yup.object({
          price: Yup.string().required('Это поле не должно быть пустым'),
          period: Yup.string().required('Это поле не должно быть пустым'),
          fee: Yup.string().required('Это поле не должно быть пустым'),
          rate: Yup.string().required('Это поле не должно быть пустым')
        })}
        onSubmit={submitForm}
      >
        {({ handleChange, setFieldValue, values }) => (
          <Form className='form'>
            <Input
              name='price'
              id='price'
              label='Стоимость недвижимости'
              onKeyUp={evt => {
                handleChange(evt)
                setFieldValue('price', evt.target.value);
                submitForm(getCurrentValues(values));
              }} />
            <Input
              name='fee'
              id='fee'
              label='Первоначальный взнос'
              onKeyUp={evt => {
                handleChange(evt)
                setFieldValue('fee', evt.target.value.toLocaleString('ru-RU', { maximumFractionDigits: 0 }))
                submitForm(getCurrentValues(values));
              }} />
            <ul className='form__percent'>
              <li className='form__percent-rate'>10%</li>
              <li className='form__percent-rate'>15%</li>
              <li className='form__percent-rate'>20%</li>
              <li className='form__percent-rate'>25%</li>
              <li className='form__percent-rate'>30%</li>
            </ul>
            <Input
              name='period'
              id='period'
              label='Срок кредита'
              onKeyUp={evt => {
                handleChange(evt)
                setFieldValue('period', evt.target.value.toLocaleString('ru-RU', { maximumFractionDigits: 0 }))
                submitForm(getCurrentValues(values));
              }} />
            <Input
              name='rate'
              id='rate'
              label='Процентная ставка'
              onKeyUp={evt => {
                handleChange(evt)
                setFieldValue('rate', evt.target.value.toLocaleString('ru-RU', { maximumFractionDigits: 0 }))
                submitForm(getCurrentValues(values));
              }} />
            <button type='submit' className='form__button form__button_type_save'>
              Save
           </button>
            <button
              type='reset'
              className='form__button form__button_type_clear'
              onClick={clearResult}>
              Clear
           </button>
          </Form>
        )}
      </Formik>
    </>
  )
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
}

Input.defaultProps = {
  label: '',
  id: '',
}

Calc.propTypes = {
  showResult: PropTypes.func,
  clearResult: PropTypes.func
}

Calc.defaultProps = {
  showResult: () => { },
  clearResult: () => { }
}

export default Calc;