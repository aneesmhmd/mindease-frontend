import React from 'react';
import jwtDecode from 'jwt-decode';

const isAuth = () => {
  const localResponse = localStorage.getItem('authToken');
  console.log(localResponse, 'This is the local response');
  if (localResponse) {
    console.log('Is auth');
    try {
      const decoded = jwtDecode(localResponse);
      console.log(decoded, 'this is the decoded code ');
      return Promise.resolve(decoded);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.resolve(null);
  }
};

export { isAuth };
