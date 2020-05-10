<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      // eslint-disable-next-line no-undef
      var map = new AMap.Map('container', {
        viewMode: '3D',
        pitch: 70,
        resizeEnable: true,
        center: [116.418261, 39.921984],
        zoom: 11.5
      })

      // eslint-disable-next-line no-undef
      map.addControl(new AMap.ControlBar({}))

      var heatmapOpts = {
        // 3d 相关的参数
        '3d': {
          // 热度转高度的曲线控制参数，可以利用左侧的控制面板获取
          heightBezier: [0.4, 0.2, 0.4, 0.8],
          // 取样精度，值越小，曲面效果越精细，但同时性能消耗越大
          gridSize: 2,
          heightScale: 1
        }
      }

      // 初始化heatmap对象
      // eslint-disable-next-line no-undef
      var heatmap = new AMap.Heatmap(map, heatmapOpts)

      heatmap.setDataSet({
        // eslint-disable-next-line no-undef
        data: heatmapData,
        max: 100
      // eslint-disable-next-line func-call-spacing
      })
      // eslint-disable-next-line no-unexpected-multiline
      (function () {
        var bezierInp = document.getElementById('bezierInp')

        function onBezierUpdate (val) {
          bezierInp.value = (val)

          heatmapOpts['3d'].heightBezier = val

          if (heatmap) {
            heatmap.setOptions(heatmapOpts)
          }
        }

        // eslint-disable-next-line no-undef
        bezierHelper.setBezier(heatmapOpts['3d'].heightBezier)

        // eslint-disable-next-line no-undef
        bezierInp.value = (bezierHelper.getBezier())

        window.onBezierUpdate = onBezierUpdate
      })()
    }
  }
}
</script>

<style scoped lang="less">
  #container {
    width: 100%;
    height: 1000px;
    margin: 0px;
    font-size: 13px;
  }
</style>
