import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import ModalTemplate from '../../components/shared/modalTemplate';
import FileGrid from '../../components/file/fileGrid';
import SubmitButton from '../../components/shared/submitButton';
import * as fileActionType from 'architected-client/app-state/constants/file.js';
import { fileClient } from '../../service/defaultServices.js';
import { hasValidToken } from '../../helper/storageHelper';

function File() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);

  const { authState, bearerToken } = state['auth'];
  const {
    displayModal,
    modalTitle,
    isSavingFile,
    saveFileError,
    isLoadingList,
    loadingError,
    files,
  } = state['file'];

  const initModal = () => {
    dispatch({ type: fileActionType.SHOW_MODAL, payload: 'Create File' });
    setPreviewUrl(null);
    setCurrentFile(null);
  };

  const hideModal = () => {
    dispatch({ type: fileActionType.HIDE_MODAL });
  };

  const createFile = (e) => {
    e.preventDefault();
    initModal();
    reset();
  };

  const previewFile = async (e) => {
    initModal();
    const file = e.target.files[0];
    if (!file) return;

    const fileSize = file.size;
    const fileType = file.type;
    const validFile = fileClient.validateFileBasic(
      fileSize,
      fileType,
      dispatch
    );

    if (!validFile) return;
    setCurrentFile(e.target.files[0]);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const downloadFileHandler = async (fileGlobalId, fileName) => {
    return fileClient.downloadFile(
      fileGlobalId,
      fileName,
      bearerToken.tokenValue
    );
  };

  const reloadHandler = async () => {
    await fileClient.getAllFiles(dispatch, bearerToken.tokenValue);
  };

  const submitHandler = (data) => {
    const request = {
      file: currentFile,
      name: data.name,
      description: data.description,
    };
    fileClient.uploadFile(request, dispatch, bearerToken.tokenValue);
    setPreviewUrl(null);
  };

  useEffect(() => {
    let isMounted = true;

    const validToken = hasValidToken(authState, bearerToken, dispatch);

    if (!validToken) {
      router.push('/');
    } else {
      if (!displayModal && bearerToken) {
        reloadHandler().then(() => {
          if (isMounted) reset();
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [displayModal]);

  return (
    <>
      <div className="dashboard-content">
        <div className="container-fluid">
          <ModalTemplate
            displayModal={displayModal}
            modalTitle={modalTitle}
            handleClose={hideModal}
          >
            <div className="mb-content">
              <div>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="match-height">
                    <div className="form-group row">
                      <label
                        htmlFor="file"
                        className="form-label col-form-label col-sm-4 font-semibold"
                      >
                        File
                      </label>
                      <div className="col-md-8 ">
                        <div className="pt-2">
                          <input
                            className="form-control"
                            {...register('file', {
                              required: 'Please select a file',
                            })}
                            type="file"
                            onChange={previewFile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {errors.file && (
                    <p className="validation-message">{errors.file.message}</p>
                  )}
                  {previewUrl && (
                    <div className="match-height">
                      <div className="form-group row">
                        <label
                          htmlFor="preview"
                          className="form-label col-form-label col-sm-4 font-semibold"
                        >
                          Preview
                        </label>
                        <div className="col-md-8 ">
                          <div className="pt-2">
                            <Image
                              src={previewUrl}
                              width="300"
                              height="300"
                              alt="preview image"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className="form-label col-form-label col-sm-4 font-semibold"
                    >
                      Name
                    </label>
                    <div className="col-md-8 ">
                      <div className="pt-2">
                        <input
                          placeholder=""
                          className="form-control"
                          type="text"
                          {...register('name', {
                            required: 'Please enter a name',
                          })}
                        />
                        {errors.name && (
                          <p className="validation-message">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="description"
                      className="form-label col-form-label col-sm-4 font-semibold"
                    >
                      Description
                    </label>
                    <div className="col-md-8 ">
                      <div className="pt-2">
                        <textarea
                          placeholder=""
                          className="form-control"
                          type="textarea"
                          rows="3"
                          {...register('description', {
                            required: 'Please enter a description',
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
                  <SubmitButton
                    buttonText="Save File"
                    isLoading={isSavingFile}
                    errorMessage={saveFileError}
                  />
                </form>
              </div>
            </div>
          </ModalTemplate>
          {files && (
            <FileGrid
              createFile={createFile}
              reloadList={reloadHandler}
              isLoadingList={isLoadingList}
              loadingError={loadingError}
              files={files}
              downloadFile={downloadFileHandler}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default File;
