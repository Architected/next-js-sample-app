import { contentTypeIcons } from './contentTypeIcons';

const getFileSize = (fileSize) => {
  let kb = fileSize / 1000;
  const formattedValue = Math.round(kb)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${formattedValue} Kb`;
};

const getDisplayName = (fileName) => {
  return fileName.length > 40 ? fileName.substring(0, 38) + '..' : fileName;
};

const getGridDisplayName = (file) => {
  if (file.name) {
    return file.name.length > 30
      ? `${file.name.substring(0, 23)}...${file.name.substring(
          file.name.length - 4
        )}`
      : file.name;
  } else {
    return file.fileName.length > 30
      ? `${file.fileName.substring(0, 23)}...${file.fileName.substring(
          file.fileNam.length - 4
        )}`
      : file.fileName;
  }
};

const getIcon = (contentType) => {
  let icon = 'fa-file-alt';
  if (contentType) {
    icon = `fas fa-${contentTypeIcons[contentType]} fa-5x`;
  }

  return icon;
};

const isProcessing = (fileStatus) => fileStatus == 'PROCESSING';
const isProcessed = (fileStatus) => fileStatus == 'PROCESSED';
const isScanFailed = (fileStatus) => fileStatus == 'SCANFAILED';

export {
  getFileSize,
  getDisplayName,
  getIcon,
  isProcessing,
  isProcessed,
  isScanFailed,
  getGridDisplayName,
};
