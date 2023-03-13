import axios from "axios";
import { jwt, parseJwt } from "jsonwebtoken";

const BASE_URL = 'http://localhost:3001';

//classes making get send request to the API
//shouldn't be any front end specific things here
//shouldn't be any API stuff elsewhere 

class DeliveryApi{
    static token;
    static async request(endPoint, data = {}, method = 'get'){
        const url = `${BASE_URL}/${endPoint}`;
        const headers = DeliveryApi.token
        ? {Authorization: `Bearer ${DeliveryApi.token}`}
        :{};
        const params = method === 'get'? data:{};
        try{
            return(await axios({url, method, data, params, headers})).data;
        }catch(err){
            console.error('API error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message)?message:[message];
        }
    }

    //get the current user
    static async getCurrentUser(){
        if(!this.token){
            return undefined;
        }
        console.log('test1', parseJwt);
        const{ userId } = jwt.decode(this.token);
        console.log('userID', userId);
        let res = await this.request(`employee/${userId}`);
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