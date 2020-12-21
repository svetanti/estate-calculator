import React from 'react';
import { Formik, Form, input, ErrorMessage } from 'formik';

const Calc = () => (
  <>
    <Formik
      initialValues={{ price: '', period: '', fee: '', rate: '' }}
      validate={values => {
        const errors = {};
        if (!values.price) {
          errors.price = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.price)
        ) {
          errors.price = 'Invalid price';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='form'>
          <label htmlFor='price' className='form__label'>Стоимость недвижимости
            <input type='text' id='price' name='price' className='form__filed' />
            <ErrorMessage name='price' component='div' />
          </label>
          <label htmlFor='fee' className='form__label'>Первоначальный взнос
            <input type='text' id='fee' name='fee' className='form__filed' />
          </label>
          <ErrorMessage name='fee' component='div' />
          <label htmlFor='period' className='form__label'>Срок кредита
            <input type='text' id='period' name='period' className='form__filed' />
          </label>
          <ErrorMessage name='period' component='div' />
          <label htmlFor='rate' className='form__label'>Процентная ставка
            <input type='text' id='rate' name='rate' className='form__filed' />
          </label>
          <ErrorMessage name='rate' component='div' />
          <button type='submit' disabled={isSubmitting} className='form__button form__button_type_save'>
            Save
           </button>
          <button type='submit' disabled={isSubmitting} className='form__button form__button_type_clear'>
            Clear
           </button>
        </Form>
      )}
    </Formik>
  </>
);

export default Calc;