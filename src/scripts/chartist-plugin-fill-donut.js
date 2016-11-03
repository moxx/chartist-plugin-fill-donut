/**
 * Chartist.js plugin to pre fill donouts with animations
 * author: moxx
 * author-url: https://github.com/moxx/chartist-plugin-fill-donut
 *
 */
(function(window, document, Chartist) {
    'use strict';

    var defaultOptions = {
        fillClass: 'ct-fill-donut',
        label : {
            html: '<div></div>',
            class: 'ct-fill-donut-label test'
        },
        items : [{}]
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.fillDonut = function(options) {
        options = Chartist.extend({}, defaultOptions, options);
        return function fillDonut(chart){
            if(chart instanceof Chartist.Pie) {
                var $chart = angular.element(chart.container);
                $chart.css('position', 'relative');
                var $svg;

                chart.on('draw', function(data) {
                    if(data.type === 'slice'){
                        if(data.index === 0){
                            $svg = $chart.find('svg').eq(0);
                        }

                        var $clone = angular.element(angular.element(data.group._node).clone());
                        $clone.attr('class', $clone.attr('class') + ' ' + options.fillClass);

                        angular.forEach($clone.find('path'), function(value){
                            angular.element(value).find('animate').remove();
                            angular.element(value).removeAttr('stroke-dashoffset');
                        });
                        $svg.prepend($clone);
                    }
                });

                chart.on('created', function(data){
                    var itemIndex = 0;

                    if(chart.options.fillDonutOptions){
                        options = Chartist.extend({}, options, chart.options.fillDonutOptions);
                    }

                    angular.forEach(options.items, function(value, key){
                        var $wrapper =  angular.element(options.label.html).addClass(options.label.class);
                        var item = angular.extend({}, {
                            class : '',
                            id: '',
                            content : 'fillText',
                            position: 'center', //bottom, top, left, right
                            offsetY: 0, //top, bottom in px
                            offsetX: 0 //left, right in px
                        }, value);

                        var content = angular.element();

                        if(item.id.length > 0){
                            $wrapper.attr('id', item.id);
                        }
                        if(item.class.length > 0){
                            $wrapper.addClass('class', item.class);
                        }

                        $chart.find('*[data-fill-index$="fdid-'+itemIndex+'"]').remove();
                        $wrapper.attr('data-fill-index','fdid-'+itemIndex);
                        itemIndex += 1;

                        $wrapper.append(item.content).css({
                            position : 'absolute'
                        });

                        $chart.append($wrapper);


                        var cWidth = $chart[0].clientWidth / 2;
                        var cHeight = $chart[0].clientHeight / 2;
                        var wWidth = $wrapper[0].clientWidth / 2;
                        var wHeight = $wrapper[0].clientHeight / 2;

                        var style = {
                            bottom : {
                                bottom : (0 + item.offsetY) + 'px',
                                left: (cWidth - wWidth) + item.offsetX + 'px',
                            },
                            top : {
                                top : 0  + item.offsetY + 'px',
                                left: (cWidth - wWidth) + item.offsetX + 'px',
                            },
                            left : {
                                top : (cHeight - wHeight) + item.offsetY + 'px',
                                left: 0 + item.offsetX + 'px',
                            },
                            right : {
                                top : (cHeight - wHeight) + item.offsetY + 'px',
                                right: 0 + item.offsetX + 'px',
                            },
                            center : {
                                top : (cHeight - wHeight) + item.offsetY + 'px',
                                left: (cWidth - wWidth) + item.offsetX + 'px',
                            }
                        };

                        $wrapper.css(style[item.position]);
                    });
                });
            }
        };
    };

}(window, document, Chartist));

//# sourceMappingURL=chartist-plugin-fill-donut.js.map
