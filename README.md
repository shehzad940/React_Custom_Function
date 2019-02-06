# React_Custom_Function
Update parent component state with a single function
No need to pass multiple callbacks

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "yeah",
      text: 'hello'
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(key, val) {
    this.setState(function (state) {
      for (let i in state) {
        if (i == key) {
          state[i] = val;
        }
      }
      return state;
    })
  }

  render() {
    return (
      <div>
        <Child updateState={this.updateState} {...this.state} />
      </div>
    )

  }
}


class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <p>State toggle = {this.props.toggle}</p>
        <p>State text = {this.props.text}</p>
        <button onClick={() => this.props.updateState("toggle", "nope")}>Update Toggle</button>
        <button onClick={() => this.props.updateState("text", "some new text")}>Update Text</button>
      </div>
    )

  }
}

