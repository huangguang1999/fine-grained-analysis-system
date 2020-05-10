<template>
  <div>
    <el-card>
      <div id="container"></div>
      <div class="graph">
          <h2>heightBezier:</h2>
          <input type="text" id="bezierInp" readonly="readonly"/>
          <figure>
              <canvas id="curve" width="210" height="550"></canvas>
              <figcaption id="axisHeat">热度</figcaption>
              <figcaption id="axisHeight">高度</figcaption>
          </figure>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      heatmapData: [{
        'lng': 116.191031,
        'lat': 39.988585,
        'count': 10
      }, {
        'lng': 116.389275,
        'lat': 39.925818,
        'count': 11
      }, {
        'lng': 116.287444,
        'lat': 39.810742,
        'count': 12
      }, {
        'lng': 116.481707,
        'lat': 39.940089,
        'count': 13
      }, {
        'lng': 116.410588,
        'lat': 39.880172,
        'count': 14
      }, {
        'lng': 116.394816,
        'lat': 39.91181,
        'count': 15
      }, {
        'lng': 116.416002,
        'lat': 39.952917,
        'count': 16
      }, {
        'lng': 116.39671,
        'lat': 39.924903,
        'count': 17
      }, {
        'lng': 116.180816,
        'lat': 39.957553,
        'count': 18
      }, {
        'lng': 116.382035,
        'lat': 39.874114,
        'count': 19
      }, {
        'lng': 116.316648,
        'lat': 39.914529,
        'count': 20
      }, {
        'lng': 116.395803,
        'lat': 39.908556,
        'count': 21
      }, {
        'lng': 116.74553,
        'lat': 39.875916,
        'count': 22
      }, {
        'lng': 116.352289,
        'lat': 39.916475,
        'count': 23
      }, {
        'lng': 116.441548,
        'lat': 39.878262,
        'count': 24
      }, {
        'lng': 116.318947,
        'lat': 39.942735,
        'count': 25
      }, {
        'lng': 116.382585,
        'lat': 39.941949,
        'count': 26
      }, {
        'lng': 116.42042,
        'lat': 39.884017,
        'count': 27
      }, {
        'lng': 116.31744,
        'lat': 39.892561,
        'count': 28
      }, {
        'lng': 116.407059,
        'lat': 39.912438,
        'count': 29
      }, {
        'lng': 116.412351,
        'lat': 39.888082,
        'count': 30
      }, {
        'lng': 116.444341,
        'lat': 39.915891,
        'count': 31
      }, {
        'lng': 116.335385,
        'lat': 39.741756,
        'count': 32
      }, {
        'lng': 116.3926,
        'lat': 40.008733,
        'count': 33
      }, {
        'lng': 116.389731,
        'lat': 39.92292,
        'count': 34
      }, {
        'lng': 116.413371,
        'lat': 39.874483,
        'count': 35
      }, {
        'lng': 116.199752,
        'lat': 39.911717,
        'count': 36
      }, {
        'lng': 116.278472,
        'lat': 40.254994,
        'count': 37
      }, {
        'lng': 116.464252,
        'lat': 39.925828,
        'count': 38
      }, {
        'lng': 116.479475,
        'lat': 39.937945,
        'count': 39
      }, {
        'lng': 116.415599,
        'lat': 39.956902,
        'count': 40
      }, {
        'lng': 116.355675,
        'lat': 39.870089,
        'count': 41
      }, {
        'lng': 116.295267,
        'lat': 39.987171,
        'count': 42
      }, {
        'lng': 116.323634,
        'lat': 39.911692,
        'count': 43
      }, {
        'lng': 116.692769,
        'lat': 40.173307,
        'count': 44
      }, {
        'lng': 116.287888,
        'lat': 39.928531,
        'count': 45
      }, {
        'lng': 116.386502,
        'lat': 39.922747,
        'count': 46
      }, {
        'lng': 116.236773,
        'lat': 40.218341,
        'count': 47
      }, {
        'lng': 116.490636,
        'lat': 39.804253,
        'count': 48
      }, {
        'lng': 116.391095,
        'lat': 39.925791,
        'count': 49
      }, {
        'lng': 116.472402,
        'lat': 39.769178,
        'count': 50
      }, {
        'lng': 116.38657,
        'lat': 39.956731,
        'count': 51
      }, {
        'lng': 116.427536,
        'lat': 39.943671,
        'count': 52
      }, {
        'lng': 116.374547,
        'lat': 39.967588,
        'count': 53
      }, {
        'lng': 116.380383,
        'lat': 39.871634,
        'count': 54
      }, {
        'lng': 116.376092,
        'lat': 39.965485,
        'count': 55
      }, {
        'lng': 116.352424,
        'lat': 39.91811,
        'count': 56
      }, {
        'lng': 116.020157,
        'lat': 40.348526,
        'count': 57
      }, {
        'lng': 116.416201,
        'lat': 39.951736,
        'count': 58
      }, {
        'lng': 116.405392,
        'lat': 39.908738,
        'count': 59
      }, {
        'lng': 116.49238,
        'lat': 39.926248,
        'count': 60
      }, {
        'lng': 116.389282,
        'lat': 39.988391,
        'count': 61
      }, {
        'lng': 116.396683,
        'lat': 39.923487,
        'count': 62
      }, {
        'lng': 116.41718,
        'lat': 39.905213,
        'count': 63
      }, {
        'lng': 116.321512,
        'lat': 39.913192,
        'count': 64
      }, {
        'lng': 116.260028,
        'lat': 40.03353,
        'count': 65
      }, {
        'lng': 116.394846,
        'lat': 39.911168,
        'count': 66
      }, {
        'lng': 116.374767,
        'lat': 39.96608,
        'count': 67
      }, {
        'lng': 116.6841,
        'lat': 39.909762,
        'count': 68
      }, {
        'lng': 116.3838,
        'lat': 39.95811,
        'count': 69
      }, {
        'lng': 116.39243,
        'lat': 40.01143,
        'count': 70
      }, {
        'lng': 116.661912,
        'lat': 40.121137,
        'count': 71
      }, {
        'lng': 116.333056,
        'lat': 39.90123,
        'count': 72
      }, {
        'lng': 116.484839,
        'lat': 39.881729,
        'count': 73
      }, {
        'lng': 116.360923,
        'lat': 39.935745,
        'count': 74
      }, {
        'lng': 116.408531,
        'lat': 39.953194,
        'count': 75
      }, {
        'lng': 116.417916,
        'lat': 39.954029,
        'count': 76
      }, {
        'lng': 116.412215,
        'lat': 39.992282,
        'count': 77
      }, {
        'lng': 116.181532,
        'lat': 40.048762,
        'count': 78
      }, {
        'lng': 116.434848,
        'lat': 40.070463,
        'count': 79
      }, {
        'lng': 116.385039,
        'lat': 39.956937,
        'count': 80
      }, {
        'lng': 116.755067,
        'lat': 39.854499,
        'count': 81
      }, {
        'lng': 116.396061,
        'lat': 39.912841,
        'count': 82
      }, {
        'lng': 116.474303,
        'lat': 39.971398,
        'count': 83
      }, {
        'lng': 116.376262,
        'lat': 39.85811,
        'count': 84
      }, {
        'lng': 116.403783,
        'lat': 39.954469,
        'count': 85
      }, {
        'lng': 116.339136,
        'lat': 39.729159,
        'count': 86
      }, {
        'lng': 116.240159,
        'lat': 39.947003,
        'count': 87
      }, {
        'lng': 117.107541,
        'lat': 40.141457,
        'count': 88
      }, {
        'lng': 116.341813,
        'lat': 40.078786,
        'count': 89
      }, {
        'lng': 116.320648,
        'lat': 39.706455,
        'count': 90
      }, {
        'lng': 116.402566,
        'lat': 39.960873,
        'count': 91
      }, {
        'lng': 116.849261,
        'lat': 40.402999,
        'count': 92
      }, {
        'lng': 116.521064,
        'lat': 39.834187,
        'count': 93
      }, {
        'lng': 116.329942,
        'lat': 39.925327,
        'count': 94
      }, {
        'lng': 116.479852,
        'lat': 39.974856,
        'count': 95
      }, {
        'lng': 116.399185,
        'lat': 39.925736,
        'count': 96
      }, {
        'lng': 116.193166,
        'lat': 39.911953,
        'count': 1
      }, {
        'lng': 116.400916,
        'lat': 39.870614,
        'count': 2
      }, {
        'lng': 116.518041,
        'lat': 39.956615,
        'count': 3
      }, {
        'lng': 116.388981,
        'lat': 39.997716,
        'count': 4
      }, {
        'lng': 116.285852,
        'lat': 39.863497,
        'count': 5
      }, {
        'lng': 116.294167,
        'lat': 39.884599,
        'count': 6
      }, {
        'lng': 116.394235,
        'lat': 39.996845,
        'count': 7
      }]
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      var that = this
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
        data: that.heatmapData,
        max: 100
      })

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
    }
  }
}
</script>

<style scoped>
  #container {
    width: 100%;
    height: 100%;
  }
</style>
