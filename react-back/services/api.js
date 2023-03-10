import axios from 'axios';

const url = "http://localhost:5000";

export const checkEmail = async (email) => {
    try {
      const response = await axios.get(`${url}/check-email/email=${email}`);
      if (response.data.emailExists) {
        throw new Error('Email already in use');
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
  

export const registerUser = async (email, password, last_name, first_name, role) => {
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
