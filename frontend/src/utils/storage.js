export const saveSession = (session) => {

    const sessions =
        JSON.parse(
            localStorage.getItem("focusSessions")
        ) || [];

    sessions.push(session);

    localStorage.setItem(
        "focusSessions",
        JSON.stringify(sessions)
    );

};

export const getSessions = () => {

    return (
        JSON.parse(
            localStorage.getItem("focusSessions")
        ) || []
    );

};