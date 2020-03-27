import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getClassList } from "../../../../actions/courseActions";

import {
  getAssignments,
  deleteAssignment
} from "../../../../actions/assignmentActions";

class Classlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_id: null,
      classlist: []
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params;

    this.setState({ course_id: id });

    this.props.getClassList(this.props.match.params.id).then(res => {
        this.setState({
            classlist: res.data
        });
    });
  };

//   onClickDelete = id => {
//     this.props.deleteAssignment(id).then(() => {
//       window.location.reload();
//     });
//   };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <b>Class List</b>
                </h4>
              </div>
              <div className="col-md-6 text-right">
                <a
                  href={``}
                  className="btn btn-primary"
                >
                  <i className="fa fa-plus"></i> Add
                </a>
              </div>
            </div>

            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Account Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.classlist.map((user, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>
                      {/* <a href={"/assignments/" + assignment._id}> */}
                      {user.firstname}
                      {/* </a> */}
                    </td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.type} </td>
                      {/* <a
                        href={"users/" + assignment._id + "/edit"}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-pencil"></i>
                      </a> */}
                      <td>
                      <button
                        onClick={() => this.onClickDelete(user._id)}
                        className="btn btn-danger ml-1"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Classlist.propTypes = {
  getClassList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getClassList })(
  Classlist
);