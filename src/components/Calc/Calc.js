import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getCurrentValues } from '../../utils/utils';
import Input from '../Input/Input';
import FormContext from '../../contexts/FormContext';

const Calc = () => {
  const { initialValues,
    feePercents,
    saveForm,
    clearForm,
    submitForm } = useContext(FormContext);

  const [percentage, setPercentage] = useState(0);

  const handlePercentageChange = (percent) => {
    if (percentage !== percent) {
      const newPercentage = percent;
      setPercentage(newPercentage);
      return
    }
    setPercentage(0);
  }

  const handleRecount = (evt, values, setFieldValue) => {
    const percent = +evt.target.id;
    const { price, fee } = values;
    if (price) {
      setFieldValue('fee', Math.round(+price * percent / 100).toString());

    }
    else if (!price && fee) {
      setFieldValue('price', Math.round(+fee / percent * 100).toString());
    }
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
                if (percentage !== 0) {
                  setFieldValue('fee', Math.round(+evt.target.value * percentage / 100).toString());
                }
                submitForm(getCurrentValues(values));
              }} />
            <Input
              name='fee'
              id='fee'
              label='Первоначальный взнос'
              onKeyUp={evt => {
                handleChange(evt);
                if (percentage !== 0) {
                  setFieldValue('price', Math.round(+evt.target.value / percentage * 100).toString());
                }
                console.log(values);
                submitForm(getCurrentValues(values));
              }} />
            <div className='form__percent'>
              {feePercents.map((item) =>
              (<button
                key={item}
                type='button'
                className={`${percentage === item && 'form__percent-rate_active'} form__percent-rate`}
                id={item}
                onClick={(evt) => {
                  handlePercentageChange(item);
                  handleRecount(evt, values, setFieldValue);
                }}>
                {`${item} \u0025`}</button>
              ))}
            </div>
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
            <button
              type='button'
              className='form__button form__button_type_save'
              onClick={() => {
                saveForm(values);
              }}>
              Save
           </button>
            <button
              type='reset'
              className='form__button form__button_type_clear'
              onClick={clearForm}>
              Clear
           </button>
          </Form>
        )}
      </Formik>
    </>
  )
};

export default Calc;