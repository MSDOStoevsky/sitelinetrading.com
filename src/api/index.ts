import axios from "axios";
import FormData from "form-data";
import { ApiPaginatedSearchResponse } from "./ApiPaginatedSearchResponse";
import { CreateUserRequest } from "./CreateUserRequest";
import { MessageSearchExpression } from "./MessageSearchExpression";
import { Product } from "./Product";
import { SearchExpression } from "./SearchExpression";
import { StartThread } from "./Thread";
import { UserLoginRequest } from "./UserLoginRequest";
const API_BASE_URL = "http://sitelinetrading.com:8000";

const commonHeaders = {
	headers: { 
		'Authorization': `Bearer ${localStorage.getItem("sitelineKey")}`
	}
}

export async function createUser(
	signupForm: CreateUserRequest
): Promise<any> {
	return axios
		.post(`${API_BASE_URL}/user/`, signupForm, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

export async function login(
	loginRequest: UserLoginRequest
): Promise<any> {
	return axios
		.post(`${API_BASE_URL}/user/login`, loginRequest, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

 export async function addProduct(
	product: FormData,
): Promise<any> {
	return axios
		.post(`${API_BASE_URL}/product/`, product, {
			headers: {
				"Content-Type": `multipart/form-data`,
				...commonHeaders.headers
			}
		})
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

export async function updateProduct(
	productId: string,
	product: FormData
): Promise<any> {
	return axios
		.patch(`${API_BASE_URL}/product/${productId}`, product, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

export async function deleteProduct(
	productId: string
): Promise<any> {
	return axios
		.delete(`${API_BASE_URL}/product/${productId}`, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

 export async function getSingleProduct(
	productId: string
): Promise<any> {
	return axios
		.get(`${API_BASE_URL}/product/${productId}`, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

export async function searchAllProducts(
	searchExpression: SearchExpression
): Promise<ApiPaginatedSearchResponse<Product>> {
	return axios
		.post(`${API_BASE_URL}/product/search`, searchExpression, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
			return [];
		});
}


export async function getFeedback(
	userId: string,
): Promise<any> {
	return axios
		.get(`${API_BASE_URL}/feedback/${userId}`, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			throw error;
		});
}

 export async function postFeedback(
	feedbackId: string | undefined,
	message: { userId: string, fromId: string, message: string }
): Promise<ApiPaginatedSearchResponse<Product>> {
	let url = `${API_BASE_URL}/feedback/`;
	if ( feedbackId ) {
		url = `${url}${feedbackId}`;
	}
	return axios
		.post(url, message, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			throw error.response.data;
		});
}

 export async function getThread(
	threadId: string
): Promise<any> {
	return axios
		.get(`${API_BASE_URL}/message/${threadId}`, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

 export async function postMessage(
	threadId: string,
	message: { message: string, userId: string }
): Promise<any> {
	return axios
		.post(`${API_BASE_URL}/message/${threadId}`, message, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

export async function startThread(
	thread: StartThread
): Promise<any> {
	return axios
		.post(`${API_BASE_URL}/message`, thread, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * Get a single product
 * @param threadId - the thread ID
 * @return A promise that resolves to a single product.
 */
 export async function searchThreads(
	searchExpression: MessageSearchExpression
): Promise<any> {
	return axios
	.post(`${API_BASE_URL}/message/search`, searchExpression, commonHeaders)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}