app.run(function($rootScope, User, $state) {
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            if (toState.admin) {
                User.me().then(function(data) {
                    if (data.data.data.idEstatus == 2) {
                        $state.go('activatePending')
                    } else {
                        $state.go(toState.name)
                    }

                }, function(err) {
                    $state.go('login')
                })
            }

        })
})
