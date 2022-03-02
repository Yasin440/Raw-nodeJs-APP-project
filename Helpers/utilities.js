/* 
* Title: Uptime Monitoring Application.
* folder: utilities.js.
* Description: A RESTFUl API to monitor up or down time of user defined links
* Author: Md Yasin Miah.
* Date: 27 FEB 2022
*/

//dependencies
const crypto = require('crypto');

// module scaffolding
const utilities = {};

//parse JSON string to object
utilities.parseJSON = (stringJson) => {
    let outPut;
    try {
        outPut = JSON.parse(stringJson);
    } catch {
        outPut = {};
    }
    return outPut;
};
//hashing
utilities.hash = (string) => {
    if (typeof (string) === 'string' && string.length > 0) {
        const hash = crypto
            .createHmac('sha256', 'secretKey')
            .update(string)
            .digest('hex');
        return hash;
    } else {
        return false;
    }
}

module.exports = utilities;