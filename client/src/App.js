import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
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
        console.log("Data is public bro!");
      })
      .catch((err) => {
        console.log("Fuck! there is something wrong with the data");
      });
  };

  submit = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body,
    };
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("data has been sent to the server");
        this.resetUserInput();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("Data is not posted");
      });
  };

  resetUserInput = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  displayLivePost = (posts) => {
    if (!posts.length) {
      return null;
    }
    return posts.map((post, index) => (
      <div key={index} className="blogPostDisplay">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render() {
    console.log("State is :", this.state);
    return (
      <div className="app">
        <h2>Upload your thought and its title</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Enter the title"
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              placeholder="Say about the title"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button className="btn btn-success btn-lg m-1">Submit</button>
        </form>

        <div>{this.displayLivePost(this.state.posts)}</div>
      </div>
    );
  }
}

export default App;
