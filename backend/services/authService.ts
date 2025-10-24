import { User } from '../api/models/User';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const registerUser = async (userData: User) => {
    // Logic for registering a new user
};

export const loginUser = async (email: string, password: string) => {
    // Logic for authenticating a user
    const user = await User.findOne({ email });
    if (user && user.password === password) {
        return generateToken(user);
    }
    throw new Error('Invalid credentials');
};

const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

export const validateToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};