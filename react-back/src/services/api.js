import axios from "axios";

const url = "http://localhost:5000";

export const checkEmail = async (email) => {
  try {
    console.log(email);
    const response = await axios.get(`${url}/check-email/${email}`);
    console.log(response.data.emailExists);
    return response.data.emailExists;
  } catch (error) {
    console.log(error.message);
  }
};

export const registerUser = async (
  email,
  password,
  last_name,
  first_name,
  role
) => {
  try {
    const response = await axios.post(`${url}/signup`, {
      email,
      password,
      last_name,
      first_name,
      role,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${url}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const checkEmailVerification = async (email) => {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/email-verification/${email}`);
    if (res.data.verified) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};