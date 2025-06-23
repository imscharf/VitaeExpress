module.exports = {
    dbURI: process.env.DB_URI || 'mongodb+srv://joaoscharf:v1t43xpr322@original.ykt5qyu.mongodb.net/?retryWrites=true&w=majority&appName=Original',
    jwtSecret: process.env.JWT_SECRET || 'seu-segredo-jwt',
};