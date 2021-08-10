const szchatMiddleware = require("../middleware/szchat");
const positusMiddleware = require("../middleware/positus");


module.exports = {
    /**
     * Recebe da Positus e envia para o Sz (canal genérico)
     * @param {*} req 
     * @param {*} res 
     * @returns status code
     */
    async receivePositus(req, res) {
        const { body } = req;

        try {
            const contact = body.contacts[0];
            const messages = body.messages[0];
            const returnDataJson = {
                "contacts": [
                    {
                        "profile": {
                            "name": contact.profile.name
                        },
                        "platform_id": contact.wa_id
                    }
                ],
                "messages": [
                    {
                        "from": messages.from,
                        "id": messages.id,
                        "timestamp": messages.timestamp,
                        "type": messages.type
                    }
                ]
            };
            addTextJson(messages, returnDataJson);
            addImageJson(messages, returnDataJson);

            const statusResponse = await szchatMiddleware.sendMessage(returnDataJson);
            return res.sendStatus(statusResponse);

        } catch (e) {
            console.log("Erro ao receber mensagem da Positus!!!");
            console.log(e.message);
            return res.sendStatus(400);
        }


        function addTextJson(data, returnDataJson) {
            if (data.type === "text") {
                returnDataJson.messages[0].text = data.text
            }
        }

        function addImageJson(data, returnDataJson) {
            if (data.type === "image") {
                returnDataJson.messages[0].image = {
                    "url": data.image.link,
                    "mime_type": data.image.mime_type,
                    "caption": data.image.caption
                }
            }
        }

    },

    /**
     * Recebe do Sz (canal genérico) e envia para a Positus
     * @param {*} req 
     * @param {*} res 
     * @returns status code
     */
    async receiveSzChat(req, res) {

        const { body } = req;
        try {
            const returnDataJson = {
                "to": "+" + body.to,
                "type": body.type
            };

            addTextJson(body, returnDataJson);
            addAudioJson(body, returnDataJson);
            addImageJson(body, returnDataJson);
            addDocumentJson(body, returnDataJson);
            addVideotJson(body, returnDataJson);

            const statusResponse = await positusMiddleware.sendMessage(returnDataJson);
            return res.sendStatus(statusResponse);


        } catch (e) {
            console.log("Erro ao receber mensagem do Sz!!!");
            console.log(e.message);
            return res.sendStatus(400);
        }

        function addTextJson(data, returnDataJson) {
            if (data.type === "text") {
                returnDataJson.text = data.text;
            }
        }

        function addAudioJson(data, returnDataJson) {
            if (data.type === "audio") {
                returnDataJson.audio = {
                    "link": data.audio.url
                };
            }
        }

        function addImageJson(data, returnDataJson) {
            if (data.type === "image") {
                returnDataJson.image = {
                    "link": data.image.url,
                    "caption": data.image.caption
                }
            }
        }

        function addDocumentJson(data, returnDataJson) {
            if (data.type === "document") {
                returnDataJson.document = {
                    "link": data.document.url,
                    "filename": data.document.filename,
                    "mime_type": data.document.mime_type,
                    "caption": data.document.caption
                }
            }
        }

        function addVideotJson(data, returnDataJson) {
            if (data.type === "video") {
                returnDataJson.video = {
                    "link": data.video.url,
                    "caption": data.video.caption
                }
            }
        }
    }
}