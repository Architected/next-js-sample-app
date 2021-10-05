import React from 'react';
import SubmitButton from '../../../components/shared/submitButton';
import Image from 'next/image';
import HomePageImage from '../../public/home.png';
import { useForm } from 'react-hook-form';

function EmailValidate({
  submitHandler,
  isLoading,
  errorMessage,
  warningMessage,
  resendCode,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="auth">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="auth-box">
              <h2>Verify email</h2>
              <form onSubmit={handleSubmit(submitHandler)}>
                <p>
                  A verification message has been to your inbox. Please enter
                  the verification code below.
                </p>
                <div className="mb-3">
                  <label
                    htmlFor="code"
                    className="form-label font-semibold mb-1"
                  >
                    Verification Code
                  </label>
                  <input
                    placeholder=""
                    className="form-control"
                    type="text"
                    {...register('code', {
                      required: 'Please enter your verification code',
                      pattern: {
                        message: 'Invalid verification code',
                      },
                    })}
                  />
                  {errors.code && (
                    <p className="validation-message">{errors.code.message}</p>
                  )}
                </div>
                <SubmitButton
                  buttonText="Verify"
                  isLoading={isLoading}
                  warningMessage={warningMessage}
                  errorMessage={errorMessage}
                />
              </form>
              <div className="text-center">
                <p className="size12 text-second">
                  <a className="text-brand" onClick={resendCode}>
                    Resend Verification Code
                  </a>
                </p>
              </div>
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

export default EmailValidate;
