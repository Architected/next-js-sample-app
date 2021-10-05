import React, { useRef } from 'react';
import Image from 'next/image';
import HomePageImage from '../../public/home.png';
import Link from 'next/link';

function PasswordResetComplete() {
  return (
    <div className="auth">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="auth-box">
              <h2>Password Changed</h2>
              <p>Your password has been successfully updated.</p>
              <div className="mb-4">
                <div className="text-left">
                  <Link href="/auth/signin/email" passHref>
                    <a className="text-brand">Sign In</a>
                  </Link>
                </div>
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

export default PasswordResetComplete;
