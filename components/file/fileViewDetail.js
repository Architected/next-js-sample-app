import React from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import SpinnerCode from '../shared/spinnerComponent';
import { getDisplayName, getIcon } from '../../helper/fileHelper';

function FileViewDetail(props) {
  const {
    isLoadingItem,
    loadingError,
    updateFile,
    file,
    isUpdatingItem,
    updatingError,
    deleteFile,
    isDeletingFile,
    deletingError,
  } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return isLoadingItem ? (
    <div>Loading</div>
  ) : loadingError ? (
    <div>{loadingError}</div>
  ) : (
    <form onSubmit={handleSubmit(updateFile)}>
      <div className="match-height">
        <div className="form-group row">
          <label className="form-label col-form-label col-12 col-sm-3 col-md-3 font-semibold">
            File Name
          </label>
          <div className="col-12 col-sm-6 col-md-6">{file.fileName}</div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="name"
            className="form-label col-form-label col-sm-3 font-semibold"
          >
            Title
          </label>
          <div className="col-sm-6">
            <div className="pt-2">
              <input
                placeholder=""
                className="form-control"
                type="text"
                {...register('name', {
                  required: 'Please enter a title',
                  value: file.name,
                })}
              />
              {errors.name && (
                <p className="validation-message">{errors.name.message}</p>
              )}
            </div>
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
            <div className="pt-2">
              <textarea
                placeholder=""
                className="form-control"
                rows="5"
                {...register('description', {
                  required: 'Please enter your description',
                  value: file.description,
                })}
              />
              {errors.description && (
                <p className="validation-message">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* <div className="form-group row">
          <label
            htmlFor="folderGlobalId"
            className="form-label col-form-label col-sm-3 font-semibold"
          >
            Folder
          </label>
          <div className="col-sm-6">
            <div className="pt-2">
              <input
                placeholder=""
                className="form-control"
                type="text"
                {...register('folderGlobalId', {
                  value: file.folderGlobalId,
                })}
              />
            </div>
          </div>
        </div> */}
        <div className="form-group row">
          <div className="col-12 col-sm-3 col-md-3 font-semibold">
            Thumbnail
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            {file.hasThumbnail ? (
              <Image
                src={file.thumbnailPath}
                alt={getDisplayName(file.fileName)}
                width="300"
                height="300"
              />
            ) : (
              <i className={getIcon(file.contentType)}></i>
            )}
          </div>
        </div>

        <div className="form-group row mb-5">
          <div className="col-sm-12">
            <button className="button button-brand float-left" type="submit">
              {isUpdatingItem ? <SpinnerCode /> : 'Update File'}
            </button>
            <button
              type="button"
              className="button button-brand float-right"
              onClick={deleteFile}
            >
              {isDeletingFile ? <SpinnerCode /> : 'Delete File'}
            </button>
          </div>
          {deletingError && (
            <div className="alert alert-danger mt-3 mb-0">{deletingError}</div>
          )}
          {updatingError && (
            <div className="alert alert-danger mt-3 mb-0">{updatingError}</div>
          )}
        </div>
      </div>
    </form>
  );
}

export default FileViewDetail;
