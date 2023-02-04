
import axios from "axios";

const LOCAL_API_BASE_URL = "http://localhost:8000/user";
const commonHeaders = {
	headers: { 
		'Authorization': `Bearer ${localStorage.getItem("sitelineKey")}`
	}
}

export async function getMe(
    ): Promise<any> {
        return axios
            .get(`${LOCAL_API_BASE_URL}/me`, commonHeaders)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                throw error;
            });
    }
    
    export async function getUser(userId: string): Promise<any> {
            return axios
                .get(`${LOCAL_API_BASE_URL}/${userId}`, commonHeaders)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error;
                });
    }
    
    
    export async function getUsers(userIdPayload: { userIds: Array<string>}
        ): Promise<any> {
            return axios
                .post(`${LOCAL_API_BASE_URL}/batch`, userIdPayload, commonHeaders)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(error) {
                    throw error;
                });
    }
    