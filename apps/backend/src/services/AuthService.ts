import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Store this securely

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || 'fallback-32-character-key'; // Ensure 32 characters

const IV_LENGTH = 16; // For AES, this is always 16

// ✅ Function to encrypt the API token
const encryptToken = (token: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(token);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// ✅ Function to decrypt the API token
const decryptToken = (encryptedToken: string): string => {
  const textParts = encryptedToken.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  return decrypted.toString();
};

class AuthService {
  async register(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    return { token, user };
  }

  async getApiToken(userId: string) {
    const tokenRecord = await prisma.apiToken.findUnique({
      where: { userId },
      select: { token: true },
    });

    if (!tokenRecord) return null;

    return decryptToken(tokenRecord.token);
  }

  async generateApiToken(userId: string) {
    const newApiToken = crypto.randomBytes(32).toString('hex');
    const encryptedToken = encryptToken(newApiToken);

    await prisma.apiToken.upsert({
      where: { userId },
      update: { token: encryptedToken, createdAt: new Date() },
      create: { token: encryptedToken, userId },
    });

    return newApiToken;
  }
}

export default new AuthService();
