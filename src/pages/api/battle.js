import axios from 'axios'

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let pokemon1;
        let pokemon2;
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.body.pokemon1)
            .then(function (response) {
                pokemon1 = response;
            })
            .catch(function (error) {
                res.status(400); //failure
                console.log(error);
            })
        await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.body.pokemon2)
            .then(function (response) {
                pokemon2 = response;
            })
            .catch(function (error) {
                res.status(400); //failure
                console.log(error);
            })
        if (pokemon1.data.stats[0].base_stat == pokemon2.data.stats[0].base_stat) {
            res.status(200);
            return res.json({ "winner": "Tie" });
        } else if (pokemon1.data.stats[0].base_stat < pokemon2.data.stats[0].base_stat) {
            res.status(200);
            return res.json({ "winner": req.body.pokemon2 });
        } else {
            res.status(200);
            return res.json({ "winner": req.body.pokemon1 });
        }
    }
}