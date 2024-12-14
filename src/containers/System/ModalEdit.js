import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    console.log(">>>check props: ", this.props);

    let user = this.props.userCurrent;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };
  //copy state rồi sửa state copy vì không nên sửa đỗi trực tiếp state, khi dự án lớn, 1 component cha có thể có rất nhiều component con mà các component con thì độc lập dữ liệu với nhau, nếu sửa state trực tiếp sẽ dẫn tới những lần render thì component con bị render khác nhau nên dữ liệu có cái được cái mất
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      //dùng call back function để check state để in ra cái state luôn đúng không bị bất đồng bộ
      () => {
        console.log("check state: ", this.state);
      }
    );
  };

  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["id", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUser = () => {
    // console.log(">>>check props id: ", this.props.id);
    // // let copyState = { ...this.state };
    // // copyState.id = this.props.id;
    // let userId = this.props.id;
    // this.setState({
    //   //...copyState,
    //   id: userId,
    // });
    // console.log(">>>check state edit:, ", this.state);

    let isValid = this.checkValidInput();
    if (isValid === true) {
      //call api create modal
      //nếu gọi event nút add new ngay tại file modalUsers.js này thì website cần reload
      //gọi event thông qua props bên file userManage.js để file userManage.js tự tạo xong thì cập nhật lại state để hiển thị user mới thêm luôn, như vậy thì website không bị reload

      console.log("check edit: ", this.state);
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "firstName");
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "lastName");
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleEditUser()}
          >
            Save changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
