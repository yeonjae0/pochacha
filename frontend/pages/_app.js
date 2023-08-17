import '../styles/globals.css';
import 'regenerator-runtime/runtime';
import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
// import withRedux from "next-redux-wrapper";
import { persistor } from "@/store/index";
import { PersistGate } from "redux-persist/integration/react";
import { store, wrapper } from "../store/index";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps} = this.props;

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />  
        </PersistGate>
      </Provider>
    );
  }
}

export default wrapper.withRedux(MyApp);






// class EnhancedApp extends App {
//   static async getInitialProps({ Component }) {
//     return {
//       pageProps: Component.getInitialProps

//     };
//   }

//   render() {
//     const { Component, pageProps, store } = this.props;
//     return (
//       <Container>
//         <Provider store={store}>
//           <Component {...pageProps} />
//         </Provider>
//       </Container>
//     );
//   }
// }

// export default withRedux(store)(EnhancedApp);
