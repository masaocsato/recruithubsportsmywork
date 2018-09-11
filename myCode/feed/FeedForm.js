import React from "react";
import IntlMessages from "util/IntlMessages";
import "./Feed.css";
import axios from "axios";
import FileUploader from "../FileUploader/FileUploader";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";
import { SubmitButtonWide } from "../CustomComponents/Button";
import { postMedia } from "../profile/ProfileServer";

class FeedForm extends React.Component {
  state = {
    title: "",
    content: "",
    imageUrl: [],
    authorId: 93,
    isPublished: 1,
    videoUrl: [],
    presignedUrl: "",
    fileUrl: ""
  };

  handleOnClickPayload = () => {
    this.props.handleSubmitFeed({
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.imageUrl,
      slug: this.state.title,
      authorId: this.state.authorId,
      isPublished: this.state.isPublished,
      videoUrl: this.state.videoUrl
    });
    for (let i = 0; i < this.state.videoUrl.length; i++) {
      let videoObject = {
        userId: this.props.currentUser.id,
        type: "video",
        url: this.state.videoUrl[i],
        width: 320,
        height: 180,
        title: this.state.title,
        caption: this.state.content
      };
      postMedia(videoObject).then(res => {
        //console.log(res);
      });
    }
  };

  handleImageUrlChange = newImageUrl => {
    let newArr = [];
    for (let i = 0; i < newImageUrl.length; i++) {
      newArr.push(newImageUrl[i].url);
    }
    this.setState({
      imageUrl: newArr
    });
  };

  handleVideoUrlChange = newVideoUrl => {
    let newArr = [];
    for (let i = 0; i < newVideoUrl.length; i++) {
      newArr.push(newVideoUrl[i].url);
    }
    this.setState({
      videoUrl: newArr
    });
  };

  getUrlOut = arr => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i].url);
      return newArr;
    }
  };

  render() {
    return (
      <div className="FeedForm">
        <div className="undifined card cus-card-container shadow">
          <div className="rs-bg-primary text-white card-header">
            <div className="row">
              <div className="col-md-8 col-8">Add Your Story</div>
              <div className="col-md-4 col-4 text-right">
                <button
                  type="button"
                  onClick={this.props.closeFeedForm}
                  className="btn btn-sm rs-btn-primary text-white btn btn-default"
                >
                  <i className="zmdi zmdi-close zmdi-hc-lg" />
                  &nbsp;Close
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form className="form-container" noValidate autoComplete="off">
              <h4> Title </h4>
              <input
                className="form-control"
                type="text"
                value={this.state.title}
                placeholder="What are you sharing today?"
                onChange={e => this.setState({ title: e.target.value })}
              />
              <div className="mt-4">
                <h4> Content</h4>
                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Write your thoughts, moments and tips "
                  value={this.state.content}
                  onChange={e => this.setState({ content: e.target.value })}
                />
              </div>
            </form>

            <div className="">
              <div className="">
                <MultiFileUploader
                  onImageUrlChange={this.handleImageUrlChange}
                  onVideoUrlChange={this.handleVideoUrlChange}
                />
              </div>
              {/* <div className="" style={{ position: "relative", bottom: "0%", right: "0%" }}> */}
              <div className="pt-3">
                <SubmitButtonWide type="button" name="Post" onClick={this.handleOnClickPayload} />
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedForm;
