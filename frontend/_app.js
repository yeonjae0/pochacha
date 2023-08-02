import { Provider } from 'react-redux';
import { wrapper } from './store/configureStore';

function myApp({ Component, pageProps }) {
  return (
    <Provider store={wrapper.store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(myApp);