import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl"; //giúp chuyển đỗi ngôn ngữ

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer">
          <p>
            &copy; 2024 TBA More information, please visit my facebook.
            <a target="_blank" href="https://www.facebook.com/baoanh.tran.37017794">
              {" "}
              &#8594; Click here &#8592;
            </a>
          </p>
        </div>
      </>
    );
  }
}

//hàm mapStateToProps dùng truyền state của redux sang props của component
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
