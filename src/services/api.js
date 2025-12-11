const BASE_URL = import.meta.env.VITE_DEVELOPMENT ? "http://localhost:3000/api/v1/" : "https://codedsa.onrender.com/api/v1/"

export const authEndpoints = {
    LOGIN_API: BASE_URL + "auth/login",
    SIGNUP_API: BASE_URL + "auth/signup",
    VERIFY_TOKEN_API: BASE_URL + "auth/verify-token"
}

export const adminEndpoints = {
    ALL_USERS_API: BASE_URL + "admin/users",
}

export const problemEndpoints = {
    CREATE_PROBLEM_API: BASE_URL + "problems/createproblem",
    GET_PROBLEM_BY_ID: (id) => BASE_URL + `problems/getproblem/${id}`,
    GET_ALL_PROBLEM: BASE_URL + "problems/getallproblem",
    UPDATE_PROBLEM: BASE_URL + "problems/updateproblem/:id",
    DELETE_PROBLEM: (id) => BASE_URL + `problems/deleteproblem/${id}`,
}

export const userEndpoints = {
    UPDATE_USER: BASE_URL + "user/updateuser",
    GET_USER: BASE_URL + "user/getuser",
}

export const chatbotEndpoinst = {
    GET_CHATBOT: BASE_URL + `chatbot`
}