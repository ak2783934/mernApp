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
        console.log("Data is public bro! DATA: ", data);
      })
      .catch((err) => {
        console.log("Fuck! bahar nai nikl rha h bro!");
      });
  };

  submit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("img", this.state.img, this.state.img.name);
    data.append("data", this.state.body);
    axios({
      url: "/api/save",
      method: "POST",
      data: data,
    })
      .then((response) => {
        console.log("data has been sent to the server RESPONSE: ", response);
        this.resetUserInput();
        this.getBlogPost();
      })
      .catch((err) => {
        console.log("Data is not posted: and payload is :", data);
      });
  };

  resetUserInput = () => {
    this.setState({
      img: "",
      body: "",
    });
  };

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  displayImg = (post) => {
    const base64Flag = `data:${post.contentType};base64,`;

    const imageStr = this.arrayBufferToBase64(post.img.data.data);

    const url = base64Flag + imageStr;
    console.log("URL IS HERE ", url);
    return <img src={url} alt="imgs" className="img-fluid jumbotron-fluid" />;
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
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    console.log("State is :", this.state);
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
