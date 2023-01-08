import axios from "axios";
import { ApiPaginatedSearchResponse } from "./ApiPaginatedSearchResponse";
import { CreateUserRequest } from "./CreateUserRequest";
import { Message } from "./Message";
import { Product } from "./Product";
import { SearchExpression } from "./SearchExpression";
import { Thread, ThreadForPost } from "./Thread";
import { UserLoginRequest } from "./UserLoginRequest";
const LOCAL_API_BASE_URL = "http://localhost:8000";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("sitelineKey")}`;

/**
 * 
 */
export async function createUser(
	signupForm: CreateUserRequest
): Promise<any> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/user/`, signupForm)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * 
 */
export async function login(
	loginRequest: UserLoginRequest
): Promise<any> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/user/login`, loginRequest)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * Get a single product
 * @param productId - the product ID
 * @return A promise that resolves to a single product.
 */
 export async function addProduct(
	product: Product
): Promise<any> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/product/`, product)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * Get a single product
 * @param productId - the product ID
 * @return A promise that resolves to a single product.
 */
export async function updateProduct(
	productId: string,
	product: Partial<Product>
): Promise<any> {
	return axios
		.patch(`${LOCAL_API_BASE_URL}/product/${productId}`, product)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * 
 */
export async function deleteProduct(
	productId: string
): Promise<any> {
	return axios
		.delete(`${LOCAL_API_BASE_URL}/product/${productId}`)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * Get a single product
 * @param productId - the product ID
 * @return A promise that resolves to a single product.
 */
 export async function getSingleProduct(
	productId: string
): Promise<any> {
	return axios
		.get(`${LOCAL_API_BASE_URL}/product/${productId}`)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * Search all products.
 */
 export async function searchAllProducts(
	searchExpression: SearchExpression
): Promise<ApiPaginatedSearchResponse<Product>> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/product/search`, searchExpression)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
			return [];
		});
}



/**
 * Get a single product
 * @param productId - the product ID
 * @return A promise that resolves to a single product.
 */
export async function getFeedback(
	userId: string,
): Promise<any> {
	return axios
		.get(`${LOCAL_API_BASE_URL}/feedback/${userId}`)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			throw error;
		});
}

/**
 * Search all products.
 */
 export async function postFeedback(
	feedbackId: string | undefined,
	message: { userId: string, fromId: string, message: string }
): Promise<ApiPaginatedSearchResponse<Product>> {
	let url = `${LOCAL_API_BASE_URL}/feedback/`;
	if ( feedbackId ) {
		url = `${url}${feedbackId}`;
	}
	return axios
		.post(url, message)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			throw error.response.data;
		});
}

/**
 * 
 */
export async function getMe(
): Promise<any> {
	return axios
		.get(`${LOCAL_API_BASE_URL}/user/me`)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			throw error;
		});
}

/**
 * Get a single product
 * @param threadId - the thread ID
 * @return A promise that resolves to a single product.
 */
 export async function getThread(
	threadId: string
): Promise<any> {
	return axios
		.get(`${LOCAL_API_BASE_URL}/message/${threadId}`)
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
 export async function postMessage(
	threadId: string,
	message: { message: string, userId: string }
): Promise<any> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/message/${threadId}`, message)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}

/**
 * Get a single product
 * @param thread - the thread ID
 * @return A promise that resolves to a single product.
 */
export async function startThread(
	thread: ThreadForPost
): Promise<any> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/message`, thread)
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
	searchExpression: SearchExpression
): Promise<any> {
	return axios
	.post(`${LOCAL_API_BASE_URL}/message/search`, searchExpression)
		.then(function(response) {
			return response.data;
		})
		.catch(function(error) {
			console.error(error);
		});
}