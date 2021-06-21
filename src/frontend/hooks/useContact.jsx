/* eslint-disable */
import { useState } from 'react';

export default function useContact() {
  const contactStatus = {
    IDLE: 'idle',
    SUCCESS: 'success',
    FAILURE: 'failure',
  };

  // State: contact
  const [contact, setContact] = useState(contactStatus.IDLE);

  // check
  const isIdle = () => {
    return contact === contactStatus.IDLE;
  };

  const isSuccess = () => {
    return contact === contactStatus.SUCCESS;
  };

  const isFailure = () => {
    return contact === contactStatus.FAILURE;
  };

  // switch
  const switchToIdle = () => {
    setContact(contactStatus.IDLE);
  };

  const switchToSuccess = () => {
    setContact(contactStatus.SUCCESS);
  };

  const switchToFailure = () => {
    setContact(contactStatus.FAILURE);
  };

  return { contact, isIdle, isSuccess, isFailure, switchToIdle, switchToSuccess, switchToFailure };
}
