// Code goes here

(function(angular, Croppie) {
  'use strict';

  var mod = angular.module('angular-image-croppie', []);

  mod.directive('imageCroppie', function() {
    return {
      restrict: 'EA',
      scope: {
        croppie: '=?',
        src: '=?',
        options: '<?',
        ngModel: '=?'
      },
      link: function($scope, $element, $attrs) {

        $element.addClass('image-croppie');

        var container = $element[0];
        var options = $scope.options || {};

        if ($attrs.ngModel) {
          options.update = function() {
            croppie.result('canvas').then(function(img) {
              $scope.$apply(function() {
                $scope.ngModel = img;
              });
            });
          };
        }

        var croppie = $scope.croppie = new Croppie(container, options);

        $scope.$watch('src', function(newValue) {
          if (newValue) {
            croppie.bind(newValue).then(function() {
              croppie.setZoom(0);
            });
          }
        });
      }
    };
  });

  mod.directive('onFileRead', function() {
    return {
      restrict: 'A',
      scope: {
        onFileRead: '&'
      },
      link: function($scope, $element) {

        if($element.prop('tagName') !== 'INPUT' || $element.attr('type') !== 'file') {
          throw new Error('read-file attribute should be place on a <input type="file"/> element.');
        }

        $element.bind('change', function(e) {
          if(e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
              $scope.$apply(function() {
                $scope.onFileRead({ data: e.target.result });
              });
            };

            reader.readAsDataURL(e.target.files[0]);
          }
        });
      }
    };
  });

})(angular, Croppie);
