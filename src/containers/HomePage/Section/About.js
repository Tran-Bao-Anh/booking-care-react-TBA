import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl"; //giúp chuyển đỗi ngôn ngữ

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-about-header">Nghe nhạc thư giãn</div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/pIXohH3M7KI?list=PLSDKted1Ajy-pfBPLugNd3fKMwLN6uSo1"
                title="Từng Ngày Như Mãi Mãi (Remix) / buitruonglinh"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, ipsam sit. Voluptates sed iusto natus. Officiis facilis cupiditate at rerum laborum eius quaerat rem esse dolorem voluptatum, itaque, eos ut.
                Veritatis provident neque adipisci deserunt suscipit, blanditiis porro laborum maiores sed ducimus nesciunt ab! Illo mollitia, omnis eaque voluptatibus quidem, repellat sed optio incidunt doloremque iste rem totam ea vel.</p>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
