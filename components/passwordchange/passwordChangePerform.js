import React, { useRef } from 'react';
import SubmitButton from '../shared/submitButton';
import { useForm } from 'react-hook-form';

function PasswordChangePerform({
  submitHandler,
  isLoading,
  errorMessage,
  warningMessage,
  successMessage,
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
    <div className="dashboard-content">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h4 className="mb-0">Account Management</h4>
          </div>
          <div></div>
        </div>
        <div className="box">
          <div className="box-content pt-2">
            <div className="db-tab">
              <nav>
                <div className="nav" role="tablist">
                  <a
                    className="active"
                    data-toggle="tab"
                    href="#tab1"
                    role="tab"
                  >
                    Change Password
                  </a>
                </div>
              </nav>
              <div className="tab-content w-25 w-md-50 w-sm-75">
                <div
                  className="tab-pane fade show active"
                  id="tab1"
                  role="tabpanel"
                >
                  <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="mb-3">
                      <label
                        htmlFor="currentPassword"
                        className="form-label font-semibold mb-1"
                      >
                        Current Password
                      </label>
                      <input
                        placeholder=""
                        className="form-control"
                        type="password"
                        autoComplete="off"
                        {...register('currentPassword', {
                          required: 'Please enter your current password',
                        })}
                      />
                      {errors.currentPassword && (
                        <p className="validation-message">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
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
                        autoComplete="off"
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
                        autoComplete="off"
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
                      successMessage={successMessage}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordChangePerform;
