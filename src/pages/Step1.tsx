import React from 'react';
import { useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { AppContext } from '../context/AppContext';
import { useForm, Controller } from 'react-hook-form';
import { validateNumber } from '../helpers/validateHeplers';

const mailValidateRegEx =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const Step1: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { setProgressValue, setFormData, userData } = React.useContext(AppContext);

  const onSubmit = (data: any) => {
    navigate('/step2');
    setProgressValue?.(60);
    setFormData?.(data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__item">
        <label className="form__label" htmlFor="">
          First Name:
        </label>
        <input
          {...register('firstName', {
            required: true,
            pattern: {
              value: /^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/gi,
              message: 'This field cannot contain digits',
            },
          })}
          defaultValue={userData.firstName || ''}
          className="form__input"
          type="text"
          placeholder="First Name"
        />
        {errors.firstName && (
          <div className="form__input-error">This field is required</div>
        )}
        <div className="form__input-error">{errors.firstName?.message}</div>
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="">
          Email:
        </label>
        <input
          {...register('email', { pattern: mailValidateRegEx, required: true })}
          defaultValue={userData.email || ''}
          className="form__input"
          type="text"
          placeholder="Email"
        />
        {errors.email && <div className="form__input-error">Invalid email</div>}
      </div>
      <div className="form__item">
        <label className="form__label" htmlFor="">
          Phone:
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{
            validate: {
              positive: (v) => validateNumber(v) === 17,
            },
          }}
          defaultValue={userData.phone || ''}
          render={({ field }) => (
            <NumberFormat
              className="form__input"
              format="+1 (###) ###-####"
              mask="_"
              allowEmptyFormatting
              placeholder="Phone"
              {...field}
            />
          )}
        />
        {errors.phone && <div className="form__input-error">This field is required</div>}
      </div>
      <div className="form__item">
        <button className="form__btn-submit" type="submit">
          Next Step
        </button>
      </div>
    </form>
  );
};
