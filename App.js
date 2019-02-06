
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "yeah",
      text: 'hello'
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(newStateObj) {
    // A custom function for updating state from child component like setState()
    let newObjKeys = Object.keys(newStateObj);
    this.setState(function(state) {
      for (let key in state) {
        if (newObjKeys.indexOf(key) != -1) {
          state[key] = newStateObj[key];
        }
      }
      return state;
    });
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
  
  updateParentState() {
    this.props.updateState({toggle: 'nope', text: 'some new text'});
  }
  

  render() {
    return (
      <div>
        <p>State toggle = {this.props.toggle}</p>
        <p>State text = {this.props.text}</p>
        <button onClick={() => this.props.updateState(toggle: "nope")}>Update Toggle</button>
        <button onClick={() => this.props.updateState(text: "some new text")}>Update Text</button>
        <button onClick={this.updateParentState.bind(this)}>Update both</button>
      </div>
    )

  }
}
