import React from 'react';
import PropTypes from 'prop-types';
const SubmitButton = ({
  buttonText,
  isLoading,
  warningMessage,
  errorMessage,
}) => {
  return (
    <>
      <div className="mb-4">
        <button
          type="submit"
          className="button button-brand w-100 font-semibold"
        >
          {isLoading ? (
            <div>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
        {warningMessage && (
          <div className="alert alert-warning mt-3 mb-0">{warningMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger mt-3 mb-0">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

SubmitButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  warningMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default SubmitButton;
