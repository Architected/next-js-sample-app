import Link from 'next/link';
import Image from 'next/image';
import {
  getFileSize,
  getDisplayName,
  isProcessing,
  isProcessed,
  isScanFailed,
  isFileError,
  getGridDisplayName,
} from 'architected-client/helper/fileHelper.js';
import moment from 'moment';
import { getBootstrapIcon } from '../../helper/contentTypeIcons';

export default function FileList({
  createFile,
  reloadList,
  isLoadingList,
  loadingError,
  files,
  downloadFile,
}) {
  return (
    <>
      <div className="d-flex">
        <div className="mr-auto p-2">
          <h4 className="mb-0">My Files</h4>
        </div>
        <div className="p-2">
          <a href="#" className="pt-2 float-left" onClick={reloadList}>
            <i className="fas fa-sync-alt" title="refresh"></i>
          </a>
        </div>
        <div className="p-2">
          <a
            href="#"
            className="button button-brand float-left"
            onClick={createFile}
          >
            Upload File
          </a>
        </div>
      </div>
      <div className="row">
        {isLoadingList ? (
          <div className="box">
            <div className="px-3 py-3">Loading Files ...</div>
          </div>
        ) : loadingError ? (
          <div className="box">
            <div className="px-3 py-3">{loadingError}</div>
          </div>
        ) : files && files.length == 0 ? (
          <div className="box">
            <div className="px-3 py-3">
              You have not uploaded any files yet!
            </div>
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.globalId}
              className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-12 d-flex"
            >
              <div className="box flex-fill">
                <div className="box-caption">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <b>{getGridDisplayName(file)}</b>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="box-content">
                  <div className="db-table">
                    <table>
                      <tbody>
                        <tr>
                          <td
                            className="pl-0 py-1"
                            align="center"
                            valign="middle"
                          >
                            <span>
                              <Link href={`/file/${file.globalId}`} passHref>
                                <a>
                                  {file.hasThumbnail ? (
                                    <Image
                                      src={file.thumbnailPath}
                                      alt={getDisplayName(file.fileName)}
                                      width="300"
                                      height="300"
                                    />
                                  ) : (
                                    <i
                                      className={getBootstrapIcon(
                                        file.contentType
                                      )}
                                    ></i>
                                  )}
                                </a>
                              </Link>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Created:</b>&nbsp;
                            {moment(file.createdDate).format(
                              'MMM Do YYYY hh:mm'
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Modified:</b>&nbsp;
                            {moment(file.modifiedDate).format(
                              'MMM Do YYYY hh:mm'
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Size:</b>&nbsp;{getFileSize(file.fileSize)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 float-left">
                            {isProcessing(file.fileStatus) && (
                              <span className="badge badge-warning">
                                Processing
                              </span>
                            )}
                            {isProcessed(file.fileStatus) && (
                              <div>
                                <span className="badge badge-primary">
                                  Processed
                                </span>
                              </div>
                            )}
                            {isScanFailed(file.fileStatus) && (
                              <span className="badge badge-danger">
                                Scan Failed
                              </span>
                            )}
                            {isFileError(file.fileStatus) && (
                              <span className="badge badge-danger">Error</span>
                            )}
                          </td>
                          <td className="py-1 float-right">
                            {file.isTokenCreated && (
                              <span title="NFT Created">
                                <i
                                  className="fas fa-stroopwafel"
                                  alt="NFT Created"
                                ></i>
                                &nbsp;
                              </span>
                            )}
                            {file.isIPFSLinked && (
                              <span title="Uploaded to IPFS">
                                <i
                                  className="fas fa-globe"
                                  alt="Uploaded to IPFS"
                                ></i>
                                &nbsp;
                              </span>
                            )}
                            {isProcessed(file.fileStatus) && (
                              <a
                                href="#"
                                onClick={() =>
                                  downloadFile(file.globalId, file.fileName)
                                }
                                className="float-right"
                                title="Download file"
                              >
                                <i className="fas fa-download"></i>
                              </a>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
