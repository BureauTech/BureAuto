module.exports = {
    secondsToTimeDuration: function(totalSeconds) {
        const days = Math.floor(totalSeconds / 86400)
        totalSeconds = totalSeconds % 86400
        const hours = Math.floor(totalSeconds / 3600)
        totalSeconds = totalSeconds % 3600
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return {
            days: days,
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds: seconds < 10 ? `0${seconds}` : seconds
        }
    }
}