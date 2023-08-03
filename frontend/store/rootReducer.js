// Redux의 Root Reducer를 생성하는 파일
// 리듀서들을 combineReducers 함수로 합치고, 이를 내보내는 역할

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    //필요한 리듀서들을 추가
    fruit
  });
  
  export default rootReducer;