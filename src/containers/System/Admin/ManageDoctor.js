import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "chocolate" },
  { value: "strawberry", label: "strawberry" },
  { value: "vanilla", label: "vanilla" },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  //hàm tạo constructor
  constructor(Props) {
    super(Props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  /* Life cycle
  Run component:
  1.Run construct -> init state
  2. Did mount (set state): born: sinh ra // unmount: dead: chết
  Hàm did mount gọi API lấy giá trị vào và setState cho component, state lưu data, dùng state trong render() để hiển thị data
  3. Render muốn re-render thì dùng hàm setState
  Mỗi lần setState() thì re-render  */

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    console.log("check state from ManageDoctor.js: ", this.state);
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log("check Option selected from ManageDoctor.js: ", selectedOption);
  };

  handleOnchangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">Tạo thêm thông tin doctors</div>
          <div className="more-info">
            <div className="content-left form-group">
              <label>Chọn bác sĩ</label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </div>
            <div className="content-right">
              <label>Thông tin giới thiệu</label>
              <textarea
                className="form-control"
                rows="4"
                onChange={(event) => this.handleOnchangeDesc(event)}
                value={this.state.description}
              >
                asdgadsgfdah
              </textarea>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className="save-content-doctor"
          >
            Lưu thông tin
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
