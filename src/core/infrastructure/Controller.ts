import { Response } from "express";
import { IMetadataObject } from "@core/types/IMetadataObject";
import { Validator } from "@core/logic/Validator";


export abstract class Controller {

    protected async getValidatedData(
        data: string | IMetadataObject,
        validatorSchema: IMetadataObject
    ) {
        const metaData = typeof data === "string" ? JSON.parse(data) : data;
        new Validator(validatorSchema, metaData).validate();

        return metaData;
    }

    protected abstract executeImplementation(req: Request, res: Response): Promise<unknown>;

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.executeImplementation(req, res);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public static jsonResponse(res: Response, code: number, message: string) {
        return res.status(code).json({ message });
    }

    public ok<T>(res: Response, dto?: T) {
        if (!!dto) {
            return res.status(200).json(dto);
        } else {
        return res.sendStatus(200);
        }
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    public noContent(res: Response) {
        return res.sendStatus(204);
    }

    public badRequest(res: Response, message: string) {
        return res.status(400).json({ message });
    }

    public unauthorized(res: Response, message: string) {
        return res.status(401).json({ message });
    }

    public forbidden(res: Response, message: string) {
        return res.status(403).json({ message });
    }

    public notFound(res: Response, message: string) {
        return res.status(404).json({ message });
    }

    public conflict(res: Response, message: string) {
        return res.status(409).json({ message });
    }

    public internalServerError(res: Response, message: string) {
        return res.status(500).json({ message });
    }
}