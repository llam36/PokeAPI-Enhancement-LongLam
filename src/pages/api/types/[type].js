import axios from 'axios'

export default function handler(req, res) {
    if (req.method == 'GET') {
        let url = 'https://pokeapi.co/api/v2/type/' + req.query.type;
        axios.get(url)
            .then(function (response) {
                const name = [];
                response.data.pokemon.forEach(element => {
                    name.push(element.pokemon.name);
                });
                res.status(200); //success
                return res.json({"type": response.data.name, 
                                "pokemon": name})
            })
            .catch(function (error) {
                res.status(400); //failure
                console.log(error);
            })
    }
}