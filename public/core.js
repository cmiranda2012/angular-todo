(function() {

    // create module
    angular
        .module('todo', ['ngMaterial'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');
        })
        .controller('mainController', function($scope, $http, $mdToast) {

            // todoData
            $scope.todoData = {};

            $scope.checked = true;

            // GET all todos
            $http.get('/api/todos')
                .success(function(data) {
                    $scope.todos = data;
                })
                .error(function(data) {
                    console.log(`Error: ${data}`);
                });

            // CREATE todo
            $scope.createTodo = function() {

                if ($scope.todoData.text != undefined) {
                    $http.post('/api/todos', $scope.todoData)
                        .success(function(data) {
                            $scope.todoData = {};
                            $scope.todos = data;
                        })
                        .error(function(data) {
                            console.log(`Error: ${data}`);
                        });
                } else {
                    showToast('Cannot Save!');
                }
            };

            // Update checked todo
            $scope.updateTodo = function(id) {

                $http.put('/api/todos/' + id)
                    .success(function(data) {
                        $scope.todos = data;
                    })
                    .error(function(data) {
                        console.log(`Error: ${data}`);
                    });
            };

            // Get all completed items
            $scope.completedItems = function() {

                $http.get('/api/todos/completed')
                    .success(function(data) {
                        $scope.completed = data;
                    })
                    .error(function(data) {
                        console.log(`Error: ${data}`);
                    });
            };

            // Delete all completed items
            $scope.clearCompleted = function(id) {

                $http.delete('/api/todos')
                    .success(function(data) {
                        $scope.completed = {};
                    })
                    .error(function(data) {
                        console.log(`Error: ${data}`);
                    });
            };

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position('top right')
                    .hideDelay(2000)
                );
            }

        });

})();
