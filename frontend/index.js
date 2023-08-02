import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;


    default:
      return combineReducers({})(state, action);
  }
};

export default rootReducer;





// 기존 코드
// import registerServiceWorker from './registerServiceWorker'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// )

// registerServiceWorker()



