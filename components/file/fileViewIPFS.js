import SpinnerCode from '../shared/spinnerComponent';

function FileViewIPFS(props) {
  const { file, isUpdatingFile, updatingError, uploadToIPFS } = props;
  return (
    <div>
      {file.isIPFSLinked ? (
        <div>
          <div className="form-group row">
            <label
              htmlFor="name"
              className="form-label col-form-label col-sm-12"
            >
              This file is now stored on the interplanetary file system at the
              following url:
            </label>
          </div>
          <div className="form-group row">
            <label
              htmlFor="name"
              className="form-label col-form-label col-sm-12 font-semibold"
            >
              Asset Url
            </label>
          </div>
          <div className="form-group row">
            <label
              htmlFor="name"
              className="form-label col-form-label col-sm-12"
            >
              {file.ipfsAssetUrl}
            </label>
          </div>
          <div className="form-group row">
            <label
              htmlFor="name"
              className="form-label col-form-label col-sm-12 font-semibold"
            >
              Thumbnail Url
            </label>
          </div>
          <div className="form-group row">
            <label
              htmlFor="name"
              className="form-label col-form-label col-sm-12"
            >
              {file.ipfsThumbnailUrl}
            </label>
          </div>
        </div>
      ) : (
        <div>
          <div className="form-group row">
            <label
              htmlFor="name"
              className="form-label col-form-label col-sm-12 font-semibold"
            >
              If you would like to store your file on the Interplanetary File
              System. Click the Upload button below.
            </label>
          </div>

          <div className="form-group row mb-5">
            <div className="col-sm-12">
              <button
                className="button button-brand float-left"
                type="button"
                onClick={uploadToIPFS}
              >
                {isUpdatingFile ? <SpinnerCode /> : 'Upload to IPFS'}
              </button>
            </div>
            {updatingError && (
              <div className="alert alert-danger mt-3 mb-0">
                {updatingError}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileViewIPFS;
