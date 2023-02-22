//   api/ endpoint
import axios from 'axios'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export default function handler(req, res) {
    if (req.method == 'GET') {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + getRandomInt(1, 1009);
        axios.get(url)
            .then(function (response) {
                const type = [];
                response.data.types.forEach(element => {
                    type.push(element.type.name);
                });
                return res.json({"name": response.data.name, 
                                "sprite": response.data.sprites.front_shiny, 
                                "types": type})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}