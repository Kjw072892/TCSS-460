import { Request, Response, NextFunction } from "express";

export const logger = (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${request.method} ${request.path}`);
  next(); //The next function passes the request to the next module
};
