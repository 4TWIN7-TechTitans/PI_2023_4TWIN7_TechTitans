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
  role,
  phone_number
) => {
  try {
    const response = await axios.post(`${url}/signup`, {
      email,
      password,
      last_name,
      first_name,
      role,
      phone_number,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const add = async (
  email,
  password,
  last_name,
  first_name,
  role,
  phone_number,
  verified = true
) => {
  try {
    const response = await axios.post(`${url}/signup`, {
      email,
      password,
      last_name,
      first_name,
      role,
      phone_number,
      verified,
    });
    return response.data;
  } catch (error) {
    console.log(error);
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

export const checkEmailVerification = async (email) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:5000/email-verification/${email}`
    );
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

export const getUsers = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/all-users`);
    const users = response.data.users((user) => user.role !== "admin");
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const resend_verification_post = async (email) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:5000/resend-verification/${email}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
/*export const getUsers = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/all-users`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};*/

/*
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${url}/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};*/

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${url}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
