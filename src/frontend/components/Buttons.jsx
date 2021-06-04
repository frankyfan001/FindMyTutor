import React from 'react';
import '@material/react-button/dist/button.min.css';

// Button base component
// component design based on https://material.io/components/buttons#anatomy
const ButtonBase = ({
  text, type, href, buttonStyle, icon,
}) => (
  <div className="mdc-touch-target-wrapper">
    <button className={`mdc-button mdc-button--${buttonStyle}`} type={type} href={href}>
      <span className="mdc-button__ripple" />
      {icon}
      <span className="mdc-button__label">{text}</span>
      <span className="mdc-button__touch" />
    </button>
  </div>
);

export const OutlinedButton = ({
  text, type, href, icon,
}) => (
  <ButtonBase buttonStyle="outlined" text={text} type={type} href={href} icon={icon} />
);

const ContainedButton = ({
  text, type, href, icon,
}) => (
  <ButtonBase buttonStyle="raised" text={text} type={type} href={href} icon={icon} />
);

export const IconBase = ({ iconType }) => (
  <i className="material-icons mdc-button__icon" aria-hidden="true">{iconType}</i>
);

export const LoginButton = ({ href }) => (
  <ContainedButton text="Login" type="submit" href={href} icon={<IconBase iconType="login" />} />
);

export const RegisterButton = ({ href }) => (
  <ContainedButton text="Register" type="submit" href={href} icon={<IconBase iconType="login" />} />
);
