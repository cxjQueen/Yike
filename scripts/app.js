var Yike = angular.module('Yike', ['ngRoute']);

// 配置路由
Yike.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/today', {
            // 为路由配置视图
            templateUrl: './views/today.html',
            controller: 'TodayCtrl'
        })
        .when('/joke', {
            // 为路由配置视图
            templateUrl: './views/joke.html',
            controller: 'JokeCtrl'
        })
        .when('/history', {
            // 为路由配置视图
            templateUrl: './views/history.html',
            controller: 'HistoryCtrl'
        }).otherwise({
            redirectTo: '/today'
        })

}]);

// 添加一个全局方法用来实现页页交互

// $rootScope

Yike.run(['$rootScope', function($rootScope) {

    // 导航初始状态
    $rootScope.collapsed = false;

    // 导航交互
    $rootScope.collapse = function() {
        // 打开/关闭
        $rootScope.collapsed = !$rootScope.collapsed;

        // 所有导航
        var navs = document.querySelectorAll('.navs dd');

        // 当前导航是打开还是关闭
        if ($rootScope.collapsed) {
            // 所有dd 位置从 -100% --> 0
            for (var i = 0; i < navs.length; i++) {
                navs[i].style.transform = 'translate(0)';
                navs[i].style.transitionDelay = '0.2s';
                // i 
                navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
            }
        } else {
            // 所有dd 位置从 0 --> -100%
            for (var j = navs.length; j > 0; j--) {
                navs[j - 1].style.transform = 'translate(-100%)';
                navs[j - 1].style.transitionDelay = '';
                // j - 1 = 5 - 1 --> j - 1 = 1 - 1

                // console.log(navs.length - j + 1);
                navs[j - 1].style.transitionDuration = (navs.length - j + 1) * 0.15 + 's';
            }
        }
    }
}]);

// 
Yike.controller('NavsCtrl', ['$scope', function($scope) {

    // 
    $scope.navs = [
        { text: '最新歌单', link: '#/today', icon: 'icon-home' },
        { text: '笑话大全', link: '#/joke', icon: 'icon-file-empty' },
        { text: '历史上的今天', link: '#/history', icon: 'icon-pencil' },
    ]
}]);

// 最新歌单
Yike.controller('TodayCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $rootScope.title = '最新歌单';
    $http({
        url: 'http://route.showapi.com/213-4',
        params: {
            showapi_sign: "85029253e76742c2ba637ce1e1eb46a2",
            showapi_appid: '32305',
            topid: '6'
        }
    }).success(function(info) {
        $scope.music = info.showapi_res_body;
    });
}]);
//笑话大全
Yike.controller('JokeCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $rootScope.title = '笑话大全';

    $http({
        url: 'http://route.showapi.com/341-3',
        params: {
            showapi_sign: "85029253e76742c2ba637ce1e1eb46a2",
            showapi_appid: '32305',
            maxResult: '10'
        }
    }).success(function(info) {
        //console.log(info);
        $scope.jokes = info.showapi_res_body;
    });
}]);

// 历史上的今天
Yike.controller('HistoryCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {


    $rootScope.title = '历史上的今天';


    $http({
        url: 'http://route.showapi.com/119-42',
        params: {
            showapi_sign: "85029253e76742c2ba637ce1e1eb46a2",
            showapi_appid: '32305'
        }
    }).success(function(info) {
        console.log(info);
        $scope.history = info.showapi_res_body;

    });
}]);