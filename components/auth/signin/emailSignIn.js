import React from 'react';
import SubmitButton from '../../../components/shared/submitButton';
import Image from 'next/image';
import HomePageImage from '../../../public/home.png';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { architectedConfig } from '../../../architectedConfig';

function EmailSignIn({
  submitHandler,
  isLoading,
  errorMessage,
  warningMessage,
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
              <h2>Sign In</h2>
              <form onSubmit={handleSubmit(submitHandler)}>
                <p>Please enter your email and password to sign in.</p>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label font-semibold mb-1"
                  >
                    Email
                  </label>
                  <input
                    placeholder=""
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    {...register('email', {
                      required: 'Please enter your email',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="validation-message">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label font-semibold mb-1"
                  >
                    Password
                  </label>
                  <input
                    placeholder=""
                    autoComplete="off"
                    className="form-control"
                    type="password"
                    {...register('password', {
                      required: 'Please enter your password',
                    })}
                  />
                  {errors.password && (
                    <p className="validation-message">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <SubmitButton
                  buttonText="Sign in"
                  isLoading={isLoading}
                  warningMessage={warningMessage}
                  errorMessage={errorMessage}
                />
                <div className="mb-4">
                  <div className="text-center">
                    <Link href="/auth/password-reset/start" passHref>
                      <a className="text-brand">Forgotten Password</a>
                    </Link>
                  </div>
                </div>
              </form>
              {architectedConfig.siteMode == 'app' && (
                <div className="text-center">
                  <p className="size12 text-second">
                    Dont have an account?&nbsp;
                    <Link href="/auth/signup/email" passHref>
                      <a className="text-brand">Sign Up</a>
                    </Link>
                  </p>
                </div>
              )}
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

export default EmailSignIn;
