import '../styles/globals.css';
import 'regenerator-runtime/runtime';
import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
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
    const { Component, pageProps } = this.props;

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
