import React from 'react';
import SubmitButton from '../../../components/shared/submitButton';
import Image from 'next/image';
import HomePageImage from '../../../public/home.png';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

function PasswordResetStart({
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
              <h2>Forgotten Password</h2>
              <form onSubmit={handleSubmit(submitHandler)}>
                <p>
                  Please provide your email address to start the password reset
                  process.
                </p>
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
                <SubmitButton
                  buttonText="Submit"
                  isLoading={isLoading}
                  warningMessage={warningMessage}
                  errorMessage={errorMessage}
                />
                <div className="mb-4">
                  <div className="text-center">
                    <Link href="/" passHref>
                      <a className="text-brand">Cancel</a>
                    </Link>
                  </div>
                </div>
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

export default PasswordResetStart;
