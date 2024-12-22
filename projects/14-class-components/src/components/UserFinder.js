import { Fragment, useState, useEffect, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UserContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary"

class UserFinder extends Component {
  // use this to bind context type to this component
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        {/* use ErrorBoundary to catch error in child component and display fallback UI */}
        <ErrorBoundary>
            <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }

  searchChangeHandler(event) {
    this.setState((preState) => {
      return { searchTerm: event.target.value };
    });
  }

  // execute when component be mounted, same as useEffect with [] as second argument, e.g useEffect(() => {}, [])
  componentDidMount() {
    // use this.context.[property name] to access context value
    this.setState({ filteredUsers: this.context.users });
  }

  // execute when component updated, same as useEffect with [searchTerm] as second argument, e.g useEffect(() => {}, [searchTerm]) 
  componentDidUpdate(preProps, preState) {
    if (preState.searchTerm !== this.state.searchTerm) {
      console.log("searchTerm:" + this.state.searchTerm);
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
