const axios = require("axios");

const triggerN8n = async (payload) => {

    try {

        await axios.post(

            "http://localhost:5678/webhook/focus-session",

            payload

        );

        console.log(
            "n8n triggered successfully"
        );

    }

    catch (error) {

        console.log(

            "n8n webhook error:",

            error.message

        );

    }

};

module.exports = triggerN8n;