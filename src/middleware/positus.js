const axios = require("axios");
const variables = require("../config/variables");

module.exports = {

    async sendMessage(returnDataJson) {
        const config = {
            headers: {
                "Authorization": variables.api_positus_authorization,
                "Content-Type": "application/json"
            }
        }

        try {
            //verificar response
            const response = await axios.post(`${variables.api_positus_host}/${variables.api_positus_key_number}/messages`,
                returnDataJson,
                config
            );
            return 200;
        } catch (err) {
            console.log("Falha ao enviar mensagem (API Positus)!!!");
            console.log(err.message);
            return 400;
        };
    }

}