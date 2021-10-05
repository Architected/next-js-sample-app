import React, { useRef } from 'react';
import SubmitButton from '../shared/submitButton';
import { useForm } from 'react-hook-form';

function PasswordChangePerform({
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

  const FormGroupRowLabel = ({ name, title }) => {
    return (
      <div className="form-group row">
        <label
          htmlFor={name}
          className="form-label col-form-label col-sm-12 font-semibold"
        >
          {title}
        </label>
      </div>
    );
  };

  const FormGroupRowInput = ({ children }) => {
    return (
      <div className="form-group row">
        <div className="col-md-3">
          <div className="pt-2">{children}</div>
        </div>
      </div>
    );
  };

  const newPassword = useRef({});
  newPassword.current = watch('newPassword', '');

  return (
    <div className="dashboard-content">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h4 className="mb-0">Change Password</h4>
          </div>
          <div></div>
        </div>
        <div className="box">
          <div className="box-content pt-2">
            <div className="db-tab">
              <form onSubmit={handleSubmit(submitHandler)}>
                <p>Please provide your new password.</p>
                <div className="mb-3">
                  <FormGroupRowLabel name="newPassword" title="New Password" />
                  <FormGroupRowInput>
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
                  </FormGroupRowInput>
                </div>
                <div className="mb-3">
                  <FormGroupRowLabel
                    name="confirmPassword"
                    title="Confirm Password"
                  />
                  <FormGroupRowInput>
                    {' '}
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
                  </FormGroupRowInput>
                </div>
                <div className="form-group row mb-5">
                  <div className="col-sm-3">
                    <SubmitButton
                      buttonText="Submit"
                      isLoading={isLoading}
                      warningMessage={warningMessage}
                      errorMessage={errorMessage}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChangePerform;
