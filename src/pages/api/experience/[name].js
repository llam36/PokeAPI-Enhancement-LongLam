import axios from 'axios'

export default function handler(req, res) {
    if (req.method == 'GET') {
        const name = req.query.name;
        const level = req.query.level;
        axios.get('https://pokeapi.co/api/v2/pokemon-species/' + name)
            .then(function (response) {
                let experience;
                if(response.data.growth_rate.name == "slow") {
                    experience = ((level ** 3) * 5) / 4;
                } else if (response.data.growth_rate.name == "medium-slow") {
                    experience = (((level ** 3) * 6)/5) - (15*(level ** 2)) + (100*level) - 140;
                } else if (response.data.growth_rate.name == "medium") {
                    experience = (level ** 3);
                } else if (response.data.growth_rate.name == "fast") {
                    experience = ((level ** 3)*4)/5;
                } else if (response.data.growth_rate.name == "slow-then-very-fast") {
                    if (level < 50) {
                        experience = ((level ** 3) * (100-level)) / 50;
                    } else if (level >= 50 && level < 68) {
                        experience = ((level ** 3) * (150 - level)) / 100;
                    } else if (level >= 68 && level < 98) {
                        experience = ((level ** 3) * (Math.floor((1911-10*level)/3)))/500;
                    } else if (level >= 98 && level < 100) {
                        experience = ((level ** 3)(160-level))/100;
                    }
                } else if (response.data.growth_rate.name == "fast-then-very-slow") {
                    if(level < 15) {
                        experience = ((level ** 3) * (Math.floor((level + 1)/3) + 24))/50;
                    } else if (level >= 15 && level < 36) {
                        experience = ((level ** 3) * (level + 14))/50;
                    } else if (level >= 36 && level < 100) {
                        experience = ((level ** 3) * (Math.floor(level/2) + 32))/50;
                    }
                }
                res.status(200);
                return res.json({"experience": experience});
            })
            .catch(function (error) {
                res.status(400); //failure
                console.log(error);
            })
    }
}