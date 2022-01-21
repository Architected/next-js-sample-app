import { getFileSize } from 'architected-client/helper/fileHelper.js';

const LabelTitleComponent = ({ label, value }) => {
  return (
    <div className="form-group row">
      <label className="form-label col-form-label col-sm-3 font-semibold">
        {label}
      </label>
      <div className="col-sm-6">{value}</div>
    </div>
  );
};

function FileViewAttribute(props) {
  const { file } = props;

  return (
    <div className="match-height">
      <div className="form-group row">
        <label className="form-label col-form-label col-12 col-sm-3 col-md-3 font-semibold">
          File Name
        </label>
        <div className="col-12 col-sm-6 col-md-6">{file.fileName}</div>
      </div>
      <LabelTitleComponent
        label="File Size"
        value={getFileSize(file.fileSize)}
      />
      <LabelTitleComponent label="File Hash" value={file.fileHash} />
      <LabelTitleComponent label="File Type" value={file.contentType} />
      <LabelTitleComponent label="Status" value={file.fileStatus} />
    </div>
  );
}

export default FileViewAttribute;
