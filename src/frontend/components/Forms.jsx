/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { MDCTextField } from '@material/textfield';

// Text Field base component
// component design based on https://material.io/components/text-fields#anatomy
export const TextFieldBase = ({ label, fieldStyle, helperText }) => {
  const [textValue, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  useEffect(() => {
    const mdcTextField = new MDCTextField(document.querySelector('.mdc-text-field'));
    return (mdcTextField.destroy());
  }, []);

  return (
    <div>
      <label className={`mdc-text-field mdc-text-field--${fieldStyle}`}>
        <span className="mdc-text-field__ripple" />
        <span className="mdc-floating-label" id="my-label-id">{label}</span>
        <input
          className="mdc-text-field__input"
          type="text"
          aria-labelledby="my-label-id"
          aria-controls="my-helper-id"
          aria-describedby="my-helper-id"
          onChange={handleChange}
          value={textValue}
        />
        <span className="mdc-line-ripple" />
      </label>
      <div className="mdc-text-field-helper-line">
        <div className="mdc-text-field-helper-text" id="my-helper-id" aria-hidden="true">{helperText}</div>
      </div>
    </div>
  );
};

export const FilledTextField = ({ label, helperText }) => (
  <TextFieldBase label={label} helperText={helperText} fieldStyle="filled" />
);

export const FormBase = () => (
  <div className="mdc-form-field">
    <FilledTextField label="password" helperText="type password" />
  </div>
);
