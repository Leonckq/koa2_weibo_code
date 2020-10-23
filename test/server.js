/**
 * @description jest server
 * @author Leon
 */

const request = require('supertest')
const server = require('./../src/app').callback()

module.exports = request(server)