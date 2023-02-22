import axios from 'axios'

export default function handler(req, res) {
    if (req.method == 'GET') {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + req.;
        axios.get(url)
            .then(function (response) {
                const type = [];
                response.data.types.forEach(element => {
                    type.push(element.type.name);
                });
                res.status(200); //success
                return res.json({"name": response.data.name, 
                                "sprite": response.data.sprites.front_shiny, 
                                "types": type})
            })
            .catch(function (error) {
                res.status(400); //failure
                console.log(error);
            })
    }
}