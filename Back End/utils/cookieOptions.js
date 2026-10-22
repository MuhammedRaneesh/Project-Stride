export const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 14 * 24 * 60 * 60 * 1000,
    };
};

export const getClearCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        expires: new Date(0),
    };
};
