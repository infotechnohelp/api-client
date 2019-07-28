## Implementation

\<script>
```js
    const api = new Api("<?= \Cake\Routing\Router::url('/', true); ?>", "api/",
        "<?= $this->request->getParam('_csrfToken'); ?>");

    if (api instanceof Api === false) {
        throw Error('constant `api` is not an instance of `Api`');
    }
```
\</script>

## Send requests 

`getJson(url, successCallback, errorCallback, apiRoot)`

\<script>
```js
    api.getJson("test/get", function(successResponse){
        console.log(successResponse);
    }, function(failureResponse){
        console.log(failureResponse);
    });
```
\</script>

`postJson(url, successCallback, errorCallback, apiRoot)`

\<script>
```js
    api.postJson("test/get", {key: value}, function(successResponse){
        console.log(successResponse);
    }, function(failureResponse){
        console.log(failureResponse);
    });
```
\</script>

## Clone api and set specific path

\<script>
```js
var newApi = api.clone();
        trackerApi.setApiRoot("any/api/path");
```
\</script>