import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser, updateUser } from "../../../../actions/userActions";
import "bootstrap/dist/css/bootstrap.min.css";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      type: "",
      email: "",
      password: "",
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.setState({ course_id: id });

    this.props.getUser(id).then((res) => {
      this.setState({ ...res.data, password: "" });
    });
  };

  onChange = (e) => this.setState({ [e.target.id]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateUser(this.props.match.params.id, this.state).then(() => {
      window.location.href = "/users";
    });
  };

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-2">
            <div className="card">
              <div className="card-header">
                <strong>Edit User</strong>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="Firstname">Firstname</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.firstname}
                      placeholder="Enter your Firstname"
                      id="firstname"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Lastname">Lastname</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.lastname}
                      placeholder="Enter your Lastname"
                      id="lastname"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Username">Username</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.username}
                      placeholder="Enter your Username"
                      id="username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="UserType">User Type</label>
                    <select
                      required
                      type="text"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.type}
                      placeholder="Enter your UserType"
                      id="type"
                    >
                      <option value="">Select User Type</option>
                      <option value="teacher">Teacher</option>
                      <option value="guardian">Guardian</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Email">Email address</label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.email}
                      placeholder="Enter your e-mail address"
                      id="email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.password}
                      placeholder="Enter your password"
                      id="password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { getUser, updateUser })(
  withRouter(Edit)
);
