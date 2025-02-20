import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";

import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import VerifyEmail from "./Patient/VerifyEmail";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        {/* history dùng để lưu lại lịch sử, giữ các thông tin trên trang khi refresh */}
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              {/* CustomScrollbars sẽ tự phát hiện những component nào bị over flow thì sẽ tự động tạo scroll  */}
              {/* đặt chiều cao là 100vh để nếu chiều cao vượt quá khung nhìn thì xuất hiện scroll */}
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  {/* có 3 rout home, login, system được import phía trên cùng */}
                  {/* khai báo hết path trong file constant(giữ control click vào path trong {path.HOME}) */}
                  <Route path={path.HOME} exact component={Home} />
                  {/* dùng Hàm bọc HOC userIsNotAuthenticated, userIsAuthenticated để check xem đã đăng nhập chưa, nếu chưa thì sẽ vào rout home vì home chưa bọc gì */}
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/doctor/"}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
