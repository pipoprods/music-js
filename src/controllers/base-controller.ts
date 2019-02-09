import { Request } from 'express';
import { Base } from '@models/base';

export class BaseController {
    constructor() {
    }

    // Data pagination
    // Uses request arguments
    //      - count: number
    //      - offset: number
    protected paginateData(req: Request, data: Base[]): any[] {
        let count = Number(req.query.count) || data.length;
        let offset = Number(req.query.offset) || 0;
        return data.slice(offset * count, (offset + 1) * count).map(o => o.perpareForResponse());
    }
}