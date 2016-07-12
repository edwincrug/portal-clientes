app.factory('oauthHttpInterceptor', function($cookies) {
    return {
        request: function(config) {
            if ($cookies.get('andrade-token-client')){
              config.headers.Authorization = 'Bearer ' + $cookies.get('andrade-token-client');
            }
            return config;
        }
    };
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('oauthHttpInterceptor');
});
