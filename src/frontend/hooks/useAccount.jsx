/* eslint-disable */
import { useState } from 'react';

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
  const register = async(fName, lName, email, password) => {
    const res = await fetch('http://localhost:9000/accounts', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        type: "tutor",
        fName: fName,
        lName: lName,
        avatar: null})
    });
    const data = await res.json();
    setAccount(data);
  };

  const login = async(email, password) => {
    console.log("login");
    const res = await fetch('http://localhost:9000/accounts/' + 1, {
      method: 'GET'
    });
    const data = await res.json();
    setAccount(data);
  };

  const logout = () => {
    setAccount(null);
  };

  return { account, isLogin, isTutor, isStudent, register, login, logout};
}
