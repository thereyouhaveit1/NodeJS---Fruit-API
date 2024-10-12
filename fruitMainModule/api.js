const superagent = require('superagent');
const base = 'https://www.fruityvice.com';


const getId = async (id) => {
    try {

const quoteUrl = `${base}/api/fruit/${id}`;
const res = await superagent.get(quoteUrl);


    console.log(res.body);
    return res.body;
    }
    catch (error) {
    console.log(error);
    }
    };


const getFruit = async (search) => {
try {

const quoteUrl = `${base}/api/fruit/${search}`;
const res = await superagent.get(quoteUrl);

console.log(res.body);
return res.body;
}
catch (error) {
console.log(error);
}
};


module.exports = {
    getFruit,
getId,


};
