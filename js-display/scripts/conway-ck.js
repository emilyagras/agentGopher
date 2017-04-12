function writeCustomPickle(e) {
    var t = "",
        n = "";
    if (e.length % hashLength !== 0) throw "Total cells must be divisble by 16 (or whatever hashLength equals)!";
    for (var r = 0; r < e.length; r++) t += String(e[r].value);
    debug && console.log(t);
    var i = "",
        s = "";
    for (var o = 0; o < t.length / hashLength; o++) {
        i = t.slice(o * hashLength, (o + 1) * hashLength);
        debug && console.log(i);
        s = parseInt(i, 2).toString(36);
        debug && console.log(s);
        n.length === 0 ? n = s : n = n + "-" + s;
        s = ""
    }
    return n
}

function readCustomPickle(e, t) {
    var n = e.split("-"),
        r = "",
        i = "",
        s = "0000000000000000";
    for (var o = 0; o < n.length; o++) {
        i = parseInt(n[o], 36).toString(2);
        len = i.length;
        len < hashLength && (i = s.slice(0, hashLength - len) + i);
        r += i
    }
    for (var u = 0; u < t.length; u++) r[u] === "1" ? t[u].value = 1 : t[u].value = 0;
    return t
}

function initData(e, t, n, r, i, s, o) {
    var u = [],
        a = 0,
        f = 0;
    s !== null && (a = s);
    o !== null && (f = o);
    var l = 0,
        c = 0,
        h = 0,
        p = 0,
        d = n,
        v = r,
        m = e * t,
        g = e - 1,
        y = t - 1,
        b, w, E, S, x, T, N, C;
    for (var k = 0; k < m; k++) {
        if (c === 0) {
            b = -1;
            w = -1;
            E = -1
        } else {
            l % (g + 1) === 0 ? b = -1 : b = p - (g + 2);
            w = p - (g + 1);
            l === g ? E = -1 : E = p - (g + 0)
        }
        S = p - 1;
        l === g ? x = -1 : x = p + 1;
        if (c === y) {
            T = -1;
            N = -1;
            C = -1
        } else {
            l % (g + 1) === 0 ? T = -1 : T = p + (g + 0);
            N = p + (g + 1);
            l === g ? C = -1 : C = p + (g + 2)
        }
        neighbors = [b, w, E, S, x, T, N, C];
        s = l * d + a;
        o = c * v + f;
        dataItem = {
            value: h,
            x: s,
            y: o,
            ns: neighbors,
            count: p
        };
        u.push(dataItem);
        p += 1;
        if (l === g) {
            l = 0;
            c += 1
        } else l += 1
    }
    i.length > 0 && (u = readCustomPickle(i, u));
    return u
}




