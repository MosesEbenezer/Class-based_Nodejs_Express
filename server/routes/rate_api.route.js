import "babel-polyfill";
import { Router } from "express";
import RateApiController from "../controller/RateApiController";

//initialize route here
const route = Router();

route.get("/rates", RateApiController._makeRequest);

export default route;
