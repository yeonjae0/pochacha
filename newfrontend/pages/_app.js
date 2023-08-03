import '@/styles/globals.css'
// import React, {useState} from 'react'
// import { configureStore } from '@reduxjs/toolkit';
// import {Provider, useSelector,  useDispatch, connect} from 'react-redux'
import { wrapper } from "../store/store";

 function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);