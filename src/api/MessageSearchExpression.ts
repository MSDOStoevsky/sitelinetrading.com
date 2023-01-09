export type FilterExpression = Record<string, string | boolean>;

/**
 * The product search expression.
 */
export interface MessageSearchExpression {
	filterExpression?: FilterExpression;
	page: number;
	pageSize: number;
}
