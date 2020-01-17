import rest from "@lib/crud/rest";

export const get = rest("customer").list();
export const post = rest("customer").post();