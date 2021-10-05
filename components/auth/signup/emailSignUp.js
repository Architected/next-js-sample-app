import React from 'react';
import SubmitButton from '../../../components/shared/submitButton';
import Image from 'next/image';
import HomePageImage from '../../../public/home.png';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

function EmailSignUp({
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
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit(submitHandler)}>
                <p>Please enter your details .</p>
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
                    className="form-control"
                    type="password"
                    {...register('password', {
                      required: 'Please enter your new password',
                      minLength: {
                        value: 9,
                        message: 'Password must have at least 9 characters',
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="validation-message">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <SubmitButton
                  buttonText="Sign up"
                  isLoading={isLoading}
                  warningMessage={warningMessage}
                  errorMessage={errorMessage}
                />
              </form>
              <div className="text-center">
                <p className="size12 text-second">
                  Have an account?&nbsp;
                  <Link href="/auth/signin/email" passHref>
                    <a className="text-brand">Sign In</a>
                  </Link>
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

export default EmailSignUp;
