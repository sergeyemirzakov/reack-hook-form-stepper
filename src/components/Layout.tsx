import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProgressBar } from './ProgressBar/ProgressBar';

export const Layout = () => {
  return (
    <>
      <div className="header__text">
        <h1>Order Form</h1>
        <p>
          Please fill in all the fields. This helps us to deliver your order correctly.
        </p>
      </div>
      <ProgressBar />
      <Outlet />
    </>
  );
};
