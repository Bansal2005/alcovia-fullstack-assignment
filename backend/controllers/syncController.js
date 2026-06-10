const fs = require("fs");
const path = require("path");

const dbPath = path.join(
    __dirname,
    "../data/db.json"
);

const syncData = (req, res) => {

    const incoming = req.body;

    const db = JSON.parse(
        fs.readFileSync(dbPath)
    );

    (incoming.focusSessions || []).forEach(item => {

        const exists =
            db.focusSessions.find(
                session =>
                    session.id === item.id
            );

        if (!exists) {

            db.focusSessions.push(item);

        }

    });

    (incoming.syllabus || []).forEach(item => {

        const exists =
            db.syllabus.find(
                task =>
                    JSON.stringify(task) ===
                    JSON.stringify(item)
            );

        if (!exists) {

            db.syllabus.push(item);

        }

    });

    fs.writeFileSync(

        dbPath,

        JSON.stringify(
            db,
            null,
            2
        )

    );

    res.json({

        success: true,

        message: "Sync completed"

    });

};

const getState = (req, res) => {

    const db =
        JSON.parse(
            fs.readFileSync(
                dbPath
            )
        );

    res.json(db);

};

module.exports = {

    syncData,

    getState

};