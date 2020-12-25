import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const Input = ({ id, label, ...props }) => {
  const [field, meta] = useField(props);
  return (<>
    <label htmlFor={id} className='form__label'>{label}</label>
    <input className='form__filed' {...field} {...props} />
    {meta.touched && meta.error ? (
      <div className='form__error'>{meta.error}</div>
    ) : null}
  </>);
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  id: '',
};

export default Input;
