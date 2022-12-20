import _ from "lodash";
import { ObjectMap } from "./types";

/**
 * Detects if form is "valid"
 * @param form 
 * @returns 
 */
export function isFormValid(form: ObjectMap<unknown>): boolean {
    return _.isEmpty(form) || _.some(form, (formItem) => (formItem === undefined || formItem === ""));
}