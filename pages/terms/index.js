import React from 'react';
import backChannelService from '../../service/backChannelService';

function Terms(props) {
  const { pageData } = props;
  const { page } = pageData;
  const { content, pageTitle } = page;

  return (
    <>
      <div className="auth">
        <div className="container">
          {page == null ? (
            <div>loading</div>
          ) : (
            <>
              <div>
                <h2>{pageTitle}</h2>
              </div>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Terms;

export async function getServerSideProps() {
  const responseData = await backChannelService()
    .content()
    .getPageByKey('TERMS');
  const { data } = responseData;
  return {
    props: {
      pageData: data,
    },
  };
}
