(function(){

  angular.module('initialValue', []).directive('initialValue', function() {
    return{
      restrict: 'A',
      controller: ['$scope', '$element', '$attrs', '$parse', function($scope, $element, $attrs, $parse) {
        if (!$attrs.ngModel) return; // do nothing if no ng-model

        var element = $element[0],
            tag = element.tagName.toLowerCase(),
            type = $element.attr('type').toLowerCase(),
            value = $element.val();

        if (tag === 'input') {
          if (type === 'checkbox' || type === 'radio') {
            value = $element.prop('checked');
          } else if (type === 'number') {
            value = ($element.val() !== undefined) ? parseFloat($element.val()) : undefined;
          } else if (type === 'color' || type === 'range') {
            value = element.getAttribute('value');
          } else if (type === 'date') {
            value = new Date(value.trim());
          }
        } else if (tag === "select") {
          if (element.hasAttribute('multiple')) {
            var values = [],
                options = $element.find('option');
            for (var i = 0; i < options.length; i++) {
              if (options[i].hasAttribute('selected')) {
                values.push(options[i].value);
              }
            }
            value = values;
          } else {
            value = $element.val();
          }
        }

        $parse($attrs.ngModel).assign($scope, value);
      }]
    };
  });

})();
