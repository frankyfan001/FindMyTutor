/* eslint-disable */
import {useEffect, useState} from 'react';
import api from '../APIs/api';

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
    const res = await fetch(api.baseURL + '/accounts/register', {
      method: 'POST',
      headers: api.headers,
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
    const res = await fetch(api.baseURL + '/accounts/login', {
      method: 'POST',
      headers: api.headers,
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

  // Update a account.
  const updateAccount = async (updatedInfo) => {
    const res = await fetch(api.baseURL + `/accounts/${account._id}`, {
      method: 'PUT',
      headers: api.headers,
      body: JSON.stringify(updatedInfo)
    });
    const output = await res.json();

    if (output.success) {
      setAccount(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  return { account, isLogin, isTutor, isStudent, register, login, logout, updateAccount, setAccount};
}
