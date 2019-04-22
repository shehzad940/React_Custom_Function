import ReactDOM from "react-dom";
import React, { Component } from "react";
import { DatePicker, Input, Select, Button, Table } from "antd";
import "antd/dist/antd.css";
let i = 0;

const Option = Select.Option;

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomdata: [],
      summary: {}
    };
    this.columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Tiffin",
        dataIndex: "numTiffin",
        key: "numTiffin"
      },
      {
        title: "Not Invoved",
        dataIndex: "notInvolved",
        key: "notInvolved"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a
              href="javascript:;"
              onClick={() => this.deleteRecord(record).bind(this)}
            >
              Delete
            </a>
          </span>
        )
      }
    ];
  }

  deleteRecord(record) {
    let newAry = [];
    this.setState(state => {
      state.roomdata.forEach(d => {
        console.log(d, record);
        if (d.key != record.key) {
          newAry.push(d);
        }
      });
      return { roomdata: newAry };
    });
  }

  handleInput(val) {
    this.setState({
      numTiffin: val
    });
  }
  handleDate(date, dateString) {
    this.setState({
      date: dateString
    });
  }
  handleSelect(val) {
    this.setState({
      notInvolved: val
    });
  }
  handleSubmit(e) {
    let d = {
      key: i,
      date: this.state.date,
      numTiffin: this.state.numTiffin,
      notInvolved: this.state.notInvolved
        ? this.state.notInvolved.join(",")
        : "-"
    };
    this.setState({
      roomdata: [...this.state.roomdata, d]
    });
    i++;
  }
  calculateAmt() {
    Array.prototype.diff = function(a) {
      return this.filter(function(i) {
        return a.indexOf(i) < 0;
      });
    };
    const TIFFIN_PRICE = 60;
    const PEOPLE = ["Shehzad", "Fahad", "Naseem", "Gulzar", "Faisal", "Faizan"];
    let priceGiven = {
      Shehzad: 0,
      Fahad: 0,
      Naseem: 0,
      Gulzar: 0,
      Faisal: 0,
      Faizan: 0
    };
    let data = this.state.roomdata;
    console.log(data);
    let totalPrice = 0;
    data.forEach(d => {
      let personsArray = d.notInvolved.split(",");
      let invlovedPeople = PEOPLE.diff(personsArray);
      let rowPrice = d.numTiffin * TIFFIN_PRICE;
      let individualPrice = rowPrice / invlovedPeople.length;
      for (let i = 0; i < invlovedPeople.length; i++) {
        priceGiven[invlovedPeople[i]] += individualPrice;
      }

      console.log(data, priceGiven, "data");
      totalPrice += d.numTiffin * TIFFIN_PRICE;
    });
    this.setState({ summary: priceGiven });
  }
  render() {
    var rows = [];
    for (var k in this.state.summary) {
      rows.push(
        <div key={k}>
          <h3>
            {k} will give: {this.state.summary[k]} rupees
          </h3>
        </div>
      );
    }
    return (
      <div style={{ width: "80%", marginLeft: 10 }}>
        <br />

        <br />
        <DatePicker onChange={this.handleDate.bind(this)} />
        <Select
          placeholder="Enter number of tiffin"
          onChange={this.handleInput.bind(this)}
          style={{ width: 200, marginLeft: 10 }}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
        <Select
          mode="multiple"
          placeholder="Not involved"
          onChange={this.handleSelect.bind(this)}
          style={{ width: 200, marginLeft: 10 }}
        >
          <Option value="Shehzad">Shehzad</Option>
          <Option value="Naseem">Naseem</Option>
          <Option value="Gulzar">Gulzar</Option>
          <Option value="Fahad">Fahad</Option>
          <Option value="Faizan">Faizan</Option>
          <Option value="Faisal">Faisal</Option>
        </Select>
        <Button
          style={{ marginLeft: 10 }}
          onClick={this.handleSubmit.bind(this)}
        >
          Submit
        </Button>
        <div>
          <br />
          <Table
            bordered
            pagination={false}
            dataSource={this.state.roomdata}
            columns={this.columns}
          />
        </div>
        <br />
        <Button
          onClick={this.calculateAmt.bind(this)}
          disabled={!this.state.roomdata.length}
          type="primary"
        >
          Calculate
        </Button>
        <br />
        {Object.keys(this.state.summary).length ? (
          <div>
            <br />
            <h1>Tiffin Sumarry</h1>
            {rows}
          </div>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<Todo />, document.getElementById("root"));
