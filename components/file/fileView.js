import React from 'react';
import Link from 'next/link';
import { urlConstants } from '../../helper/urlConstants';
import FileViewDetail from './fileViewDetail';
import FileViewAttribute from './fileViewAttribute';
import FileViewIPFS from './fileViewIPFS';
import FileViewToken from './fileViewToken';

export default function FileView(props) {
  const {
    siteMode,
    isLoadingItem,
    loadingError,
    updateFile,
    file,
    isUpdatingFile,
    updatingError,
    deleteFile,
    isDeletingFile,
    deletingError,
    uploadToIPFS,
    previewTokenHandler,
    mintTokenHandler,
  } = props;
  return (
    <>
      <div className="dashboard-content">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h4 className="mb-0">File Detail</h4>
            </div>
            <div></div>
            <div>
              <Link href={urlConstants.get('PAGE_FILE_LIST')} passHref>
                <a className="button button-brand float-left">
                  Back to file list
                </a>
              </Link>
            </div>
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
                    <a className="" data-toggle="tab" href="#tab2" role="tab">
                      Attributes
                    </a>
                    {siteMode == 'dapp' && (
                      <>
                        <a
                          className=""
                          data-toggle="tab"
                          href="#tab3"
                          role="tab"
                        >
                          IPFS
                        </a>
                        <a
                          className=""
                          data-toggle="tab"
                          href="#tab4"
                          role="tab"
                        >
                          NFT
                        </a>
                      </>
                    )}
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
                      <FileViewDetail
                        isLoadingItem={isLoadingItem}
                        loadingError={loadingError}
                        updateFile={updateFile}
                        file={file}
                        isUpdatingFile={isUpdatingFile}
                        updatingError={updatingError}
                        deleteFile={deleteFile}
                        isDeletingFile={isDeletingFile}
                        deletingError={deletingError}
                      />
                    )}
                  </div>
                  <div className="tab-pane fade" id="tab2" role="tabpanel">
                    {isLoadingItem ? (
                      <div>Loading...</div>
                    ) : loadingError ? (
                      <div>{loadingError}</div>
                    ) : (
                      <FileViewAttribute file={file} />
                    )}
                  </div>
                  {siteMode == 'dapp' && (
                    <>
                      <div className="tab-pane fade" id="tab3" role="tabpanel">
                        {isLoadingItem ? (
                          <div>Loading...</div>
                        ) : loadingError ? (
                          <div>{loadingError}</div>
                        ) : (
                          <FileViewIPFS
                            file={file}
                            isUpdatingFile={isUpdatingFile}
                            updatingError={updatingError}
                            uploadToIPFS={uploadToIPFS}
                          />
                        )}
                      </div>
                      <div className="tab-pane fade" id="tab4" role="tabpanel">
                        <FileViewToken
                          file={file}
                          isUpdatingFile={isUpdatingFile}
                          updatingError={updatingError}
                          previewToken={previewTokenHandler}
                          mintToken={mintTokenHandler}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
