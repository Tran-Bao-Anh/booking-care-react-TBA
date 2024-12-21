//Để redux hiểu được file adminReducer.js này thì mình phải import nó vào file rootReducer.js
import actionTypes from "../actions/actionTypes";
//Khởi tạo state của redux, khởi tạo bao giờ cũng phải rỗng
//tạo xong thì qua file userRedux.js để fire action trong component
const initialState = {
  genders: [],
  roles: [],
  positions: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("TBA fire fetch gender START and check action: ", action);

      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      console.log("TBA fire fetch gender SUCCESS and check action: ", action);
      let copyState = { ...state };
      copyState.genders = action.data;  //đã lấy được data từ server thông qua file adminActions.js
      return {
        //hàm return này giống hàm setState trong react mình k nên modify state ở đây
        ...copyState,  //trả data xong thì qua file UserRedux.js để lấy data từ redux bỏ qua react để dùng
      };

    case actionTypes.FETCH_GENDER_FAILED:
      console.log("TBA fire fetch gender FAILED and check action: ", action);

      return {
        ...state,
      };
    default:
      return state;
  }
};
export default adminReducer;
