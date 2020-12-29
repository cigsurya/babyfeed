app.controller('BabyCtrl', function ($scope) {
    $scope.activities = getExistingActivities();
    $scope.diaperChangeValue = "";
    $scope.feedTime = 0;
    $scope.activityeTime;

    function getExistingActivities() {
        var activities = localStorage.getItem("kidactivities");
        if (activities) {
            activities = JSON.parse(activities);
            for (let index = 0; index < activities.length; index++) {
                const element = activities[index];
                element.activityTime = new Date(element.activityTime)
            }
        }
        return activities || [];
    }

    $scope.doDiaperChange = function (event) {
        var item = {};
        item.id = new Date().getTime();
        item.type = "diaper.png";
        item.activityTime = new Date();
        item.name = $scope.diaperChangeValue;
        $scope
            .activities
            .push(item);

        localStorage.setItem("kidactivities", JSON.stringify($scope.activities));
        $('#diaperModal').modal('hide');
    }

    $scope.doFeed = function (event) {
        var item = {};
        item.id = new Date().getTime();
        item.type = "feed.png";
        item.activityTime = new Date();
        item.name = $scope.feedTime;
        $scope
            .activities
            .push(item);
        localStorage.setItem("kidactivities", JSON.stringify($scope.activities));

        $('#feedModal').modal('hide');
    }

    $scope.changeActivityTime = function (item) {
        localStorage.setItem("kidactivities", JSON.stringify($scope.activities));
    }

    $scope.removeActivity = function (item) {
        if ($scope.activities.indexOf(item) > -1) {
            $scope
                .activities
                .splice($scope.activities.indexOf(item), 1);
            localStorage.setItem("kidactivities", JSON.stringify($scope.activities));
        }
    }
    
})
app.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width();
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});
