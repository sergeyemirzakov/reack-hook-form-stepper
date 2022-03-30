import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Step3 = () => {
  const navigate = useNavigate();
  const { setProgressValue, userData, resetFormData } = React.useContext(AppContext);

  let lastFourNumbers = userData.cardNumber ? userData.cardNumber.slice(-4) : '';

  const onPrevClickHandler = () => {
    navigate(-1);
    setProgressValue?.(60);
  };

  const resetForm = () => {
    navigate('/');
    setProgressValue?.(30);
    resetFormData?.();
  };

  React.useEffect(() => {
    setProgressValue?.(90);
  }, [setProgressValue]);

  return (
    <>
      <h3>Please, check all your details before sending.</h3>
      <div className="result__item">
        <div>Name:</div>
        <div>{userData.firstName}</div>
      </div>
      <div className="result__item">
        <div>Email:</div>
        <div>{userData.email}</div>
      </div>
      <div className="result__item">
        <div>Phone:</div>
        <div>{userData.phone}</div>
      </div>
      <div className="result__item">
        <div>Card Name:</div>
        <div>{userData.cardName}</div>
      </div>
      <div className="result__item">
        <div>Card Number:</div>
        <div>
          {'**** **** **** '} {lastFourNumbers}
        </div>
      </div>
      <div className="result__item">
        <div>Card Expiry Time:</div>
        <div>{userData.cardExpiryTime}</div>
      </div>
      <div onClick={resetForm} className="reset__form">
        <div>Reset Form</div>
      </div>
      <div className="form__item">
        <div className="btn__items">
          <button
            onClick={onPrevClickHandler}
            className="form__btn-submit form__btn-prev"
            type="submit">
            Prev Step
          </button>
          <button className="form__btn-submit form__btn-next" type="submit">
            Send
          </button>
        </div>
      </div>
    </>
  );
};
