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
    icon = `fas fa-${fileIcons[contentType]} fa-5x`;
  }

  return icon;
};

const fileIcons = {
  'audio/x-aiff': 'file-audio',
  'image/gif': 'file-image',
  'image/x-icon': 'file-image',
  'image/jpeg': 'file-image',
  'image/jpg': 'file-image',
  'image/png': 'file-image',
  'image/svg+xml': 'file-image',
  'image/tiff': 'file-image',
  'video/quicktime': 'file-video',
  'video/mp4': 'file-video',
  'video/mpeg': 'file-video',
  'application/x-dvi': 'file-video',
  'video/x-msvideo': 'file-video',
  'application/pdf': 'file-pdf',
  'application/vnd.ms-powerpoint': 'file-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'file-powerpoint',
  'application/msword': 'file-word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'file-word',
  'application/vnd.ms-excel': 'file-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    'file-excel',
  'text/rtf': 'file-alt',
  'text/plain': 'file-alt',
  'text/tab-separated-values': 'table',
  'application/xml': 'database',
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
