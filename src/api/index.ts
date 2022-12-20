import axios from "axios";
import { ApiPaginatedSearchResponse } from "./ApiPaginatedSearchResponse";
import { Message } from "./Message";
import { Product } from "./Product";
import { SearchExpression } from "./SearchExpression";
const LOCAL_API_BASE_URL = "http://localhost:8000";

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
			console.log(response)
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
			console.log(response)
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
	threadId: string | undefined,
	message: { message: string }
): Promise<any> {
	return axios
		.post(`${LOCAL_API_BASE_URL}/message/${threadId || null}`, message)
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