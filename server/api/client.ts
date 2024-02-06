import { type FetchOptions } from "ofetch";

export default class Client {
  baseUrl: string;
  options?: FetchOptions;

  constructor(baseUrl: string, options?: FetchOptions) {
    this.baseUrl = baseUrl;
    this.options = options;
  }

  async raw<T>(
    url: string,
    method:
      | "GET"
      | "POST"
      | "PATCH"
      | "DELETE"
      | "get"
      | "post"
      | "patch"
      | "delete",
    options: FetchOptions
  ) {
    try {
      const data = await $fetch.raw<T>(`${this.baseUrl}${url}`, {
        ...options,
        ...this.options,
        method,
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async get<T>(url: string, options?: FetchOptions) {
    try {
      const data = await $fetch<T>(`${this.baseUrl}${url}`, {
        ...options,
        ...this.options,
        method: "GET",
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async post<T>(url: string, options?: FetchOptions) {
    try {
      const data = await $fetch<T>(`${this.baseUrl}${url}`, {
        ...options,
        ...this.options,
        method: "POST",
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async put<T>(url: string, options?: FetchOptions) {
    try {
      const data = await $fetch<T>(`${this.baseUrl}${url}`, {
        ...options,
        ...this.options,
        method: "PUT",
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async delete<T>(url: string, options?: FetchOptions) {
    try {
      const data = await $fetch<T>(`${this.baseUrl}${url}`, {
        ...options,
        ...this.options,
        method: "DELETE",
      });

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
