import React from "react";
import FeedCard from "./FeedCard";
import { postFeed, putUpdateFeed, deleteFeed, getFeedByUserId } from "../../services/feed.sevice";
import FeedForm from "./FeedForm";
import "./Feed.css";
import ConfirmModal from "./ConfirmModal";
import { CreateButton } from "../CustomComponents/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postLike, getLikeByPostId, deleteLike } from "../../services/like.service";

class Feed extends React.Component {
  state = {
    feeds: [],
    name: "",
    description: "tbd",
    body: "",
    imageUrl: [],
    videoUrl: [],
    title: "",
    content: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    feedForm: false,
    formVideoLinkInput: false,
    formFileBtn: true,
    feedId: 0,
    updateBtn: false,
    modal: false
  };

  componentDidMount() {
    this.renderFeed();
  }

  triggerChildFunction() {
    this.refs.child.dividePreviewArray();
  }

  renderFeed = () => {
    const userId = this.props.match.params.id;
    getFeedByUserId(userId)
      .then(res => {
        //console.log("GET FEED BY CURRENT USER ID", res);
        this.setState({
          feeds: res.data.item.pagedItems
        });
      })
      .catch(error => console.log(error));
  };

  handleSubmitFeed = payload => {
    let feedId = payload.id;
    //console.log("UPDATE TEST", payload);
    if (feedId) {
      putUpdateFeed(payload, feedId)
        .then(response => {
          //console.log("UPDATE/PUT", response);
          this.setState(
            {
              title: "",
              content: "",
              imageUrl: [],
              videoUrl: []
            },
            this.renderFeed()
          );
        })
        .catch(error => console.log(error));
    } else {
      postFeed(payload)
        .then(response => {
          //console.log("CREATE/POST", response);
          this.setState(
            {
              title: "",
              content: "",
              imageUrl: [],
              videoUrl: [],
              feedForm: false
            },
            this.renderFeed()
          );
        })
        .catch(error => console.log(error));
    }
  };

  deleteFeed = feedId => {
    //console.log("Delete", feedId);
    deleteFeed(feedId)
      .then(response => {
        //console.log("DELETE", response);
        this.renderFeed();
      })
      .catch(error => console.log(error));
  };

  handleOnClickFeedForm = () => {
    if (this.state.feedForm === false) {
      this.setState({ feedForm: true });
    } else {
      this.setState({ feedForm: false });
    }
  };

  handleOnclickVideoLink = () => {
    if (this.state.formVideoLinkInput) {
      this.setState({
        formVideoLinkInput: false,
        imageUrl: "",
        formFileBtn: true
      });
    } else {
      this.setState({
        formVideoLinkInput: true,
        formFileBtn: false
      });
    }
  };

  handleModalToggle = feedId => {
    this.setState({
      modal: !this.state.modal,
      feedId
    });
  };

  handleSubmitLike = payload => {
    postLike(payload).then(res => {
      // console.log("POST LIKE", res);
    }, this.renderFeed());
    // .then(this.renderFeed());
  };
  handleDeleteLike = id => {
    deleteLike(id)
      .then(res => {
        // console.log("UNLIKE", id, res);
      })
      .then(this.renderFeed());
  };
  handleViewLikedUsers = postId => {
    // console.log("POST ID TO VIEW LIKED USERS", postId);
    getLikeByPostId(postId).then(res => {
      this.setState({ likedUser: res.data.resultSets });
      // console.log("VIEW LIKED USERS", res);
    });
  };

  render() {
    const userId = this.props.match.params.id;
    //console.log("USER ID", userId, this.props.currentUser.id);
    return (
      <div className="row justify-content-center">
        <div className="animation slideInLeft">
          <div className="mb-md-3">
            {this.state.feedForm ? (
              <div />
            ) : (
              <React.Fragment>
                {this.props.currentUser.id == userId && (
                  <div className="jr-card shadow" style={{ cursor: "pointer" }} onClick={this.handleOnClickFeedForm}>
                    <div className="row">
                      <div className="col-md-8 col-12">
                        <h3 className="card-text">Share photos, videos and stories</h3>
                      </div>
                      <div className="col-md-4 col-12 text-right">
                        <CreateButton type="button" name="Post" onClick={this.handleOnClickFeedForm} />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>

          {this.state.feedForm ? (
            <FeedForm
              closeFeedForm={this.handleOnClickFeedForm}
              videoUrl={this.state.videoUrl}
              handleOnclickVideoLink={this.handleOnclickVideoLink}
              formFileBtn={this.state.formFileBtn}
              handleSubmitFeed={this.handleSubmitFeed}
              capitalize={this.capitalize}
              formVideoLinkInput={this.state.formVideoLinkInput}
              currentUser={this.props.currentUser}
            />
          ) : (
            <div />
          )}
          <div className="cus-card-container">
            {this.state.feeds.map(feed => (
              <FeedCard
                borderColor="#009CE0"
                popover={feed.id}
                key={feed.id}
                feed={feed}
                editFeed={this.handleOnClickEditFeed}
                updateFeed={this.updateFeed}
                deleteFeed={this.deleteFeed}
                handleSubmitFeed={this.handleSubmitFeed}
                imageUrl={this.state.imageUrl}
                videoUrl={this.state.videoUrl}
                handleOnClickUploader={this.handleOnClickUploader}
                currentUser={this.props.currentUser}
                handleSubmitLike={this.handleSubmitLike}
                handleViewLikedUsers={this.handleViewLikedUsers}
                handleDeleteLike={this.handleDeleteLike}
              />
            ))}
          </div>
          <div>
            <ConfirmModal
              handleModalToggle={this.handleModalToggle}
              modal={this.state.modal}
              handleDeleteFeed={this.handleDeleteFeed}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}
export default withRouter(connect(mapStateToProps)(Feed));
