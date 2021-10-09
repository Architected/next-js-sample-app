import React from 'react';
import Image from 'next/image';
import HomePageImage from '../../public/home.png';
import Link from 'next/link';
import { architectedConfig } from '../../architectedConfig';

function HomeScreen() {
  console.log('architectedConfig' + JSON.stringify(architectedConfig));
  return (
    <>
      <div className="auth">
        <div className="container">
          <div className="home-hero">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-12">
                <div>
                  <div className="des">
                    {architectedConfig.siteMode == 'dapp' ? (
                      <>
                        <h1>Upload, store, sell</h1>
                        <p>
                          Discover NFTs in a marketplace bridging the cloud and
                          the blockchain
                        </p>
                        <div className="mb-3">
                          <button className="button button-brand">
                            <Link href="/auth/signin/wallet" passHref>
                              <a className="button button-brand">Connect</a>
                            </Link>
                          </button>
                          <button className="button font-semibold ml-3">
                            <Link href="/marketplace" passHref>
                              <a className="button button-link">Explore</a>
                            </Link>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1>Upload your files</h1>
                        <p>Storage for your favourite digital assets</p>
                        <div className="mb-3">
                          <button className="button button-brand">
                            <Link href="/auth/signin/email" passHref>
                              <a className="button button-brand">Sign in</a>
                            </Link>
                          </button>
                        </div>
                      </>
                    )}
                    {architectedConfig.siteMode == 'app' && (
                      <div className="mb-3">
                        <div className="text-left">
                          Dont have an account?&nbsp;
                          <Link href="/auth/signup/email" passHref>
                            <a className="text-brand">Sign Up</a>
                          </Link>
                        </div>
                      </div>
                    )}
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
      </div>
    </>
  );
}

export default HomeScreen;
