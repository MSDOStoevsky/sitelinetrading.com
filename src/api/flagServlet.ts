import axios from "axios";

const LOCAL_API_BASE_URL = "https://sitelinetrading.com:8000/flag";

export async function getFlags(
	userId: string
): Promise<any> {
	return axios
		.get(`${LOCAL_API_BASE_URL}/${userId}`)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}


export async function flagProduct(
	flagSettings: { userId: string, productId: string }
): Promise<any> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/`, flagSettings)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}