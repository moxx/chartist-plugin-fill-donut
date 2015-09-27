# Tooltip plugin for Chartist.js

This plugin provides a hacky way to fill a donut before pie animation will start and add multiple html or text to the chart on differend positions.
Plugin will just work with Chartist Pie charts.

Please visit http://gionkunz.github.io/chartist-js/plugins.html for more information.

## Available options and their defaults

```javascript
var defaultOptions = {
    fillClass: 'ct-fill-donut',
    label : {
        html: '<div class="ct-fill-donut-label"></div>',
    },
    items : [{
	class : '',
        id: '',
        content : 'fillText',
        position: 'center', //bottom, top, left, right
        offsetY: 0, //top, bottom in px
        offsetX: 0 //left, right in px
    }]
};

```

## Sample usage in Chartist.js

`bower install chartist-plugin-fill-donut --save`

Example:
```js
var chart = new Chartist.Pie('#chart-e1', {
              series: [160, 60 ],
              labels: ['', '']
          }, {
              donut: true,
              donutWidth: 20,
              startAngle: 210,
              total: 260,
              showLabel: false,
              plugins: [
                  Chartist.plugins.fillDonut({
                      items: [{
                          content: '<i class="fa fa-tachometer text-muted"></span>',
                          position: 'bottom',
                          offsetY : 10,
                          offsetX: -2
                      }, {
                          content: '<h3>160<span class="small">mph</span></h3>'
                      }]
                  })
              ],
          });

          chart.on('draw', function(data) {
              if(data.type === 'slice' && data.index == 0) {
                  array animation
                  var pathLength = data.element._node.getTotalLength();

                  data.element.attr({
                      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                  });

                  var animationDefinition = {
                      'stroke-dashoffset': {
                          id: 'anim' + data.index,
                          dur: 1200,
                          from: -pathLength + 'px',
                          to:  '0px',
                          easing: Chartist.Svg.Easing.easeOutQuint,
                          fill: 'freeze'
                      }
                  };
                  data.element.attr({
                      'stroke-dashoffset': -pathLength + 'px'
                  });
                  data.element.animate(animationDefinition, true);
              }
          });
```
