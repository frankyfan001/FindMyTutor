/* eslint-disable */
import { useEffect, useState } from 'react';
import api from '../APIs/api';

export default function useAccount() {
  // State: account
  const [account, setAccount] = useState(null);
  const [favorites, setFavorites] = useState([]);

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
      // store user in localStorage
      sessionStorage.setItem('user', JSON.stringify(output.result));
      return output.result;
    } else {
      throw new Error(output.error);
    }
  };

  const logout = () => {
    setAccount(null);
    sessionStorage.removeItem("user");
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

  // Get favorite posts
  const getFavoritePosts = async () => {
    const res = await fetch(api.baseURL + `/accounts/${account._id}/favorites`, {
      method: 'GET',
    });
    const output = await res.json();

    if (output.success) {
      setFavorites(output.result);
      return output.result;
    } else {
      throw new Error(output.error);
    }
  }

  // Add favorite post
  const addFavoritesPost = async (postId) => {
    const res = await fetch(api.baseURL + `/accounts/${account._id}/favorites/${postId}`, {
      method: 'PUT',
    });
    const output = await res.json();

    if (output.success) {
      getFavoritePosts().then((res)=> setFavorites(res));
      return output.result;
    } else {
      throw new Error(output.error);
    }
  }

  // Delete favorite post
  const deleteFavoritesPost = async (postId) => {
    const res = await fetch(api.baseURL + `/accounts/${account._id}/favorites/${postId}`, {
      method: 'DELETE',
    });
    const output = await res.json();

    if (output.success) {
      getFavoritePosts().then((res)=> setFavorites(res));
      return output.result;
    } else {
      throw new Error(output.error);
    }
  }

  const isFavoritePost = (postId) => {
    return favorites.filter((fav) => fav._id === postId).length !== 0;
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setAccount(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    if (account) {
      getFavoritePosts().then((res)=> setFavorites(res));
    }
  }, [account]);

  return {
    account, isLogin, isTutor, isStudent, register, login, logout, updateAccount,
    favorites, addFavoritesPost, deleteFavoritesPost, isFavoritePost
  };
}
