//Để redux hiểu được file adminReducer.js này thì mình phải import nó vào file rootReducer.js
import actionTypes from "../actions/actionTypes";
//Khởi tạo state của redux, khởi tạo bao giờ cũng phải rỗng
//tạo xong thì qua file userRedux.js để fire action trong component
const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;

      return {
        ...copyState,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      console.log("TBA fire fetch gender SUCCESS and check action: ", action);
      state.genders = action.data; //đã lấy được data từ server thông qua file adminActions.js
      state.isLoadingGender = false;
      return {
        //hàm return này giống hàm setState trong react mình k nên modify state ở đây
        ...state, //trả data xong thì qua file UserRedux.js để lấy data từ redux bỏ qua react để dùng
      };

    case actionTypes.FETCH_GENDER_FAILED:
      console.log("TBA fire fetch gender FAILED and check action: ", action);
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      console.log("check action FETCH_ALL_USERS_SUCCESS", action);
      //biến action.users lấy từ hàm fetchAllUsersSuccess trong file adminActions.js
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };

      case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataDr;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default adminReducer;
