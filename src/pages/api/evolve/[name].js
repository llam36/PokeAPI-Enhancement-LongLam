import axios from 'axios'

export default function handler(req, res) {
    if (req.method == 'GET') {
        let name_url = 'https://pokeapi.co/api/v2/pokemon-species/' + req.query.name;
        axios.get(name_url)
            .then(function (response) {
                let evolution_url = response.data.evolution_chain.url;
                console.log(evolution_url);
                axios.get(evolution_url)
                    .then(function (response) {
                        if (response.data.chain.species.name == req.query.name) {
                            res.status(200);
                            return res.json({
                                "evolution": response.data.chain.evolves_to.length > 0 ?
                                    response.data.chain.evolves_to[0].species.name :
                                    req.query.name
                            });
                        }
                        if (response.data.chain.evolves_to.length > 0
                            && response.data.chain.evolves_to[0].species.name == req.query.name) {
                            res.status(200);
                            return res.json({
                                "evolution": response.data.chain.evolves_to[0].evolves_to.length > 0 ?
                                    response.data.chain.evolves_to[0].evolves_to[0].species.name :
                                    req.query.name
                            });
                        }
                        if (response.data.chain.evolves_to.length > 0
                            && response.data.chain.evolves_to[0].evolves_to.length > 0
                            && response.data.chain.evolves_to[0].evolves_to[0].species.name == req.query.name) {
                            res.status(200);
                            return res.json({
                                "evolution": req.query.name
                            });
                        }
                    })
                    .catch(function (error) {
                        res.status(400); //failure
                        console.log(error);
                    })
            })
            .catch(function (error) {
                res.status(400); //failure
                console.log(error);
            })
    }
}