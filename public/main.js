const purecookieTitle = "Cookies.",
    purecookieDesc = "Ao utilizar este site, você aceita automaticamente que utilizemos cookies.",
    purecookieLink = "",
    purecookieButton = "Entendi"

const pureFadeIn = function(e, o) {
    const i = document.getElementById(e)
    i.style.opacity = 0,
    i.style.display = o || "block",
    function e() {
        let o = parseFloat(i.style.opacity);
        (o += .02) > 1 || (i.style.opacity = o,
        requestAnimationFrame(e))
    }()
}

const pureFadeOut = function(e) {
    const o = document.getElementById(e)
    o.style.opacity = 1,
    function e() {
        (o.style.opacity -= .02) < 0 ? o.style.display = "none" : requestAnimationFrame(e)
    }()
}

const setCookie = function(e, o, i) {
    let t = ""
    if (i) {
        const n = new Date
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3),
        t = "; expires=" + n.toUTCString()
    }
    document.cookie = e + "=" + (o || "") + t + "; path=/; secure; samesite=None" 
}

const getCookie = function(e) {
    for (let o = e + "=", i = document.cookie.split(";"), t = 0; t < i.length; t++) {
        let n = ""
        for (n = i[t]; " " == n.charAt(0);) {
            n = n.substring(1, n.length)
        }
        if (0 == n.indexOf(o)) {
            return n.substring(o.length, n.length)
        }
    }
    return null
}

// eslint-disable-next-line no-unused-vars
const eraseCookie = function(e) {
    document.cookie = e + "=; Max-Age=-99999999;"
}

const cookieConsent = function() {
    getCookie("bureauto") || 
        (document.body.innerHTML += "<div class=\"cookieConsentContainer\" id=\"cookieConsentContainer\">" +
        "<div class=\"cookieTitle\"><a>" + purecookieTitle + "</a></div><div class=\"cookieDesc\"><p>" + purecookieDesc + " " + 
        purecookieLink + "</p></div><div class=\"cookieButton\"><a onClick=\"purecookieDismiss();\">" + 
        purecookieButton + "</a></div></div>",
        pureFadeIn("cookieConsentContainer"))
}

// eslint-disable-next-line no-unused-vars
const purecookieDismiss = function() {
    setCookie("bureauto", "1", 7),
    pureFadeOut("cookieConsentContainer")
}

window.onload = function() {
    cookieConsent()
}