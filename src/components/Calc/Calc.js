import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { id } = props;
  return (
    <>
      <label htmlFor={id} className='form__label' type='number'>{label}</label>
      <input className='form__filed' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='form__error'>{meta.error}</div>
      ) : null}
    </>
  );
};

const Calc = (props) => {
  const { showResult } = props;

  const calculate = (values) => {
    const { price, fee, period, rate } = values;
    const loan = price - fee;
    const payment = loan * (rate / 1200 + (rate / 1200) / ((1 + rate / 1200) ** period - 1));
    const salary = 5 * (payment / 3);
    const overpayment = payment * period - price + fee;
    return { loan, payment, salary, overpayment };
  }

  const submitForm = (values) => {
    showResult(calculate(values));
  }

  const getCurrentValues = (values) => {
    const valuesToCalculate = { ...values };
    Object.keys(valuesToCalculate).forEach((item) => {
      if (valuesToCalculate[item] === 0) {
        valuesToCalculate[item] = 0;
      }
    });
    return valuesToCalculate;
  }

  return (
    <>
      <Formik
        setFieldValue
        validateOnChange
        initialValues={{ price: 0, fee: 0, period: 0, rate: 0 }}
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
              onChange={evt => {
                handleChange(evt)
                setFieldValue('price', evt.target.value)
                submitForm(getCurrentValues(values));
              }} />
            <Input
              name='fee'
              id='fee'
              label='Первоначальный взнос'
              onChange={evt => {
                handleChange(evt)
                setFieldValue('fee', evt.target.value)
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
              onChange={evt => {
                handleChange(evt)
                setFieldValue('period', evt.target.value)
                submitForm(getCurrentValues(values));
              }} />
            <Input
              name='rate'
              id='rate'
              label='Процентная ставка'
              onChange={evt => {
                handleChange(evt)
                setFieldValue('rate', evt.target.value)
                submitForm(getCurrentValues(values));
              }} />
            <button type='submit' className='form__button form__button_type_save'>
              Save
           </button>
            <button type='reset' className='form__button form__button_type_clear'>
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
  label: 0,
  id: 0,
}

Calc.propTypes = {
  showResult: PropTypes.func
}

Calc.defaultProps = {
  showResult: () => { }
}

export default Calc;