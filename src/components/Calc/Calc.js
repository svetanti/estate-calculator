import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { calculate, getCurrentValues } from '../../utils/utils';
import Input from '../Input/Input';

const Calc = (props) => {
  const { initialValues, showResult, clearResult } = props;

  const submitForm = (values) => {
    showResult(calculate(getCurrentValues(values)));
    localStorage.setItem('initialValues', JSON.stringify(getCurrentValues(values)));
    localStorage.setItem('result', JSON.stringify(calculate(getCurrentValues(values))));
  }

  return (
    <>
      <Formik
        setFieldValue
        validateOnChange
        initialValues={initialValues}
        enableReinitialize
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
                handleChange(evt);
                const price = evt.target.value;
                setFieldValue('price', price);
                submitForm(getCurrentValues(values));
              }} />
            <Input
              name='fee'
              id='fee'
              label='Первоначальный взнос'
              onKeyUp={evt => {
                handleChange(evt);
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
              onKeyUp={evt => {
                handleChange(evt);
                setFieldValue('period', evt.target.value)
                submitForm(getCurrentValues(values));
              }} />
            <Input
              name='rate'
              id='rate'
              label='Процентная ставка'
              onKeyUp={evt => {
                handleChange(evt);
                setFieldValue('rate', evt.target.value)
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


Calc.propTypes = {
  initialValues: PropTypes.shape({
    price: PropTypes.string,
    fee: PropTypes.string,
    period: PropTypes.string,
    rate: PropTypes.string
  }),
  showResult: PropTypes.func,
  clearResult: PropTypes.func
}

Calc.defaultProps = {
  initialValues: { price: '', fee: '', period: '', rate: '' },
  showResult: () => { },
  clearResult: () => { }
}

export default Calc;