import { useForm } from 'react-hook-form';
import SpinnerCode from '../shared/spinnerComponent';

function UserDetailView({
  submitHandler,
  profile,
  isLoadingItem,
  loadingError,
  isUpdatingItem,
  updatingError,
}) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  if (profile) {
    setValue('firstName', profile.firstName);
    setValue('middleName', profile.middleName);
    setValue('lastName', profile.lastName);
  }

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

  return (
    <div className="dashboard-content">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h4 className="mb-0">Profile Detail</h4>
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
                    Details
                  </a>
                </div>
              </nav>
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="tab1"
                  role="tabpanel"
                >
                  {isLoadingItem ? (
                    <div>Loading...</div>
                  ) : loadingError ? (
                    <div>{loadingError}</div>
                  ) : (
                    <form onSubmit={handleSubmit(submitHandler)}>
                      <div className="match-height">
                        <FormGroupRowLabel name="name" title="FirstName" />
                        <FormGroupRowInput>
                          <input
                            placeholder=""
                            className="form-control"
                            type="text"
                            {...register('firstName', {
                              required: 'Please enter a first name',
                            })}
                          />
                          {errors.firstName && (
                            <p className="validation-message">
                              {errors.firstName.message}
                            </p>
                          )}
                        </FormGroupRowInput>
                        {/* <div className="form-group row">
                          <div className="col-md-3">
                            <div className="pt-2">
                              <input
                                placeholder=""
                                className="form-control"
                                type="text"
                                {...register('firstName', {
                                  required: 'Please enter a first name',
                                })}
                              />
                              {errors.firstName && (
                                <p className="validation-message">
                                  {errors.firstName.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div> */}
                        <div className="form-group row">
                          <label
                            htmlFor="middleName"
                            className="form-label col-form-label col-sm-12 font-semibold"
                          >
                            Middle Name
                          </label>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-3">
                            <div className="pt-2">
                              <input
                                placeholder=""
                                className="form-control"
                                type="text"
                                {...register('middleName')}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="middleName"
                            className="form-label col-form-label col-sm-12 font-semibold"
                          >
                            Last Name
                          </label>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-3">
                            <div className="pt-2">
                              <input
                                placeholder=""
                                className="form-control"
                                type="text"
                                {...register('lastName', {
                                  required: 'Please enter a last name',
                                })}
                              />
                              {errors.lastName && (
                                <p className="validation-message">
                                  {errors.lastName.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="form-group row mb-5">
                          <div className="col-sm-12">
                            <button
                              className="button button-brand float-left"
                              type="submit"
                            >
                              {isUpdatingItem ? (
                                <SpinnerCode />
                              ) : (
                                'Update Profile'
                              )}
                            </button>
                          </div>
                          {updatingError && (
                            <div className="alert alert-danger mt-3 mb-0">
                              {updatingError}
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailView;
