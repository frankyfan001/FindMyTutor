/* eslint-disable */
import { useState } from 'react';

export default function useAccount() {
  // State: account
  const [account, setAccount] = useState(null);

  const isLogin = () => {
    return account !== null;
  };

  const isTutor = () => {
    return account.type === 'tutor';
  };

  const isStudent = () => {
    return account.type === 'student';
  };

  // setters
  const register = async (input) => {
    const res = await fetch('http://localhost:5000/accounts/register', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(input)
    });
    const output = await res.json();

    // If register succeeded, login directly.
    if (output.success) {
      setAccount(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  const login = async (input) => {
    const res = await fetch('http://localhost:5000/accounts/login', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(input)
    });
    const output = await res.json();

    if (output.success) {
      setAccount(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  const logout = () => {
    setAccount(null);
  };

  return { account, isLogin, isTutor, isStudent, register, login, logout};
}
