import axios from "axios";
import { ROUTES } from "./api.routes";

export const CreateCredit = async (data) => {
  try {
    const response = await axios.post(ROUTES.CREATECREDIT, data);
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

export const ReadCredit = async () => {
  try {
    const {data} = await axios.get(ROUTES.READCREDIT);

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

export const ReadCreditId = async (id) => {
  try {

    const response = await axios.get(ROUTES.READCREDITID(id));
    
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
export const ReadCreditByUserId = async (id) => {
  try {

    const response = await axios.get(ROUTES.READCREDITUSERID(id));
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


export const UpdateCreditId = async (id, data) => {
  try {
    const response = await axios.put(ROUTES.UPDATECREDITID(id), data);
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