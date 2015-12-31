/*
 * Copyright (C) 2015 Glyptodon LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Config block augmenting Guacamole's existing URL routing, automatically
 * redirecting requests from "/connection/[CONNECTION IDENTIFIER]" to
 * "/client/[CLIENT IDENTIFIER]".
 */
angular.module('simpleUrl').config(['$routeProvider',
        function simpleUrlRouteConfig($routeProvider) {

    /**
     * Re-authenticates with the Guacamole server and, if successful, redirects
     * to from "/connection/[CONNECTION IDENTIFIER]" to the proper
     * "/client/[CLIENT IDENTIFIER]" URL. The client identifier is derived
     * assuming that the destination is a connection (not a group) and the
     * data source is the default data source (the data source which
     * authenticated the user).
     *
     * @param {Service} $injector
     *     The Angular $injector service.
     *
     * @returns {Promise}
     *     A promise which is rejected once the correct URL has been determined
     *     and the user has been redirected, or once authentication has failed.
     */
    var redirectToClient = ['$injector', function redirectToClient($injector) {

        // Required types
        var ClientIdentifier = $injector.get('ClientIdentifier');

        // Required services
        var $location             = $injector.get('$location');
        var $q                    = $injector.get('$q');
        var $route                = $injector.get('$route');
        var authenticationService = $injector.get('authenticationService');

        // Promise for routing attempt
        var route = $q.defer();

        // Re-authenticate including any parameters in URL
        authenticationService.updateCurrentToken($location.search())
        .then(function reauthenticationSucceeded() {

            // Get connection identifier from parameters
            var identifier = $route.current.params.id;

            // Derive client identifier directly from connection identifier
            var clientIdentifier = ClientIdentifier.toString({
                dataSource : authenticationService.getDataSource(),
                type       : ClientIdentifier.Types.CONNECTION,
                id         : identifier
            });

            // Redirect to proper client URL
            $location.url('/client/' + encodeURIComponent(clientIdentifier));
            route.reject();

        })

        // Simply ignore if authentication fails
        ['catch'](function reauthenticationFailed() {
            route.reject();
        });

        // Return promise that will be rejected once either (1) the correct
        // client URL has been determined or (2) the correct client URL cannot
        // be determined because authentication has failed
        return route.promise;

    }];

    // Redirect /connection/IDENTIFIER to /client/...
    $routeProvider.when('/connection/:id/:params?', {
        resolve       : { redirectToClient : redirectToClient }
    });

}]);
