import axios from "axios";
import { ROUTES } from "./api.routes";

export const CreateCreditRequest = async (data) => {
  try {

    const response = await axios.post(ROUTES.CREATECREDITREQUEST, data);
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

export const ReadCreditRequest = async () => {
  try {
    const {data} = await axios.get(ROUTES.READCREDITREQUEST);

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

export const ReadCreditRequestByStatus = async () => {
  try {
    const {data} = await axios.get(ROUTES.READCREDITREQUESTSTATUS);

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

export const ReadCreditRequestByPendient = async () => {
  try {
    const {data} = await axios.get(ROUTES.READCREDITREQUESTPENDIENT);

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

export const ReadCreditRequestId = async (id) => {
  try {

    const response = await axios.get(ROUTES.READCREDITREQUESTID(id));
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

export const UpdateCreditRequestId = async (id, data) => {
  try {
    const response = await axios.put(ROUTES.UPDATECREDITREQUESTID(id), data);
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