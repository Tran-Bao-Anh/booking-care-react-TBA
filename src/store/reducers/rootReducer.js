import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer"; //Để sử dụng được thư viện connect được react và redux thì phải khai báo trong hàm combineReducers bên dưới
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};

export default (history) =>
  //combineReducers dùng để gộp các reducer con
  combineReducers({
    //router, user, app là key còn các cái phía sau dấu : là data của reducer. Chúng ta gọi các key để lấy data ở tại hàm mapStateToProps tại các component
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer, //khai báo như vậy để bên trong component của react khi ta cần lấy state của redux ta có thể thông qua key là admin
  });
