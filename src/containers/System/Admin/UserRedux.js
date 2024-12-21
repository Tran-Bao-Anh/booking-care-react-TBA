import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
//Để fire 1 action đầu tiên phải import action trong folder actions
//Nhấn giữ control và click vào actions sẽ vào file index.js trong folder actions bởi vì file index luôn là file đầu tiên được mở khi truy cập vào folder
//Sau đó kéo xuống hàm mapDispatchToProps
import * as actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
    };
  }

  componentDidMount() {
    // this.allCodeGender();
    // this.allCodePosition();
    // this.allCodeRole();
    ///////
    // this.props.dispatch(actions.fetchGenderStart())  //Đây là cú pháp chuẩn của redux, thay vì gọi hàm như vậy thì ta dùng hàm mapDispatchToProps xong gọi hàm như bên dưới
    this.props.getGenderStart(); //Sau khi gọi hàm như vậy thì nó sẽ chạy sang file adminActions.js để thực hiện hàm fetchGenderStart
  }
  allCodeGender = async () => {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        this.setState({
          genderArr: res.data,
        });
      }
      console.log("check res from UserRedux.js: ", res);
    } catch (e) {
      console.log(e);
    }
  };

  allCodePosition = async () => {
    try {
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        this.setState({
          positionArr: res.data,
        });
      }
      console.log("check res from UserRedux.js: ", res);
    } catch (e) {
      console.log(e);
    }
  };

  allCodeRole = async () => {
    try {
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        this.setState({
          roleArr: res.data,
        });
      }
      console.log("check res from UserRedux.js: ", res);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log("check state from userRedux.js: ", this.state);
    console.log("check props UserRedux: ", this.props.genderRedux);
    let genders = this.props.genderRedux;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    return (
      <div className="user-redux-container">
        <div className="title">Add new user with redux by TBA</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <div className="form-control" type="email"></div>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <div className="form-control" type="password"></div>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <div className="form-control" type="text"></div>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <div className="form-control" type="text"></div>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <div className="form-control" type="text"></div>
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <div className="form-control" type="text"></div>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select className="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select className="form-control">
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select className="form-control">
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 mt-3">
                <button className="btn btn-primary">
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //biến state giống như một call back của hàm mapStateToProps truyền qua, state này của redux sau khi lấy đc state của redux thì ta truy cập vào key của nó, key ở trong hàm combineReducers trong file rootReducer.js
  return {
    //khi dùng state.app tức là mình đang dùng cái file appReducer.js check trong hàm combineReducers bên file rootReducer.js, mở appReducer để xem tiếp
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    //Đặc một function tên getGenderStart, function này sẽ fire event là actions.fetchGenderStart(trong file adminAction.js)
    //Để truy cập được getGenderStart thì dùng this.props.getGenderStart (đây là biến props của react) trong hàm componentDidMount phía trên
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
