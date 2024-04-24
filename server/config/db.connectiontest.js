import dotenv from 'dotenv';
dotenv.config({path: "../.env"})

import axios from 'axios';

let data = [
    {
        "collection": "customers",
        "database": "APIzza",
        "dataSource": "honeynutcluster",
        // "projection": {
        //     "_id": 1
        // }
    },
    {
        "collection": "customers",
        "database": "FindFamiliar",
        "dataSource": "honeynutcluster",
        // "projection": {
        //     "_id": 1
        // }
    },
]



for (let d of data) {
    var config = {
        method: 'post',
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/data-ghhyb/endpoint/data/v1/action/findOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': `${process.env.MDB_APIKEY}`,
        },
        data: JSON.stringify(d)
    };

    axios(config)
    .then(function (response) {
        console.log(d.database, ":  ", JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}
