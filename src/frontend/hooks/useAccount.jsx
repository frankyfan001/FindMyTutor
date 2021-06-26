/* eslint-disable */
import { useState } from 'react';
import {api} from '../APIs/api';

export default function useAccount() {
  // State: account
  const [account, setAccount] = useState(null);

  // getters
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
    // const res = await fetch('http://localhost:5000/accounts/register', {
    //   method: 'POST',
    //   headers: {'Content-type': 'application/json'},
    //   body: JSON.stringify(input)
    // });
    // const output = await res.json();

    const output = {
      status: "SUCCESS",
      data: {
        username: "jerryliu",
        password: "123456",
        type: "tutor",
        fname: "Jerry",
        lname: "Liu",
        avatar: null,
      },
      err: null,
    };

    // If register succeeded, login directly.
    if (output.status === "SUCCESS") {
      setAccount(output.data);
    }
    return output;
  };

  const login = async(input) => {
    // const res = await fetch('http://localhost:5000/accounts/login', {
    //   method: 'POST',
    //   headers: {'Content-type': 'application/json'},
    //   body: JSON.stringify(input)
    // });
    // const output = await res.json();

    const output = {
      status: "SUCCESS",
      data: {
        username: "frankyfan",
        password: "123456",
        type: "tutor",
        fname: "Franky",
        lname: "Fan",
        avatar: "https://www.zhifure.com/upload/images/2018/7/16143327546.jpg",
      },
      err: null,
    };

    if (output.status === "SUCCESS") {
      setAccount(output.data);
    }
    return output;
  };

  const logout = () => {
    setAccount(null);
  };

  return { account, isLogin, isTutor, isStudent, register, login, logout};
}
