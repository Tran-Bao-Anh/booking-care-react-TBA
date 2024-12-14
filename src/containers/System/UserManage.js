import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEdit from "./ModalEdit";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  //hàm tạo constructor
  constructor(Props) {
    super(Props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEdit: false,
      userCurrent: {},
    };
  }

  async componentDidMount() {
    // Chạy ngay sau khi component được render
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA"); //fire event dùng emitter.emit
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    console.log("click delete: ", user);
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = async (user) => {
    console.log("check edit user: ", user);
    this.setState({
      isOpenModalEdit: true,
      userCurrent: user,
    });
  };

  editUser = async (data) => {
    try {
      let response = await editUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalEdit: false,
        });
        //emitter.emit("EVENT_CLEAR_MODAL_DATA"); //fire event dùng emitter.emit
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* Life cycle
  Run component:
  1.Run construct -> init state
  2. Did mount (set state): born: sinh ra // unmount: dead: chết
  Hàm did mount gọi API lấy giá trị vào và setState cho component, state lưu data, dùng state trong render() để hiển thị data
  3. Render muốn re-render thì dùng hàm setState
  Mỗi lần setState() thì re-render  */
  render() {
    console.log("check render: ", this.state);
    let arrUsers = this.state.arrUsers;
    console.log(">>> check arrUsers", arrUsers);

    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {
          //nếu không bọc <ModalEdit/> bằng điều kiện true của isOpenModalEdit thì khi vào website sẽ mount ngay <ModalEdit/>
          //tức là đã chạy vào hàm componentDidMount trong ModalEdit.js nên khi ta bấm nút edit thì nó sẽ không chạy hàm componentDidMount nữa
          //lúc này biến id trong state của ModalEdit.js vẫn rỗng và không được setState lại nên sẽ bị lỗi missing parameter id
          //bọc <ModalEdit/> bằng điều kiện true của isOpenModalEdit để khi nào click edit thì component <ModalEdit/> mới chạy và chạy vào hàm componentDidMount để setState trong ModalEdit.js
        }
        {this.state.isOpenModalEdit && (
          <ModalEdit
            isOpen={this.state.isOpenModalEdit}
            userCurrent={this.state.userCurrent}
            toggleFromParent={this.toggleUserEdit}
            editUser={this.editUser}
          />
        )}
        <div className="title text-center">Manage users with TBA</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new users
          </button>
        </div>
        <div className="users-table mt-3 mx1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
