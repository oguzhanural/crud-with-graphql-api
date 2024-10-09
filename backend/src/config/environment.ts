export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

