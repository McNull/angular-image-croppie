// Code goes here

(function (angular, Croppie) {
  'use strict';

  var mod = angular.module('angular-image-croppie', []);

  mod.directive('imageCroppie', ["$q", function ($q) {
    return {
      restrict: 'EA',
      scope: {
        src: '=',
        cropWidth: '=?',
        cropHeight: '=?',
        cropper: '='
      },
      link: function ($scope, $element, $attrs) {

        $element.addClass('image-croppie');

        var container = $element[0];

        var bb = container.getBoundingClientRect();

        var boundary = {
          width: bb.width,
          height: bb.height - 33 /* slider height */
        };

        var viewport = {
          width: $scope.cropWidth,
          height: $scope.cropHeight
        };

        (function () {
          if (viewport.width > boundary.width) {
            var r = boundary.width / viewport.width;
            viewport.height *= r;
            viewport.width *= r;
          }

          if (viewport.height > boundary.height) {
            var r = boundary.height / viewport.height;
            viewport.height *= r;
            viewport.width *= r;
          }
        })();

        var options = {
          boundary: boundary,
          viewport: viewport
        };

        var croppie = new Croppie(container, options);

        $scope.cropper = {
          result: function () {
            return $q(function (resolve, reject) {
              if (!$scope.src) {
                reject('No image data');
              } else {
                croppie.result({
                  type: 'base64',
                  size: {
                    width: $scope.width,
                    height: $scope.height
                  },
                  format: getImageFormat($scope.src)
                }).then(function (result) {
                  resolve(result);
                });
              }
            });
          }
        };

        $scope.$watch('src', function (newValue) {
          if (newValue) {
            croppie.bind(newValue).then(function () {
              croppie.setZoom(0);
            });
          }
        });
      }
    };
  }]);

  function getImageFormat(dataOrUrl) {
    var format;

    if (dataOrUrl) {
      if (dataOrUrl.startsWith('data:')) {
        format = dataOrUrl.substr(0, 15).split('/')[1].toLowerCase().replace(';', '');
      } else {
        var idx = dataOrUrl.lastIndexOf('.');
        if (idx !== -1 && (idx + 1) < dataOrUrl.length) {
          format = dataOrUrl.substr(idx + 1);
        }
      }
    }

    if (format === 'jpg') {
      format = 'jpeg';
    }

    return format || 'png';
  }

  mod.directive('onFileRead', function () {
    return {
      restrict: 'A',
      scope: {
        onFileRead: '&'
      },
      link: function ($scope, $element) {

        if ($element.prop('tagName') !== 'INPUT' || $element.attr('type') !== 'file') {
          throw new Error('read-file attribute should be place on a <input type="file"/> element.');
        }

        $element.bind('change', function (e) {
          if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
              $scope.$apply(function () {
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
