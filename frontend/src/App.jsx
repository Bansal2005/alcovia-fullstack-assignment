import axios from "axios";

import FocusSession from "./components/FocusSession";

import SyllabusProgress from "./components/SyllabusProgress";

function App() {

    const syncData = async () => {

        try {

            const focusSessions =
                JSON.parse(
                    localStorage.getItem(
                        "focusSessions"
                    )
                ) || [];

            const syllabus =
                JSON.parse(
                    localStorage.getItem(
                        "syllabus"
                    )
                ) || [];

            const response =
                await axios.post(

                    "http://localhost:5000/api/sync",

                    {

                        focusSessions,

                        syllabus

                    }

                );

            alert(
                response.data.message
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Sync Failed"
            );

        }

    };

    return (

        <div>

            <h1>

                Alcovia Assignment

            </h1>

            <button
                onClick={syncData}
            >

                Sync Data

            </button>

            <hr />

            <FocusSession />

            <hr />

            <SyllabusProgress />

        </div>

    );

}

export default App;