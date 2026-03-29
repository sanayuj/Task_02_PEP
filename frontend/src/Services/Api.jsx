import {userInstance} from "../Axios/axiosInstance"

export const signup = (values) => {
  return userInstance.post("/signup", { ...values });
};

export const login =(values)=>{
  return userInstance.post("/login",{...values})
}

export const createDocument=()=>{
  return userInstance.get("/createdoc")
}

export const autoSave = (id, docData) => {
  return userInstance.put(`/autosave/${id}`, docData);
};

export const getAllRecentDoc=()=>{
  return userInstance.get("/getallRecentDoc")
}

export const getDocumentById = (id) => {
  return userInstance.get(`/documents/${id}`);
};

export const deleteDocumentById=(id)=>{
  return userInstance.delete(`/deleteDoc/${id}`)
}

export const shareDocument = (id, data) => {
  return userInstance.post(`/sharedoc/${id}`, data);
};