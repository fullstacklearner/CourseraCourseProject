/**
 * Created by liling on 8/30/16.
 */
'use strict';
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        console.log("in menucont");
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading...";
        $scope.dishes = {};
        menuFactory.getDishes()
            .then(
                function (response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;

                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );


        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

        // var dish = menuFactory.getDish(parseInt($routeParams.id,10));
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message="Loading....";
        menuFactory.getDish(parseInt($stateParams.id, 10))
            .then(
                function (response) {
                    $scope.dish = response.data;
                    $scope.showDish = true;
                },
                function (response) {
                    $scoope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

        //$scope.input='';
        //this.update = function () {
        $scope.input = $('#search').val();
        console.log("input", $('#search').val());
        // }
    }])

    .controller('DishCommentController', ['$scope', function ($scope) {
        $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
        $scope.submitComment = function () {
            $scope.mycomment.date = new Date();
            console.log($scope.mycomment);
            $scope.dish.comments.push($scope.mycomment);
        };

    }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
        var channels = [{value: "tel", label: "Tel."},
            {value: "Email", label: "Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', function ($scope) {

        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "", firstName: "", lastName: "",
                    agree: false, email: ""
                };
                $scope.feedback.mychannel = "";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])

    .controller('IndexController', ['$scope','menuFactory','corporateFactory', function ($scope, menuFactory, corporateFactory) {

        $scope.leader = corporateFactory.getLeader(3);
        $scope.dish ={};
        $scope.showDish = false;
        $scope.message = "Loading...";
        menuFactory.getDish(0)
            .then(
                function (response) {
                    $scope.dish = response.data;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        $scope.promotion = menuFactory.getPromotion(0);
    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.leadersList = corporateFactory.getLeaders();
    }])

// implement the IndexController and About Controller here

;

