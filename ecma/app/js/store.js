function Store() {
  console.log(this);
    // Init Web Local Storage
    (function () {
        // Check browser support
        if (typeof(Storage) !== "undefined") {
            console.log("Initiate WebStorage...");
        } else {
            console.log("Initiate Fail WebStorage...");
        }
    })();

}

Store.prototype.save = (key, value) => {
    localStorage.setItem(key, value);
};

Store.prototype.get = (key) => localStorage.getItem(key);

Store.prototype.remove = (key) => {
    localStorage.removeItem(key);
}

Store.prototype.newNumber = () => {
    var number = Store.prototype.get("number");
    this.save("number", ++number);

    return parseInt(Store.prototype.get("number"));
};

Store.prototype.getAndConvertJSON = (key) => {
    var item = Store.prototype.get(key);
    return JSON.parse(item);
};

window.app = window.app || {};
window.app.Store = Store;
