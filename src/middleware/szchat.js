const axios = require("axios");
const variables = require("../config/variables");

module.exports = {

    async sendMessage(returnDataJson) {
        const config = {
            headers: {
                "API-KEY": variables.api_sz_api_key,
                "Content-Type": "application/json"
            }
        }

        try {
            //verificar response
            const response = await axios.post(variables.api_sz_host + "/api/v4/generic/messages/send", returnDataJson, config);
            console.log("sucesso");
            return 200;
        } catch (err) {
            console.log("Falha ao enviar mensagem (API Sz.Chat)!!!");
            console.log(err.message)
            return 400;
        };
    }

}