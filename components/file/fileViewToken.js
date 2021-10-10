import React, { useState } from 'react';
import SpinnerCode from '../shared/spinnerComponent';

const getState = (file) => {
  let nextAction;
  if (file.isTokenMinted) {
    nextAction = 'VIEW_TOKEN';
  } else if (file.isTokenCreated) {
    nextAction = 'MINT_TOKEN';
  } else if (file.isIPFSLinked) {
    nextAction = 'CREATE_TOKEN';
  } else {
    nextAction = 'CREATE_IPFS';
  }

  return nextAction;
};
function FileViewToken(props) {
  const { file, isUpdatingFile, updatingError, previewToken, mintToken } =
    props;

  const [tokenPrice, setTokenPrice] = useState(0);

  return (
    <div>
      {getState(file) == 'CREATE_IPFS' && (
        <div>Please create IPFS assets on the previous tab to continue.</div>
      )}
      {getState(file) == 'CREATE_TOKEN' && (
        <div>
          <div className="form-group row">
            <label
              htmlFor="price"
              className="form-label col-form-label col-sm-3"
            >
              Get started creating a NFT Token
            </label>
          </div>
          <div></div>
          <form>
            <div className="form-group row">
              <label
                htmlFor="name"
                className="form-label col-form-label col-sm-3 font-semibold"
              >
                Title
              </label>
              <div className="col-sm-6">
                <div className="pt-2">{file.name}</div>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="description"
                className="form-label col-form-label col-sm-3 font-semibold"
              >
                Description
              </label>
              <div className="col-sm-6">
                <div className="pt-2">{file.description}</div>
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="price"
                className="form-label col-form-label col-sm-3 font-semibold"
              >
                Enter Token Price (MATIC)
              </label>
              <div className="col-sm-3">
                <div className="pt-2">
                  <input
                    placeholder=""
                    className="form-control"
                    type="text"
                    onChange={(e) => setTokenPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mb-5">
              <div className="col-sm-12">
                <button
                  className="button button-brand float-left"
                  type="button"
                  onClick={() => previewToken(tokenPrice)}
                >
                  {isUpdatingFile ? <SpinnerCode /> : 'Next'}
                </button>
              </div>
            </div>
            {updatingError && (
              <div className="alert alert-danger mt-3 mb-0">
                {updatingError}
              </div>
            )}
          </form>
        </div>
      )}

      {getState(file) == 'VIEW_TOKEN' && <div>Token Ready For minting</div>}

      {getState(file) == 'MINT_TOKEN' && (
        <div>
          <div>
            <div className="form-group row">
              <label
                htmlFor="price"
                className="form-label col-form-label col-sm-3"
              >
                Confirm the token details and click mint once ready
              </label>
            </div>
            <div></div>
            <form>
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className="form-label col-form-label col-sm-3 font-semibold"
                >
                  Title
                </label>
                <div className="col-sm-6">
                  <div className="pt-2">{file.name}</div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="description"
                  className="form-label col-form-label col-sm-3 font-semibold"
                >
                  Description
                </label>
                <div className="col-sm-6">
                  <div className="pt-2">{file.description}</div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="price"
                  className="form-label col-form-label col-sm-3 font-semibold"
                >
                  Token Price (MATIC)
                </label>
                <div className="col-sm-6">
                  <div className="pt-2">{file.tokenPrice}</div>
                </div>
              </div>
              <div className="form-group row mb-5">
                <div className="col-sm-12">
                  <button
                    className="button button-brand float-left"
                    type="button"
                    onClick={() => mintToken()}
                  >
                    {isUpdatingItem ? <SpinnerCode /> : 'Mint Token'}
                  </button>
                </div>
              </div>
              {updatingError && (
                <div className="alert alert-danger mt-3 mb-0">
                  {updatingError}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileViewToken;
