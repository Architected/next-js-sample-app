import { contentClient } from '../../service/defaultServices';

const pageKey = 'TERMS';

function Terms(props) {
  const { pageData } = props;
  let pageTitle = '';
  let content = '';
  if (pageData.inError) {
    pageTitle = pageKey;
    content = 'Error loading page content please check your site configuration';
  } else {
    pageTitle = pageData.page.pageTitle;
    content = pageData.page.content;
  }

  return (
    <>
      <div className="auth">
        <div className="container">
          {pageData == null ? (
            <div>loading content...</div>
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
  const responseData = await contentClient.getPageByKey(pageKey);
  const { data } = responseData;
  return {
    props: {
      pageData: data,
    },
  };
}
