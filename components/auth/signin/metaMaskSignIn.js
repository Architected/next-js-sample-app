import React from 'react';
import SubmitButton from '../../shared/submitButton';
import Image from 'next/image';
import HomePageImage from '../../../public/home.png';
import MetamaskImage from '../../../public/metamask.png';
import { useForm } from 'react-hook-form';

function MetaMaskSignIn({
  submitHandler,
  isLoading,
  errorMessage,
  warningMessage,
}) {
  const { handleSubmit } = useForm();

  return (
    <div className="auth">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="auth-box text-center">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-3 text-center">
                  <Image
                    width={100}
                    height={100}
                    src={MetamaskImage}
                    alt="Metamask logo"
                  />
                </div>
                <SubmitButton
                  buttonText="Sign in with Metamask"
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

export default MetaMaskSignIn;
