if (process.env.NODE_ENV !== 'production') require('dotenv/config')


const variables = {
    port: process.env.PORT,
    api_positus_authorization: process.env.API_POSITUS_AUTHORIZATION,
    api_positus_host: process.env.API_POSITUS_HOST,
    api_positus_key_number: process.env.API_POSITUS_KEY_NUMBER,
    api_sz_api_key: process.env.API_SZ_API_KEY,
    api_sz_host: process.env.API_SZ_HOST,
}

module.exports = variables;