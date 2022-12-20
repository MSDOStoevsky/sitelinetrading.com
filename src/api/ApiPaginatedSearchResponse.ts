/**
 * The pagination info.
 */
interface PageInfo {
	/**
	 * The total number of items in the search.
	 */
	totalItems: number;
	/**
	 * The current page being requested.
	 */
	currentPage: number;
	/**
	 * The total number of pages available.
	 */
	totalPages: number;
}

/**
 *
 */
export interface ApiPaginatedSearchResponse<T> {

	/**
	 * The list of data items from the api.
	 */
	data: ReadonlyArray<T>;
	/**
	 * The current {@link PageInfo}
	 */
	pageInfo: PageInfo;
}