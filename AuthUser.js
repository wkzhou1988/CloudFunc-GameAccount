
'use strict';
const tcb = require("@cloudbase/node-sdk")
const http = require('http')
const axios = require('axios')
const app = tcb.init({})
const db = app.database()
const _appId = ""
const _secret = ""

function done(data) {
    return {ok: true, data: data}
}

function err(msg) {
    return {err: msg}
}

exports.main = async (event, context) => {
    try {
        let _code = ""  
        console.log(JSON.stringify(event))
        if (event.body !== undefined) {
            let a = JSON.parse(JSON.parse(event.body))
            _code = a.code
        } else {
            _code = event.code
        }
        console.log(_code)
        let options = {
            method: 'get',
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${_appId}&secret=${_secret}&js_code=${_code}&grant_type=authorization_code`,
            
        }
        let res = await axios(options)
        let data = res.data
        if (data.errcode)
            throw new Error(JSON.stringify(data))
            
        return done(res.data)
    } catch (e) {
        return err(e.message)
    }
    
};