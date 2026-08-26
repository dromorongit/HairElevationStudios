import { Request, Response, NextFunction } from 'express';
interface AuthRequest extends Request {
    admin?: any;
}
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