function drawGrid(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
    function A() {
        txt = g.text();
        newtxt = String(parseInt(txt, 10) + 1);
        g.text(newtxt)
    }

    function O() {
        g.text("0")
    }

    function M() {
        function n() {
            t = conwayStep(t);
            b.transition().delay(o * .1).duration(o * .9).attr("fill", function(e, t) {
                return y(e.value)
            });
            A();
            e += 1
        }
        var e = 0;
        if (S) {
            debug && console.log("interval cleared");
            clearInterval(S)
        }
        S = setInterval(n, o)
    }

    function _() {
        O();
        for (var e = 0; e < t.length; e++) t[e].value = 0;
        b.transition().delay(0).duration(1e3).attr("fill", function(e, t) {
            return y(e.value)
        });
        window.location.hash = ""
    }

    function D() {
        O();
        for (var e = 0; e < t.length; e++) t[e].value = d3.round(Math.random() * .6);
        b.transition().delay(o * .1).duration(o * .9).attr("fill", function(e, t) {
            return y(e.value)
        })
    }

    function P() {
        O();
        hash = jQuery(location).attr("hash");
        if (hash.length !== 0) {
            t = readCustomPickle(hash, t);
            b.transition().delay(o * .1).duration(o * .9).attr("fill", function(e, t) {
                return y(e.value)
            })
        }
    }
    var v = d3.select(e).append("svg").attr("width", n).attr("height", r).attr("class", "grid"),
        m = v.append("g"),
        g = d3.select(c),
        y = d3.scale.ordinal().range([color1, color2]),
        b = m.selectAll("boxes").data(t).enter().append("rect").attr({
            height: s,
            width: i,
            x: function(e) {
                return e.x
            },
            y: function(e) {
                return e.y
            },
            fill: function(e, t) {
                return y(e.value)
            },
            stroke: strokeColor
        }).on("click", function() {
            element = d3.select(this);
            val = element.data()[0].value;
            if (val === 0) {
                element.data()[0].value = 1;
                element.attr({
                    fill: function(e, t) {
                        return y(e.value)
                    }
                })
            } else {
                element.data()[0].value = 0;
                element.attr({
                    fill: function(e, t) {
                        return y(e.value)
                    }
                })
            }
            debug && console.log("Value is:");
            debug && console.log(val)
        }).on("mouseout", function() {
            element = d3.select(this);
            element.attr("fill", function(e, t) {
                return y(e.value)
            })
        }).on("mouseover", function() {
            element = d3.select(this);
            element.attr("fill", color2)
        }),
        w = d3.select(u),
        E = 0,
        S = null;
    w.on("click", function() {
        if (E === 0) {
            M(S);
            E = 1;
            debug && console.log("Starting...")
        } else E === 1 && debug && console.log("Cannot start -- already running.")
    });
    var x = d3.select(a);
    x.on("click", function() {
        if (E === 0) debug && console.log("Cannot stop -- not running.");
        else if (E === 1) {
            clearInterval(S);
            E = 0;
            debug && console.log("Stopped running simulation.")
        }
    });
    var T = d3.select(f);
    T.on("click", function() {
        if (E === 1) {
            clearInterval(S);
            E = 0;
            _();
            debug && console.log("Stopped and reset.")
        } else if (E === 0) {
            _();
            debug && console.log("Reset already stopped sim.")
        }
    });
    var N = d3.select(l);
    N.on("click", function() {
        if (E === 1) {
            clearInterval(S);
            E = 0;
            D();
            debug && console.log("Stopped and random data added.")
        } else if (E === 0) {
            D();
            debug && console.log("Random data replacing stopped board.")
        }
    });
    var C = d3.select(h);
    C.on("click", function() {
        if (E === 1) {
            clearInterval(S);
            E = 0;
            hash = writeCustomPickle(t);
            window.location.hash = hash;
            debug && console.log(hash);
            debug && console.log("Stopped and saved")
        } else if (E === 0) {
            hash = writeCustomPickle(t);
            window.location.hash = hash;
            debug && console.log(hash);
            debug && console.log("Saved data")
        }
    });
    var k = d3.select(p);
    k.on("click", function() {
        if (E === 1) {
            clearInterval(S);
            E = 0;
            P();
            debug && console.log("Stopped and loaded")
        } else if (E === 0) {
            P();
            debug && console.log("Loaded data")
        }
    });
    var L = d3.select(d);
    L.on("click", function() {
        element = d3.select(this);
        if (E === 1) {
            clearInterval(S);
            E = 0;
            hash = writeCustomPickle(t);
            window.location.hash = hash;
            href = window.location.href;
            if (hash.length > 0) {
                href2 = href.split("#");
                href3 = href2[0] + "%23" + href2[1]
            } else href3 = href;
            link = "https://twitter.com/intent/tweet?url=" + href3;
            element.attr("href", link);
            debug && console.log(href);
            debug && console.log("Stopped and tweeted")
        } else if (E === 0) {
            hash = writeCustomPickle(t);
            window.location.hash = hash;
            href = window.location.href;
            console.log(hash);
            console.log(href);
            console.log(hash.length);
            if (hash.length > 0) {
                href2 = href.split("#");
                href3 = href2[0] + "%23" + href2[1] + "&"
            } else href3 = href + "&";
            console.log(href3);
            link = "https://twitter.com/intent/tweet?url=" + href3;
            element.attr("href", link);
            debug && console.log(href);
            debug && console.log("Stopped and tweeted")
        }
    })
}

var hashLength = 16,
    debug = !1,
    strokeColor = "#444444",
    color1 = "#bdbed8",
    color2 = "#262958";