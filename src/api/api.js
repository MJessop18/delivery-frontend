import axios from "axios";
import { jwt, parseJwt } from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const BASE_URL = 'http://localhost:3001';

//classes making get send request to the API
//shouldn't be any front end specific things here
//shouldn't be any API stuff elsewhere 

// class DeliveryApi{
//     static token;
//     static async request(endPoint, data = {}, method = 'get'){
//         const url = `${BASE_URL}/${endPoint}`;
//         const headers = DeliveryApi.token
//         ? {Authorization: `Bearer ${DeliveryApi.token}`}
//         :{};
//         const params = method === 'get'? data:{};
//         try{
//             return(await axios({url, method, data, params, headers})).data;
//         }catch(err){
//             console.error('API error:', err.response);
//             let message = err.response.data.error.message;
//             throw Array.isArray(message)?message:[message];
//         }
//     }

    class DeliveryApi {
        //the token for interactive with the API will be stored here.
        static token;
        static async request(endpoint, data = {}, method = "get") {
          const url = `${BASE_URL}/${endpoint}`;
          const headers = DeliveryApi.token
            ? { Authorization: `Bearer ${DeliveryApi.token}` }
            : {};
          const params = method === "get" ? data : {};
          try {
            return (await axios({ url, method, data, params, headers })).data;
          } catch (err) {
            console.error("API ERROR:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
          }
        }

    //get the current user
    static async getCurrentUser(){
        if(!this.token){
            return undefined;
        }
        const{ userId } = jwt_decode(this.token);
        console.log('userID', userId);
        let res = await this.request(`employee/${userId}`);
        console.log('resemp', res.employee);
        return res.employee;
    }

    static async getEmployees(){
        let res = await this.request(`employee/all`);
        return res.employees;
    }

    static async signup(data){
        let res = await this.request('employee/', data, 'post');
        return res.token
    }

    static async login(data){
        let res = await this.request('employee/login', data, 'post');
        return res.token
    }
    // static async getEmployees(){
    //     let res = await this.request('employee/all');
    //     return(
    //         res.employees
    //     )
    // }
}

export default DeliveryApi;