import axios from "axios";
import { ROUTES } from "./api.routes";

export const CreateUser = async (data) => {
  try {
    const response = await axios.post(ROUTES.CREATEUSER, data);
    return {
      error:false,
      data:response.data
    }
  } catch (error) {
    console.log(error);
    return {
      error:true,
      data: error.response
    }
  }
};

export const ReadUsers = async () => {
  try {
    const {data} = await axios.get(ROUTES.READUSER);

    return {
      error: false ,
      data: data
    };
  } catch (error) {

    return {
      error: true ,
      data: []
    }
  }
};

export const ReadUsersAdmin = async () => {
  try {
    const {data} = await axios.get(ROUTES.READUSERADMIN);

    return {
      error: false ,
      data: data
    };
  } catch (error) {

    return {
      error: true ,
      data: []
    }
  }
};

export const ReadUserId = async (id) => {
  try {

    const response = await axios.get(ROUTES.READUSERID(id));
    return {
      error:false,
      data:response.data
    };

  } catch (error) {
    console.log(error.response);
    return {
      error:true,
      data:error.response
    };
  }
};

export const UpdateUserId = async (id, data) => {
  try {
    const response = await axios.put(ROUTES.UPDATEUSERID(id), data);
    return {
      error:false,
      data:response.data
    };
  } catch (error) {
    console.log(error.response);
    return {
      error:true,
      data:error.response
    };
  }
};