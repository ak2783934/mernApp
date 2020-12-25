import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    img: "",
    body: "",
    posts: [],
  };

  handleChange = (name) => (event) => {
    const value = name === "img" ? event.target.files[0] : event.target.value;
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios({
      url: "/api",
      method: "GET",
    })
      .then((res) => {
        const data = res.data;
        this.setState({ posts: data });
        // console.log("Data is public bro! DATA: ", data);
      })
      .catch((err) => {
        console.log("Get route is not working!");
      });
  };

  submit = (event) => {
    event.preventDefault();
    var axData = new FormData();
    axData.append("img", this.state.img);
    axData.append("body", this.state.body);
    // console.log("DATA BEFORE AXIOS: ", this.state.img, this.state.body);

    axios({
      url: "/api/save",
      method: "POST",
      data: axData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        // console.log("data has been sent to the server RESPONSE: ", response);
        this.resetUserInput();
        this.getBlogPost();
      })
      .catch((err) => {
        console.log("Data is not posted");
      });
  };

  resetUserInput = () => {
    this.setState({
      img: "",
      body: "",
    });
  };

  displayImg = (post) => {
    if (post.img !== undefined) {
      // console.log("URL IS HERE ", post.img.url);
      return (
        <img
          src={post.img.url}
          alt="imgs"
          className="img-fluid jumbotron-fluid"
        />
      );
    }
  };

  displayLivePost = (posts) => {
    if (!posts.length) {
      return null;
    }
    return (
      <div className="row w-75 ">
        {posts.map((post, index) => (
          <div
            key={index}
            className="blogPostDisplay col-3 mb-1 p-3 text-center justify-content-center"
          >
            {this.displayImg(post)}
            <p class="font-weight-bold">{post.body}</p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    // console.log("State is :", this.state);
    return (
      <div className="app">
        <h2>Upload a picture and describe what you think about it!</h2>
        <h3>Hell yeah! this is the place to work bro!</h3>
        <form method="POST" encType="multipart/form-data">
          <div className="form-input">
            <input
              type="file"
              name="img"
              // value={this.state.img}
              onChange={this.handleChange("img")}
              placeholder="Post the image!"
              required
              accept="image"
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              placeholder="Say about the image"
              onChange={this.handleChange("body")}
              required
            ></textarea>
          </div>
          <button className="btn btn-success btn-lg m-1" onClick={this.submit}>
            Submit
          </button>
        </form>

        <div>{this.displayLivePost(this.state.posts)}</div>
      </div>
    );
  }
}

export default App;
