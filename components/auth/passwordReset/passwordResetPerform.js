import React, { useRef } from 'react';
import SubmitButton from '../../../components/shared/submitButton';
import Image from 'next/image';
import HomePageImage from '../../../public/home.png';
import { useForm } from 'react-hook-form';

function PasswordResetValidate({
  submitHandler,
  isLoading,
  errorMessage,
  warningMessage,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const newPassword = useRef({});
  newPassword.current = watch('newPassword', '');

  return (
    <div className="auth">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="auth-box">
              <h2>Change Password</h2>
              <form onSubmit={handleSubmit(submitHandler)}>
                <p>Please provide your new password.</p>
                <div className="mb-3">
                  <label
                    htmlFor="newPassword"
                    className="form-label font-semibold mb-1"
                  >
                    New Password
                  </label>
                  <input
                    placeholder=""
                    className="form-control"
                    type="password"
                    {...register('newPassword', {
                      required: 'Please enter your new password',
                      minLength: {
                        value: 9,
                        message: 'Password must have at least 9 characters',
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <p className="validation-message">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label font-semibold mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    placeholder=""
                    className="form-control"
                    type="password"
                    {...register('confirmPassword', {
                      validate: (value) =>
                        value === newPassword.current ||
                        'The passwords do not match',
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="validation-message">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <SubmitButton
                  buttonText="Submit"
                  isLoading={isLoading}
                  warningMessage={warningMessage}
                  errorMessage={errorMessage}
                />
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="img-intro">
              <Image src={HomePageImage} alt="An image of notes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetValidate;
