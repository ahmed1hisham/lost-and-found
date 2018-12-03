import React, { Component } from "react";
import "./App.css";
import AddItemComponent from "./components/addItemComponent";
import { getItems } from "./services/fakeItemsService";
import ImageUploader from "react-images-upload";
import Postmark from "postmark";

class App extends Component {
  state = {
    items: [],
    tempImage: []
  };

  componentDidMount() {
    const items = [...getItems()];
    this.setState({ items });
  }

  addItem = item => {
    var newArray = this.state.items.slice();
    var newObject = {
      itemName: item.itemName,
      posterEmail: item.posterEmail,
      secretCode: item.secretCode
    };
    newArray.push(newObject);
    this.setState({ items: newArray });
  };

  onDrop = picture => {
    this.setState({
      tempImage: this.state.tempImage.concat(picture)
    });
  };
  sendEmail() {
    var postmark = require("postmark");
    var client = new postmark.Client("7db32b81-b27d-458d-8703-a9fa2a7147f7");
    client.sendEmail({
      From: "salma.alzoghby@student.guc.edu.eg",
      To: "ahmed.rihan@student.guc.edu.eg",
      Subject: "Test",
      TextBody: "Hello from Postmark!"
    });
  }

  sendEmailCurl() {
    const curl = new (require("curl-request"))();
    curl.setHeaders([
      '"Accept": "application/json"',
      '"X-Postmark-Server-Token": "7db32b81-b27d-458d-8703-a9fa2a7147f7"'
    ]);
    curl
      .setBody({
        From: "salma.alzoghby@student.guc.edu.eg",
        To: "ahmed.rihan@student.guc.edu.eg",
        Subject: "Test",
        TextBody: "Hello from Postmark!"
      })
      .post("https://api.postmarkapp.com/email")
      .then(({ statusCode, body, headers }) => {
        console.log(statusCode, body, headers);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div id="wrapper">
          <div
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
              backgroundColor: "#5e548e",
              color: "white"
            }}
          >
            <h1>Lost and Found App</h1>
          </div>
          <div
            className="card"
            style={{
              width: "30%",
              marginLeft: "20px",
              marginTop: "50px",
              float: "left"
            }}
          >
            <div className="card-body">
              <h1>Add an item</h1>
              <hr />
              <form>
                <div className="form-group">
                  <label for="imageUploader">Upload Image</label>
                  <ImageUploader
                    withIcon={true}
                    id="imageUploader"
                    buttonText="Choose image"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                  />
                </div>

                <div className="form-group">
                  <label for="itemName">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="itemName"
                    placeholder="eg. ma7faza zar2a"
                  />
                </div>
                <div className="form-group">
                  <label for="Poster Email">Poster Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Poster Email"
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label for="secretNumber">Secret Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="secretNumber"
                    placeholder="So that no one deletes your item but you ;)"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.addItem}
                  style={{ float: "right" }}
                >
                  addItem
                </button>
              </form>
            </div>
          </div>

          <div
            className="card"
            style={{
              width: "66%",
              marginRight: "20px",
              marginTop: "50px",
              float: "right"
            }}
          >
            <div className="card-body">
              <h1>List of Items</h1>
              <hr />
              {this.state.items.map(item => (
                <span
                  className="card"
                  style={{ width: "210px", float: "left" }}
                >
                  <img
                    className="card-img-top"
                    src={item.imageUrl}
                    alt="Card image cap"
                    style={{ width: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "center" }}>
                      {item.itemName}
                    </h5>
                    <a
                      href="#"
                      onClick={this.sendEmailCurl}
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      This is mine!!
                    </a>
                    <br />
                    <a
                      href="#"
                      className="btn btn-danger"
                      style={{
                        width: "100%"
                      }}
                    >
                      Delete
                    </a>
                  </div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
