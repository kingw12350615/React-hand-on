import classes from "./User.module.css";
import { Component } from "react";

class User extends Component {
  // constructor is optional depend on if need to initiallize some properties
  constructor() {
    super();
  }

  // equivalent of retrun statement of functional component
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
  // execute when compoent unmount
  componentWillUnmount() {
    console.log("User component unmounted");
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
