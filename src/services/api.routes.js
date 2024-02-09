export const endpoint = "http://localhost:8000/api";

export const ROUTES = {
    
    //usuarios
    CREATEUSER: `${endpoint}/user`,
    READUSER: `${endpoint}/users`,
    READUSERADMIN: `${endpoint}/user/read`,
    READUSERID: (id) => `${endpoint}/user/${id}`,
    UPDATEUSERID:(id) => `${endpoint}/user/${id}`,

    // solicitudes de credito
    CREATECREDITREQUEST: `${endpoint}/credit_request`,
    READCREDITREQUEST: `${endpoint}/credit_requests`,
    READCREDITREQUESTSTATUS : `${endpoint}/credit_request/read`,
    READCREDITREQUESTPENDIENT : `${endpoint}/credit_request/pendient`,
    READCREDITREQUESTID: (id) => `${endpoint}/credit_request/${id}`,
    UPDATECREDITREQUESTID:(id) => `${endpoint}/credit_request/${id}`,

    // creditos
    CREATECREDIT: `${endpoint}/credit`,
    READCREDIT: `${endpoint}/credits`,
    READCREDITID: (id) => `${endpoint}/credit/${id}`,
    READCREDITUSERID: (id) => `${endpoint}/credit/read/${id}`,
    UPDATECREDITID:(id) => `${endpoint}/credit/${id}`,
}
