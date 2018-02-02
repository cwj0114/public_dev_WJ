function Join(common, store) {
    this.common = common;
    this.store = store;

    const joinButton = this.common.select("span#join");
    if ( joinButton ) {
        // const that = this; //this 는 객체  //arrow 함수는 this를 갖을 수 없기때문에
        joinButton.onclick = () => {
            let isValidForm = this.validate("section#body > form");
            this.joinMember(isValidForm, "section#body > form");
        };
    }
}

Join.prototype.joinMember = function(isValidForm, formSelector) {
    if ( isValidForm ) {
        const form = this.common.select(formSelector);
        const id = this.common.select("#id", form).value;
        const pwd = this.common.select("#pwd", form).value;
        const name = this.common.select("#n-name", form).value;

        const member = {   //객체 리터럴
            id: id,
            pwd: pwd,
            name: name
        };

        this.store.save(id, JSON.stringify(member));
        location.href = "/ecma/index.html";
    }
};

Join.prototype.validate = function (formSelector) {
    const form = this.common.select(formSelector);
    const id = this.common.select("#id", form);
    if ( this.common.isEmpty(id) ) {
        alert("ID를 입력하세요!");
        id.focus();
        return false;
    }

    const password = this.common.select("#pwd", form);
    if ( this.common.isEmpty(password) ) {
        alert("비밀번호를 입력하세요!");
        password.focus();
        return false;
    }
    else if ( !this.common.isEnoughLength(password, 8) ) {
        alert("8자리 이상의 비밀번호를 입력하세요!");
        password.value = "";
        password.focus();
        return false;
    }

    const nickname = this.common.select("#n-name", form);
    if ( this.common.isEmpty(nickname) ) {
        alert("닉네임을 입력하세요!");
        nickname.focus();
        return false;
    }

    return true;
};

window.app = window.app || {};
window.app.Join = Join;
