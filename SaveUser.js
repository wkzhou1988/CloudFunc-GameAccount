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
        let _data = {}
        if (event.body !== undefined) {
            let body = JSON.parse(event.body)
            _id = body.id
            _data = body.data
        } else {
            _id = event.id
            _data = event.data
        }
        const collection = db.collection('users')
        const updateResult = await collection.doc(_id)
            .set({data: _data})
        return done()

    } catch (e) {
        console.error(e)
        return err(e.message)
    }
};
