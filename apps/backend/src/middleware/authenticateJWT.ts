import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('🚨 No token provided');

    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // ✅ Ensure user exists in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {

      res.status(401).json({ error: 'User not found' });
      return;
    }

    (req as any).user = user; // ✅ Attach user object to request
    next();
  } catch (error) {
    console.log('🚨 Invalid token:', error);
    res.status(403).json({ error: 'Invalid token' });
  }
};
