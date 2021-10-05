import '../styles/globals.css';
import Layout from '../components/shared/layout';

import { StoreProvider } from '../state/storeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
