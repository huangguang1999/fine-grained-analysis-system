<template>
  <div class="content" id="map" ref="rootmap">

  </div>
</template>

<script>
  import "ol/ol.css"
  import { Map, View } from "ol"
  import Feature from 'ol/Feature';
  import {unByKey} from 'ol/Observable';
  import {easeOut} from 'ol/easing';
  import Point from 'ol/geom/Point';
  import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
  import {fromLonLat} from 'ol/proj';
  import {OSM, Vector as VectorSource} from 'ol/source';
  import {Circle as CircleStyle, Stroke, Style} from 'ol/style';
  import {getVectorContext} from 'ol/render';
  import mapconfig from '../../config/mapconfig'
  import TileArcGISRest from 'ol/source/TileArcGISRest'
  export default {
    data() {
      return {
        map: null,
        tileLayer: null,
        source: null,
        vector: null,
        timer: null,
        feature: null
      };
    },
    mounted() {
      this.initMap()
    },
    methods: {
      initMap () {
        let that = this
        this.tileLayer = new TileLayer({
          source:new TileArcGISRest({
            url:'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer'
          })
        });

        this.map = new Map({
          layers: [this.tileLayer],
          target: 'map',
          view: new View({
            projection: "EPSG:4326",
            center: [123.4, 41.7],
            zoom: 12,
            multiWorld: true
          })
        })

        this.source = new VectorSource({
          wrapX: false
        })

        this.vector = new VectorLayer({
          source: this.source
        })
        this.map.addLayer(this.vector)

        this.addRandomFeature()

        this.flash(this.feature)

        this.source.on('addfeature', function(e) {
          that.flash(e.feature);
        });

        this.timer = window.setInterval(this.addRandomFeature, 1000);
      },
      addRandomFeature () {
        let x = Math.random() * 0.4 + 123.2;
        let y = 41.9 - Math.random() * 0.3 ;
        let geom = new Point([x, y]);
        this.feature = new Feature(geom);
        this.source.addFeature(this.feature);
      },
      flash(feature) {
        let that = this
        let duration = 3000;
        let start = new Date().getTime();
        let listenerKey = this.tileLayer.on('postrender', animate);
        function animate(event) {
          let vectorContext = getVectorContext(event);
          let frameState = event.frameState;
          let flashGeom = feature.getGeometry().clone();
          let elapsed = frameState.time - start;
          let elapsedRatio = elapsed / duration;
          // radius will be 5 at start and 30 at end.
          let radius = easeOut(elapsedRatio) * 25 + 5;
          let opacity = easeOut(1 - elapsedRatio);

          let style = new Style({
            image: new CircleStyle({
              radius: radius,
              stroke: new Stroke({
                color: 'rgba(255, 0, 0, ' + opacity + ')',
                width: 0.25 + opacity
              })
            })
          });

          vectorContext.setStyle(style);
          vectorContext.drawGeometry(flashGeom);
          if (elapsed > duration) {
            unByKey(listenerKey);
            return;
          }
          // tell OpenLayers to continue postrender animation
          that.map.render();
        }
      },

    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height:100%;
  }
  .ol-attribution,.ol-zoom { display: none;}
</style>
