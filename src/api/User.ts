export type EmailPreferences = "none" | "messageCenter" | "everything";

/**
 * The definition of a User
 */
export interface User {
	/**
	 * The unique user Id.
	 */
	id: string;
	/**
	 * The user's linked email address.
	 */
	email: string | undefined;
	/**
	 * The user's username.
	 */
	displayName: string | undefined;
	/**
	 * The timestamp of when the user created their account.
	 */
	createdTimestamp: number;
	/**
	 * 
	 */
	emailPreferences: EmailPreferences;
}
