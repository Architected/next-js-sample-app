import * as mimeTypeHelper from 'architected-client/helper/mimeTypeHelper.js';

const getBootstrapIcon = (contentType) => {
  let icon = 'fa-file-alt';
  if (contentType) {
    icon = `fas fa-${mimeTypeHelper.mimeTypeMapping[contentType]} fa-5x`;
  }

  return icon;
};

export { getBootstrapIcon };
