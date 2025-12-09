import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/credentials.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || JWT_SECRET, {
        expiresIn: '30d',
    });
};

export default generateToken;
