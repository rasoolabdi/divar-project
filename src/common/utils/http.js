const { default: axios } = require("axios")
require("dotenv").config();

const getAddressUserDetail = async (lat, lng) =>  {
    const result = await axios.get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lng}` , {
        headers: {
            "x-api-key" : process.env.MAP_API_KEY
        }
    }).then((res) => {
        return res.data;
    });

    return {
        address: result.address,
        province: result.province,
        city: result.city,
        district: result.region,
        alley: result.name,
    }
};

module.exports = { getAddressUserDetail };
