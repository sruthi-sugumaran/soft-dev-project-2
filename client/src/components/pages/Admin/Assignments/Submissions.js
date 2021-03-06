import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAssignment,
  getSubmissions,
  getNonSubmissions,
  submitAssignment,
  removeSubmission
} from "../../../../actions/assignmentActions";

class Submissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment_id: null,
      assignment: {},
      submissions: [],
      nonsubmissions: []
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params.id;

    this.setState({ assignment_id: id });

    this.props.getAssignment(this.props.match.params.id).then(res => {
      this.setState({ assignment: res.data });
    });

    this.props.getSubmissions(this.props.match.params.id).then(res => {
        this.setState({ submissions: res.data });
    });

    this.props.getNonSubmissions(this.props.match.params.id).then(res => {
        this.setState({ nonsubmissions: res.data });
    });
  };

  onClickSubmit = userId => {
    var assignmentId = this.props.match.params.id;
    this.props.submitAssignment(assignmentId,userId).then(() => {   
      console.log("came here");     
      window.location.href= "/assignments/" + this.props.match.params.id + "/submissions";
    });
  };

  onClickRemove = userId => {
    var assignmentId = this.props.match.params.id;
    this.props.removeSubmission(assignmentId,userId).then(() => {   
      console.log("came here");     
      window.location.href= "/assignments/" + this.props.match.params.id + "/submissions";
    });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
                <h4>
                  <b>Assignment Name: {this.state.assignment.name}</b><hr/>
                </h4>
                <div class="jumbotron">
                  <h5>
                    <b>Assignment Description:</b> {this.state.assignment.description}
                  </h5>
                  <h5>
                    <b>Due date:</b> {new Date(this.state.assignment.due).toDateString()}
                  </h5>
                </div>

            
          </div>
        </div>


        <div className="row">
          <div className="col s12 center-align">
            <br />
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <b>Submissions:</b>
                </h4>
              </div>
              <div className="col-md-6 text-right">
                {/* <a
                  href={`/courses/${this.props.match.params.id}/assignments/add`}
                  className="btn btn-primary"
                >
                  <i className="fa fa-plus"></i> Add
                </a> */}
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {this.state.submissions.map((user, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{user.firstname}
                    </td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      {/* <a
                        href={"users/" + assignment._id + "/edit"}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-pencil"></i>
                      </a> */}
                      <button
                        className="btn btn-success ml-1"
                        onClick={() => this.onClickRemove(user._id)}
                      >
                        <i className="fa fa-check"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        

        <div className="row">
          <div className="col s12 center-align">
            <br />
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <b>Pending Submissions:</b>
                </h4>
              </div>
              <div className="col-md-6 text-right">
                {/* <a
                  href={`/courses/${this.props.match.params.id}/assignments/add`}
                  className="btn btn-primary"
                >
                  <i className="fa fa-plus"></i> Add
                </a> */}
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.nonsubmissions.map((user, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{user.firstname}
                    </td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      {/* <a
                        href={"users/" + assignment._id + "/edit"}
                        className="btn btn-primary"
                      >
                        <i className="fa fa-pencil"></i>
                      </a> */}
                      <button
                        onClick={() => this.onClickSubmit(user._id)}
                        className="btn btn-danger ml-1"
                      >
                        <i className="fa fa-remove"></i>
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

Submissions.propTypes = {
  getAssignment: PropTypes.func.isRequired,
  getSubmissions: PropTypes.func.isRequired,
  getNonSubmissions: PropTypes.func.isRequired,
  submitAssignment: PropTypes.func.isRequired,
  removeSubmission: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { getAssignment, getSubmissions, getNonSubmissions, submitAssignment, removeSubmission })(
  Submissions
);
