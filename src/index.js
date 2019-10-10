var Api = function (webroot, apiRoot, csrfToken) {
    this.webroot = webroot;
    this.apiRoot = apiRoot;
    this.csrfToken = csrfToken;
};

Api.prototype.setApiRoot = function (apiRoot) {
    this.apiRoot = apiRoot;
};

Api.prototype.sendRequest = function (apiRoot, method, url, data, dataType, successCallback, errorCallback) {

    var csrfToken = this.csrfToken;
    var webroot = this.webroot;

    if (apiRoot === undefined || apiRoot === null) {
        apiRoot = this.apiRoot;
    }

    $.ajax({
        async: true,
        dataType: dataType,
        data: data,
        beforeSend: function (xhr) { // Add this line
            xhr.setRequestHeader('X-CSRF-Token', csrfToken);
        },
        success: function (data, textStatus) {
            if (successCallback !== undefined) {
                successCallback(data, textStatus);
            }
        },
        error: function (data, textStatus, errorThrown) {
            response = (data === 'json') ? JSON.parse(data.responseText) : data.responseText;

            if (errorCallback !== undefined) {
                errorCallback(response, textStatus, errorThrown);
            }
        },
        type: method, url: webroot + apiRoot + url
    });
};

Api.prototype.getJson = function (url, successCallback, errorCallback, apiRoot) {
    this.sendRequest(apiRoot, 'get', url, null, 'json', successCallback, errorCallback);
};

Api.prototype.postJson = function (url, data, successCallback, errorCallback, apiRoot) {
    this.sendRequest(apiRoot, 'post', url, data, 'json', successCallback, errorCallback);
};

Api.prototype.clone = function (apiRoot) {
    var actualApiRoot = (apiRoot === undefined) ? this.apiRoot : apiRoot;

    return new Api(this.webroot, actualApiRoot, this.csrfToken);
};