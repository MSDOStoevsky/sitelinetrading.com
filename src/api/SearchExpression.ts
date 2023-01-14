export type Order = "ASC" | "DESC";
/**
 * The order expression.
 */
export interface OrderExpression {
	field: string;
	order: Order;
}

export type FilterExpression = Record<string, string | boolean>;

/**
 * The product search expression.
 */
export interface SearchExpression {
	filterExpression?: FilterExpression;
	select: string[] | "*";
	orderBy: OrderExpression;
	page: number;
	pageSize: number;
}
