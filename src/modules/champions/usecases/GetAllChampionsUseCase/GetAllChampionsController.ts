import { GetAllChampionsUseCase } from '@modules/champions';
import { Request, Response } from 'express';

class GetAllChampionsController {
    private getAllChampionsUseCase: GetAllChampionsUseCase;

    constructor(getAllChampionsUseCase: GetAllChampionsUseCase) {
        this.getAllChampionsUseCase = getAllChampionsUseCase;
    }

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const {
                tags,
                page,
                limit,
                search,
                sortBy,
                sortOrder,
            } = req.query;

            const request = {
                tags: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
                page: page ? parseInt(page as string, 10) : undefined,
                limit: limit ? parseInt(limit as string, 10) : undefined,
                search: search as string,
                sortBy: sortBy as string,
                sortOrder: sortOrder as string,
            };

            const result = await this.getAllChampionsUseCase.execute(request);

            if (result.isLeft()) {
                return res.status(400).json({ error: result.value.message });
            }

            return res.status(200).json(result.value);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao obter campeões' });
        }
    }
}

export default GetAllChampionsController;
