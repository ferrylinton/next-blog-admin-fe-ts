import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
        "Content-type": "application/json",
    },
});

// instance.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response.status === 401) {
//         console.log('error 401')
//       }
//       return Promise.reject(error);
//     },
//   );

  export default instance;