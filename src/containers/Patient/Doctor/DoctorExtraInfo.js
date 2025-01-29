import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  //hàm tạo constructor
  constructor(Props) {
    super(Props);
    this.state = {
      isShowDetailInfo: false,
    };
  }

  async componentDidMount() {
    // Chạy ngay sau khi component được render
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };
  /* Life cycle
    Run component:
    1.Run construct -> init state
    2. Did mount (set state): born: sinh ra // unmount: dead: chết
    Hàm did mount gọi API lấy giá trị vào và setState cho component, state lưu data, dùng state trong render() để hiển thị data
    3. Render muốn re-render thì dùng hàm setState
    Mỗi lần setState() thì re-render  */
  render() {
    let { isShowDetailInfo } = this.state;
    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">ĐỊA CHỈ KHÁM</div>
            <div className="name-clinic">Phòng khám chuyên khoa da liễu</div>
            <div className="detail-address">
              207 Phố Huế - Hai Bà Trưng - Hà Nội
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfo === false && (
              <div className="short-info">
                Giá khám: 250.000đ.
                <span onClick={() => this.showHideDetailInfo(true)}>
                  Xem chi tiết
                </span>
              </div>
            )}
            {isShowDetailInfo === true && (
              <>
                <div className="title-price">GIÁ KHÁM: . </div>
                <div className="detail-info">
                  <div className="price">
                    <div className="left">Giá khám</div>
                    <div className="right">250.000đ</div>
                  </div>
                  <div className="note">
                    Được ưu tiên khám trước, khi đặt khám qua app booking care
                  </div>
                </div>
                <div className="payment">
                  Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
                  hoặc chuyển khoản
                </div>
                <div className="hide-price">
                  <span onClick={() => this.showHideDetailInfo(false)}>
                    Ẩn bảng giá
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
