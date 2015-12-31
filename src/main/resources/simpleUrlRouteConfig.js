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
 * Config block augmenting Guacamole's existing URL routing.
 */
angular.module('simpleUrl').config(['$routeProvider',
        function simpleUrlRouteConfig($routeProvider) {

    /**
     * Attempts to re-authenticate with the Guacamole server, sending any
     * query parameters in the URL, along with the current auth token, and
     * updating locally stored token if necessary.
     *
     * @param {Service} $injector
     *     The Angular $injector service.
     *
     * @returns {Promise}
     *     A promise which resolves successfully only after an attempt to
     *     re-authenticate has been made. If the authentication attempt fails,
     *     the promise will be rejected.
     */
    var updateCurrentToken = ['$injector', function updateCurrentToken($injector) {

        // Required services
        var $location             = $injector.get('$location');
        var authenticationService = $injector.get('authenticationService');

        // Re-authenticate including any parameters in URL
        return authenticationService.updateCurrentToken($location.search());

    }];

    // Configure each possible route
    $routeProvider.when('/client2/:id/:params?', {
        bodyClassName : 'client',
        templateUrl   : 'app/client/templates/client.html',
        controller    : 'clientController',
        resolve       : { updateCurrentToken: updateCurrentToken }
    });

}]);
