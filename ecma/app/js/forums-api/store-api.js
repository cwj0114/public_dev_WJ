function StoreAPI() {
}

StoreAPI.prototype.get = function(url, params, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if ( callback ) {
                callback(this.response);
            }
        }
    };
    xhttp.open("GET", url + params, true);
    xhttp.send();
};

StoreAPI.prototype.post = function(url, params, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            if ( callback ) {
                callback(this.response);
            }
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(params));
};

StoreAPI.prototype.put = function(url, params, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if ( callback ) {
                callback(this.response);
            }
        }
    };
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(params));
};

StoreAPI.prototype.delete = function(url, params, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if ( callback ) {
                callback();
            }
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.send();
};

window.app = window.app || {};
window.app.StoreAPI = StoreAPI;