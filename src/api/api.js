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
        let res = await this.request(`employee/${userId}`);
        return res.employee;
    }

    static async getEmployees(){
        let res = await this.request(`employee/all`);
        return res.employees;
    }

    static async signupEmployee(data){
        let res = await this.request('employee/', data, 'post');
        return res.token
    }

    static async signupCustomer(data){
      let res = await this.request('customer/', data, 'post');
      return res.token
  }

    static async employeeLogin(data){
        let res = await this.request('employee/login', data, 'post');
        return res.token
    }

    static async customerLogin(data){
      let res = await this.request('customer/login', data, 'post');
      console.log('jwt', jwt_decode(res.token))
      return res.token
  }
}
export default DeliveryApi;