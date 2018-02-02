function Common(store) {

    this.store = store;

    // Init Menu
    (function (that) {
        var menus = that.selectAll("div#wrapper > header > nav > section > ul > li");
        menus[0].onclick = function() {
            location.href = "/ecma/index.html";
        };
        menus[1].onclick = function() {
            location.href = "/ecma/app/join.html";
        };
        menus[2].onclick = function() {
            location.href = "/ecma/app/sign.html";
        };
        menus[3].onclick = function() {
            location.href = "/ecma/app/forums-api.html";
        };
        menus[4].onclick = function() {
            location.href = "/ecma/app/forums.html";
        };

        var loginMember = that.getLoginMember();
        if ( loginMember ) {
            menus[1].style.display = "none";
            menus[2].innerText = "Logout";
            menus[2].onclick = function() {
                that.store.remove("loginMember");
                location.href = "/ecma/index.html";
            };
            menus[0].style.marginRight = "462px";
        }
        else {
            menus[3].style.display = "none";
            menus[0].style.marginRight = "494px";
        }
    })(this);

    // Auto size up for textarea
    (function (that) {
        let textarea = that.select("textarea");
        if ( textarea ) {
            textarea.onkeyup = function (e) {
                let rows = textarea.value.split("\n").length + 1;

                if (rows < 15) {
                    textarea.style.height = (rows * 23) + "px";
                }
            };
        }
    })(this);
}

Common.prototype.replaceNewLineToBr = function (content) {
    var eachLine = content.split("\n");
    var newContent = "";
    eachLine.forEach(function (value) {
        newContent += value + "<br/>";
    });
    return newContent;
};

Common.prototype.select = function(elementName, target = document) {  //default parameter
    return target.querySelector(elementName);
};

Common.prototype.selectAll = function(elementName, target) {
    return (target || document).querySelectorAll(elementName);
};

Common.prototype.isEmpty = function(element) {
    if ( element.value === "" ) {
        return true;
    }
    return false;
};

Common.prototype.isEnoughLength = function(element, length) {
    if ( element.value.length >= length ) {
        return true;
    }
    return false;
};

Common.prototype.hide = function (element) {
    const dom = this.select(element);
    if ( dom ) {
        let height = dom.offsetHeight || parseInt(dom.style.height);

        dom.style.height = height + "px";
        dom.style.visibility = "hidden";
        dom.style.overflow = "hidden";
        dom.style.position = "absolute";
    }
};

Common.prototype.slideDown = function (element) {
    const dom = document.querySelector(element);

    if ( dom ) {
        if (dom.style.visibility != "hidden") {
            return;
        }

        let height = (dom.offsetHeight || parseInt(dom.style.height));
        for (let i = 0; i <= height; i++) {
            setTimeout(function () {
                dom.style.height = (i) + "px";
                dom.style.visibility = "visible";
                dom.style.position = "relative";
                if (height == i) {
                    show(dom);
                }
            }, i);
        }

        function show(dom) {
            dom.style.height = null;
            dom.style.overflow = null;
        }
    }
};

Common.prototype.slideUp = function (element) {
    const dom = document.querySelector(element);

    if ( dom ) {
        if (dom.style.visibility == "hidden") {
            return;
        }

        let height = (dom.offsetHeight || parseInt(dom.style.height)) - 20;
        for (let i = height; i >= 0; i--) {

            setTimeout(function () {
                dom.style.height = (i) + "px";
                dom.style.overflow = "hidden";
                if (i == 0) {
                    hide(dom);
                }
            }, (i - height) * -1);
        }

        function hide(dom) {
            dom.style.height = height + "px";
            dom.style.visibility = "hidden";
            dom.style.position = "absolute";
        }
    }
};

Common.prototype.initTextareaHeight = function () {
    let textarea = document.querySelector("textarea");
    if ( textarea ) {
        textarea.style.height = null;
    }
};

Common.prototype.getLoginMember = function() {
    var loginMember = this.store.get("loginMember");
    if ( !loginMember ) {
        return null;
    }
    return this.store.getAndConvertJSON(loginMember);
};


window.app = window.app || {};
window.app.Common = Common;
