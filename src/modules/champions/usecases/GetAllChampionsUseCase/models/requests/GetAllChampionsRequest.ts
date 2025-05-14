export interface IGetAllChampionsRequest {
    tags?: string[];
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'name' | 'tags' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}
