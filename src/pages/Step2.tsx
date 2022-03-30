import React from 'react';
import { useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { AppContext } from '../context/AppContext';
import { useForm, Controller } from 'react-hook-form';
import { validateNumber, cardExpiryValidation } from '../helpers/validateHeplers';

export const Step2 = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setProgressValue, setFormData, userData } = React.useContext(AppContext);

  const onSubmit = (data: any) => {
    navigate('/step3');
    setProgressValue?.(90);
    setFormData?.(data);
  };

  const onPrevClickHandler = () => {
    navigate('/');
    setProgressValue?.(30);
  };

  React.useEffect(() => {
    setProgressValue?.(60);
  }, [setProgressValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form__item">
        <label className="form__label" htmlFor="">
          Card Name:
        </label>
        <input
          {...register('cardName', {
            required: true,
            pattern: {
              value: /^[A-Za-z]+\s[A-Za-z]+$/gi,
              message: 'This field cannot contain digits',
            },
          })}
          defaultValue={userData.cardName || ''}
          className="form__input"
          type="text"
          placeholder="Card Name"
        />
        {errors.cardName && (
          <div className="form__input-error">This field is required</div>
        )}
        <div className="form__input-error">{errors.cardName?.message}</div>
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="">
          Card Number:
        </label>
        <Controller
          name="cardNumber"
          control={control}
          defaultValue={userData.cardNumber || ''}
          rules={{
            validate: {
              positive: (v) => validateNumber(v) === 19,
            },
          }}
          render={({ field }) => (
            <NumberFormat
              className="form__input"
              format="#### #### #### ####"
              mask="_"
              allowEmptyFormatting
              placeholder="Card Number"
              {...field}
            />
          )}
        />
        {errors.cardNumber && (
          <div className="form__input-error">This field is required</div>
        )}
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="">
          Card Expiry Time:
        </label>
        <Controller
          name="cardExpiryTime"
          control={control}
          defaultValue={userData.cardExpiryTime || ''}
          rules={{ required: true, maxLength: 5 }}
          render={({ field }) => (
            <NumberFormat
              className="form__input"
              format={cardExpiryValidation}
              placeholder="MM/YY"
              mask={['M', 'M', 'Y', 'Y']}
              {...field}
            />
          )}
        />
        {errors.cardExpiryTime && (
          <div className="form__input-error">This field is required</div>
        )}
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="">
          CVV:
        </label>
        <input
          {...register('cvv', {
            required: true,
            pattern: { value: /^\d+$/, message: 'This field can contain only digits' },
            maxLength: 3,
          })}
          defaultValue={userData.cvv || ''}
          className="form__input"
          type="text"
          placeholder="CVV"
          maxLength={3}
        />
        {errors.cvv && <div className="form__input-error">This field is required</div>}
        <div className="form__input-error">{errors.cvv?.message}</div>
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
            Next Step
          </button>
        </div>
      </div>
    </form>
  );
};
