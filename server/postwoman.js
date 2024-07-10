const express = require('express');
const router = express.Router();

const postwomanURL = "https://postwoman.attaditya.tech/";
let cachedData = {};

async function fetchPostwomanHTML() {
    if (cachedData.HTML) {
        return cachedData.HTML;
    }

    let response = await fetch(postwomanURL);
    let data = await response.text();

    cachedData.HTML = data;
    return data;
}

router.get("/", async (req, res) => {
    const data = await fetchPostwomanHTML();
    res.send(data);
});

fetchPostwomanHTML();

module.exports = router;

