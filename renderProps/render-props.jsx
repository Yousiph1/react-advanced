// The <Mouse> component encapsulates the behavior we need...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100px', backgroundColor: "black", marginBottom: "10px" }} onMouseMove={this.handleMouseMove}>
          //I am using 'renderr' insead of 'render' just to show you that 
          // you can name the function what ever you want

              {this.props.renderr(this.state)}
      </div>
    );
  }
}

class Cat extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
  <div style = {{position: "absolute",height: '10px', width : '10px', backgroundColor: "red", left: this.props.x, top: this.props.y}}>
      
      </div>
    )
  }
}

class Dog extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div style = {{position: "absolute", backgroundColor:"green", height: "10px", width: "10px", left: this.props.x, top: this.props.y}}>
        </div>
    )
  }
}




class MouseTracker extends React.Component {
  
  render() {
    return (
      <>
        <h1>Move the mouse around!</h1>
        <Mouse  renderr = {state => <Cat x = {state.x} y = {state.y} /> }/>
        <Mouse renderr = {state => <Dog x = {state.x} y =  {state.y} /> } />
      </>
    );
  }
}

ReactDOM.render(
  <MouseTracker />,
  document.getElementById('root')
);
