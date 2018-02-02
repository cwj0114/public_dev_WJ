function Sign(common, store) {
    this.common = common;
    this.store = store;

    var signButton = this.common.select("span#sign");
    if ( signButton ) {
        var that = this;
        signButton.onclick = function () {
            var isValidForm = that.validate("section#body > form");
            var isSignIn = that.signIn("section#body > form");
            if ( isSignIn ) {
                location.href = "/ecma/index.html";
            }
        };
    }
}

Sign.prototype.validate = function (formSelector) {
    var form = this.common.select(formSelector);
    var id = this.common.select("#id", form);
    if ( this.common.isEmpty(id) ) {
        alert("ID를 입력하세요!");
        id.focus();
        return false;
    }

    var password = this.common.select("#pwd", form);
    if ( this.common.isEmpty(password) ) {
        alert("비밀번호를 입력하세요!");
        password.focus();
        return false;
    }
    return true;
};

Sign.prototype.signIn = function (formSelector) {
    var form = this.common.select(formSelector);

    var id = this.common.select("#id", form).value;
    var password = this.common.select("#pwd", form).value;

    var member = this.store.getAndConvertJSON(id);

    if (member.id === id && member.pwd === password) {
        this.store.save("loginMember", id);
        return true;
    }
    else {
        member = {};
        return false;
    }
};

window.app = window.app || {};
window.app.Sign = Sign;
