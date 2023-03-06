import axios from 'axios'

function randNum(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

export default async function handler(req, res) {
    if (req.method == 'POST') {
        axios.get("https://pokeapi.co/api/v2/pokemon/" + req.body.pokemon)
            .then(function (response) {
                let maxHP = response.data.stats[0].base_stat;
                let currentHP = randNum(1, maxHP);
                let N = randNum(1, 255);
                let BALL = randNum(1, 255);
                let f = (maxHP * 255 * 4) / (currentHP * BALL);
                res.status(200);
                return res.json({ "caught": f >= N });
            })
            .catch(function (error) {
                res.status(400); //failure
                console.log(error);
            });
    }
}