export const getDataFromStorage = () => {
    const data = localStorage.getItem("data");

    return data !== null ? JSON.parse(data) : {};
}

export const saveInStorage = (index, time, reverse) => {
    const data = {
        index,
        time,
        reverse
    }

    const json = JSON.stringify(data);

    localStorage.setItem("data", json);
}