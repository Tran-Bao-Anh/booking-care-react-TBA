//Tạo mới file này xong export trong src/store/actions/index.js
import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

//code chuẩn của redux bao gồm 3 bước start/doing/end
//Đầu tiên mình phải fire 1 action bắt đầu thực hiện trong FETCH_GENDER_START
//Khi gọi api thành công thì chuyển trạng thái qua FETCH_GENDER_SUCCESS
//Khi gọi api thất bại thì chuyển trạng thái qua FETCH_GENDER_FAILED
//Làm vậy cho đúng chuẩn, nhưng thực tế chỉ cần 1 action là đủ
//Sau khi tạo các hàm action thì cần qua file actionType.js để khai báo
//Khai báo các actions xong thì tạo một file reducer(adminReducer.js) để các action gọi tới file reducer đó
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START   //Khi fire action này thì sẽ fire FETCH_GENDER_START trong adminReducer.js
// })
//lúc này không fire FETCH_GENDER_START trong adminReducer.js
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data)); //để fire 1 action của redux ta phải bọc trong hàm dispatch
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error: ", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
