const createEntities = (function() {

    const _adverts = require("./entities/Adverts.js")
    const _bookmarks = require("./entities/Bookmarks.js")
    const _messages = require("./entities/Messages.js")
    const _readUsers = require("./entities/ReadUsers.js")
    const _users = require("./entities/Users.js")
    const _views = require("./entities/Views.js")

    return {
        adverts: _adverts,
        bookmarks: _bookmarks,
        messages: _messages,
        readUsers: _readUsers,
        users: _users,
        views: _views
    }

})()

module.exports = createEntities