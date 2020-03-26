import axios from "axios";

export const addCourse = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("/courses", data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getCourses = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get("/courses")
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const getCourse = id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/courses/${id}`)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
