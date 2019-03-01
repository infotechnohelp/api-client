var Api = function (apiRoot, csrfToken) {
    this.apiRoot = apiRoot;
    this.csrfToken = csrfToken;
};

Api.prototype.sendRequest = function (method, url, data, dataType, successCallback, errorCallback) {

    var csrfToken = this.csrfToken;
    var apiRoot = this.apiRoot;

    $.ajax({
        async: true,
        dataType: dataType,
        data: data,
        beforeSend: function (xhr) { // Add this line
            xhr.setRequestHeader('X-CSRF-Token', csrfToken);
        },
        success: function (data, textStatus) {
            successCallback(data, textStatus);
        },
        error: function (data, textStatus, errorThrown) {
            response = (data === 'json') ? JSON.parse(data.responseText) : data.responseText;
            errorCallback(response, textStatus, errorThrown);
        },
        type: method, url: apiRoot + url
    });
};

Api.prototype.getJson = function (url, successCallback, errorCallback) {
    this.sendRequest('get', url, null, 'json', successCallback, errorCallback);
};

Api.prototype.postJson = function (url, data, successCallback, errorCallback) {
    this.sendRequest('post', url, data, 'json', successCallback, errorCallback);
};
