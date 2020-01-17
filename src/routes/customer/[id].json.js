import rest from "@lib/crud/rest";

export const get = rest("customer").get();
export const patch = rest("customer").patch();
export const del = rest("customer").del();