import React from 'react';
import Image from 'next/image';
import HomePageImage from '../../../public/home.png';

function EmailComplete({ navigateToSignInHandler }) {
  return (
    <div className="auth">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="auth-box">
              <h2>Sign Up Complete </h2>
              <p>Your account is now ready to use </p>
              <div className="mb-4">
                <button
                  type="button"
                  className="button button-brand w-100 font-semibold"
                  onClick={navigateToSignInHandler}
                >
                  <span>Sign in</span>
                </button>
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

export default EmailComplete;
