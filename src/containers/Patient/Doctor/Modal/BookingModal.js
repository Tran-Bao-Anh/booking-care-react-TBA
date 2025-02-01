import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";

class BookingModal extends Component {
  constructor(Props) {
    super(Props);
    this.state = {};
  }

  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    //toggle={ }
    let { isOpenModal, closeBookingClose, dataTime } = this.props;
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className="booking-modal-container"
          size="lg"
          centered
          //backdrop={true}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám bệnh</span>
              <span className="right" onClick={closeBookingClose}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataTime)} */}
              <div className="doctor-info"></div>
              <div className="price">Giá khám 500.000VNĐ</div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>Họ tên</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Số điện thoại</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ email</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Địa chỉ liên hệ</label>
                  <input className="form-control" />
                </div>
                <div className="col-12 form-group">
                  <label>Lý do khám</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Đặt cho ai</label>
                  <input className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>Giới tính</label>
                  <input className="form-control" />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={closeBookingClose}
              >
                Xác nhận
              </button>
              <button
                className="btn-booking-cancel"
                onClick={closeBookingClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
