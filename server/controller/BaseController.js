import "babel-polyfill";
import fetch from "node-fetch";

/**
 * this is an Interface that has the response methods and every class
 * implementing this interface must implement the methods
 */

class BaseController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /** handle response errors */
  static _responseError = (res, error_msg, code) => {
    res.status(code).json({ error_msg });
  };

  /** handle successful response */
  static _responseSuccess = (res, results, code) => {
    //return json response
    res.status(code).json({ results });
  };

  /** get data from rates api */
  static fetchData = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error();
    }
  };
}

export default BaseController;
