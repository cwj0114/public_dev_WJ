window.onload = function() {
    var store = new app.Store();
    var common = new app.Common(store);
    var join = new app.Join(common, store);
    var sign = new app.Sign(common, store);
    var view = new app.View(common);
    var forums = new app.Forums(common, store, view);

    if ( app.StoreAPI && app.ForumsAPI ) {
        var storeAPI = new app.StoreAPI();
        var forumsAPI = new app.ForumsAPI(common, storeAPI, view);
    }
};
