import { Request, Response } from "express";

export interface Controller {
    get?: (req: Request, res: Response) => void
    post?: (req: Request, res: Response) => void
    put?: (req: Request, res: Response) => void
    del?: (req: Request, res: Response) => void
}