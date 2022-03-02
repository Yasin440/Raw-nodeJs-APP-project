/* 
* Title: Uptime Monitoring Application.
* folder: handle routers.
* Description: A RESTFUl API to monitor up or down time of user defined links
* Author: Md Yasin Miah.
* Date: 25 FEB 2022
*/

//dependencies
const library = require('../../library/data');
const { hash } = require('../../Helpers/utilities');
// module scaffolding
const handler = {};

// about route
handler.userHandler = (requiredProperties, callBack) => {
    const acceptedMethod = ['get', 'put', 'post', 'delete'];
    if (acceptedMethod.indexOf(requiredProperties.method) > -1) {
        handler.action[requiredProperties.method](requiredProperties, callBack);
    } else {
        callBack(405);
    }
};

handler.action = {};

handler.action.post = (requiredProperties, callBack) => {
    const firstName =
        typeof (requiredProperties.body.firstName) === 'string'
            && requiredProperties.body.firstName.trim().length > 0
            ? requiredProperties.body.firstName
            : false;
    const lastName =
        typeof (requiredProperties.body.lastName) === 'string'
            && requiredProperties.body.lastName.trim().length > 0
            ? requiredProperties.body.lastName
            : false;
    const phone =
        typeof (requiredProperties.body.phone) === 'string'
            && requiredProperties.body.phone.trim().length === 11
            ? requiredProperties.body.phone
            : false;
    const password =
        typeof (requiredProperties.body.password) === 'string'
            && requiredProperties.body.password.trim().length > 0
            ? requiredProperties.body.password
            : false;
    const tosAgreement =
        typeof (requiredProperties.body.tosAgreement) === 'boolean'
            && requiredProperties.body.tosAgreement
            ? requiredProperties.body.tosAgreement
            : false;
    if (firstName && lastName && phone && password && tosAgreement) {
        //check if the user exist already
        library.read('users', phone, (err) => {
            if (err) {
                //get user info object
                let userInfoObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                }
                //save user info to data folder
                library.create('users', phone, userInfoObject, (err) => {
                    if (!err) {
                        callBack(200, {
                            message: 'user insert successfully..!'
                        })
                    } else {
                        callBack(500, {
                            error: 'Server site error to insert data!'
                        })
                    }
                })
            } else {
                callBack(500, {
                    error: 'User already exist..!'
                })
            }
        });
    } else {
        callBack(400, {
            error: 'There is an error on user request!'
        })
    }
};
handler.action.get = (requiredProperties, callBack) => { callBack(200) };
handler.action.put = (requiredProperties, callBack) => { callBack(200) };
handler.action.delete = (requiredProperties, callBack) => { };

module.exports = handler;