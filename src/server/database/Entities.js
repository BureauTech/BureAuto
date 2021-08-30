const createEntities = (function() {

    let _adverts   = require("./entities/Adverts.js")
    let _bookmarks = require("./entities/Bookmarks.js")
    let _messages  = require("./entities/Messages.js")
    let _readUsers = require("./entities/ReadUsers.js")
    let _users     = require("./entities/Users.js")
    let _views     = require("./entities/Views.js")

    return {
        adverts: _adverts,
        bookmarks: _bookmarks,
        messages: _messages,
        readUsers: _readUsers,
        users:_users,
        views: _views
    }

})()

module.exports = createEntities