(function() {

    // create module
    angular
        .module('todo', ['ngMaterial'])
        .config(function($mdThemingProvider) {

            $mdThemingProvider.theme('default')
              .primaryPalette('blue')
              .accentPalette('orange');
        })
        .controller('mainController', function($scope, $http) {

        //todoData
        $scope.todoData = {};

        //GET all todos
        $http.get('/api/todos')
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log(`Error: ${data}`);
            });

        //CREATE todo
        $scope.createTodo = function() {

            if($scope.todoData.text != undefined) {
                $http.post('/api/todos', $scope.todoData)
                    .success(function(data) {
                        $scope.todoData = {};
                        $scope.todos = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log(`Error: ${data}`);
                    });
            }
        };

        //DELETE todo
        $scope.deleteTodo = function(id) {

            $http.delete('/api/todos/' + id)
                .success(function(data) {
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log(`Error: ${data}`);
                });
        };
    });
})();