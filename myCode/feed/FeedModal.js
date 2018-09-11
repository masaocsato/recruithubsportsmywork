import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Popover, PopoverBody } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import "../profile/ImageModal.css";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";

class FeedModal extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.showImgModal} toggle={this.props.toggleImgModal} className={this.props.className}>
          <ModalHeader className="text-center">{this.props.title}</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-1">
                <button
                  className="btn btn-default vert-center-left"
                  disabled={this.props.selectedImg === 0 ? true : false}
                  onClick={this.props.prevImg}
                >
                  <i className="zmdi zmdi-caret-left-circle zmdi-hc-lg" />
                </button>
              </div>
              <div className="col-md-10">
                {this.props.images[this.props.selectedImg].type === "image" ||
                this.props.images[this.props.selectedImg].type === "imageSmall" ||
                this.props.images[this.props.selectedImg].type === "imageLarge" ? (
                  <CSSTransition
                    in={this.props.fade}
                    timeout={300}
                    unmountOnExit={false}
                    onEntered={this.props.fadeOut}
                    classNames="image"
                  >
                    <img
                      className="mw-100 rounded"
                      src={this.props.images[this.props.selectedImg].src}
                      style={{ display: "block", margin: "auto" }}
                    />
                  </CSSTransition>
                ) : (
                  <CSSTransition
                    in={this.props.fade}
                    timeout={300}
                    unmountOnExit={false}
                    onEntered={this.props.fadeOut}
                    classNames="image"
                  >
                    <VideoPlayerContainer
                      className="w-100 rounded"
                      videoUrl={this.props.videos[parseInt(this.props.selectedVideo)].src}
                    />
                  </CSSTransition>
                )}
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-default vert-center-right"
                  disabled={this.props.selectedImg === this.props.images.length - 1 ? true : false}
                  onClick={this.props.nextImg}
                >
                  <i className="zmdi zmdi-caret-right-circle zmdi-hc-lg" />
                </button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="row">
              <div className="col-md-12">{this.props.content}</div>
            </div>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default FeedModal;
