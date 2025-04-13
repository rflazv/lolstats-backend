import { Request } from "express";

export interface IAuthenticatedRequest extends Request {
    userEmail?: string;
}