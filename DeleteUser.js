'use strict';
const tcb = require("@cloudbase/node-sdk")
const app = tcb.init({})
const db = app.database()


function done(data) {
    return {ok: true, data: data}
}

function err(msg) {
    return {err: msg}
}

exports.main = async (event, context) => {
    try {
        let _id = ""
        if (event.body !== undefined) {
            _id = JSON.parse(event.body).id
        } else {
            _id = event.id
        }

        let result = await db.collection("users")
            .doc(_id)
            .remove()
        console.log(result)
        return done()
    } catch (e) {
        console.error(e)
        return err(e.message)
    }
};
