import React, { Component } from "react";
import "./App.css";
import { getItems } from "./services/fakeItemsService";

class App extends Component {
  state = {
    items: []
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

  render() {
    return (
      <React.Fragment>
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
            <form>
              <div className="form-group">
                <label for="itemName">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  placeholder="Ma7faza Zar2a"
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
              <button onClick={this.addItem} style={{ float: "right" }}>
                addItem
              </button>
            </form>
          </div>
        </div>
        <div
          className="card"
          style={{
            width: "65%",
            marginRight: "20px",
            marginTop: "50px",
            float: "right"
          }}
        >
          <div className="card-body">
            <h1>List of Items</h1>
            <hr />
            <table
              style={{ tableLayout: "fixed" }}
              className="table table-borderless"
            >
              <tbody>
                {this.state.items.map(item => (
                  <tr key={item}>
                    <td colspan="1">
                      <span>{item.itemName}</span>
                    </td>
                    <td colspan="2">
                      <span className="announcement">{item.title}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
