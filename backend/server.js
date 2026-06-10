const express = require("express");

const cors = require("cors");

const syncRoutes =
require(
    "./routes/syncRoutes"
);

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api",
    syncRoutes
);

app.get("/", (req, res) => {

    res.json({

        message:
        "Backend Running"

    });

});

app.listen(
    5000,
    () => {

        console.log(
            "Server running on 5000"
        );

    }
);