import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

export async function comparePasswordHash(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}
