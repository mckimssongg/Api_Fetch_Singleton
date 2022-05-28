/**
 * @description Api service to make requests to the server and get the response
 * */ export default class fetchData {
  private static instance: fetchData;
  private static _url: string;
  private static _token: string;

  private constructor() {}

  private static init(): void {
    fetchData._url = "http://localhost:8000/";
    fetchData._token = localStorage.getItem("token");
  }

  /**
   *  @description: Initialize an instance if it is not yet created
   *  and it guarantees that it will always be the same instance
   *  @returns {fetchData} instance of the class fetchData
   * */ public static getInstance(): fetchData {
    if (!this.instance) {
      this.init();
      this.instance = new fetchData();
    }

    return this.instance;
  }
  /**
   *  @description: Make a request to the server with the token
   * @param {string} url - url to make the request
   * @param {string} method - method to make the request
   * @param {object} body - body of the request
   * @returns {object} response of the request
   * */ async fetch(url: string, method: any, body: object): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + fetchData._token,
    };
    const response = await fetch(fetchData._url + url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });
    const data = await response.json();
    return data;
  }

  /**
   * @description: Make a request to the server without the token
   * @param {string} url - url to make the request
   * @param {string} method - method to make the request
   * @param {object} body - body of the request
   * @returns {object} response of the request
   * */ async fetchWithoutToken(
    url: string,
    method: any,
    body: object
  ): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(fetchData._url + url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });
    const data = await response.json();
    return data;
  }

  /**
   * @description: Make a request to the server without the token
   * @param {string} url - url to make the request
   * @param {string} method - method to make the request
   * @returns {object} response of the request
   * */ async fetchWithoutTokenAndBody(url: string, method: any): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(fetchData._url + url, {
      method: method,
      headers: headers,
    });
    const data = await response.json();
    return data;
  }
}
