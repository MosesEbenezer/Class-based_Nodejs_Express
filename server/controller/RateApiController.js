import "babel-polyfill";
import BaseController from "./BaseController";

class RateApiController extends BaseController {
  constructor(req, res) {
    super(req, res);
    this.req = req;
    this.res = res;
  }

  static _makeRequest = async (req, res) => {
    const validParams = await RateApiController.validateRequest(req.query);
    if (validParams == true) {
      const { base, currency } = await req.query;
      try {
        const result = await RateApiController.fetchData(
          `${process.env.RATE_BASE_URI}?base=${base}`
        );
        const currency_array = currency.split(",");

        let new_rates = {};

        currency_array.map((content) => {
          if (result.rates.hasOwnProperty(content)) {
            new_rates = { ...new_rates, [content]: result.rates[content] };
          }
        });
        const results = {
          base: result.base,
          date: result.date,
          rates: new_rates,
        };
        RateApiController._responseSuccess(res, results, 200);
      } catch (error) {}
    } else {
      const error_msg = {
        message: "sorry, missed out query string or invalid query string",
      };
      RateApiController._responseError(res, error_msg, 400);
    }
  };

  /** validate request parameter sent */
  static validateRequest = async (query) => {
    let response;
    if (
      query.hasOwnProperty("base") &&
      query.hasOwnProperty("currency") &&
      Object.keys(query).length == 2
    ) {
      response = true;
    } else {
      response = false;
    }

    return response;
  };
}
export default RateApiController;
