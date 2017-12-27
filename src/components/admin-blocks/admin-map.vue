<style scoped lang="less">
.map-canvas{
  width: 100%;
  height: 290px;
}
</style>

<template>
  <div class="map-canvas" id="mapChart"></div>
</template>

<script>
import echarts from "echarts";
export default{
  name: "map",
  data(){
    return {
      cityData: [
        {name: '海门', value: 45},
        {name: '鄂尔多斯', value: 34},
        {name: '招远', value: 47},
        {name: '舟山', value: 22},
        {name: '齐齐哈尔', value: 74},
        {name: '广州', value: 138},
        {name: '盐城', value: 15},
        {name: '北京', value: 250},
        {name: '深圳', value: 141},
        {name: '赤峰', value: 16},
        {name: '青岛', value: 89},
        {name: '乳山', value: 18},
        {name: '金昌', value: 34},
        {name: '泉州', value: 21},
        {name: '莱西', value: 66},
        {name: '日照', value: 45},
        {name: '胶南', value: 23},
        {name: '南通', value: 54},
        {name: '拉萨', value: 22},
        {name: '云浮', value: 78},
        {name: '梅州', value: 23},
        {name: '文登', value: 78},
        {name: '上海', value: 218}
      ],

    };
  },
  mounted(){
    let convertData = function (data) {
        let geoData = {
          '海门': [121.15, 31.89],
          '鄂尔多斯': [109.781327, 39.608266],
          '招远': [120.38, 37.35],
          '舟山': [122.207216, 29.985295],
          '齐齐哈尔': [123.97, 47.33],
          '广州': [113.23, 23.16],
          '盐城': [120.13, 33.38],
          '赤峰': [118.87, 42.28],
          '深圳': [114.07, 22.62],
          '青岛': [120.33, 36.07],
          '北京': [116.46, 39.92],
          '乳山': [121.52, 36.89],
          '金昌': [102.188043, 38.520089],
          '泉州': [118.58, 24.93],
          '莱西': [120.53, 36.86],
          '日照': [119.46, 35.42],
          '胶南': [119.97, 35.88],
          '南通': [121.05, 32.08],
          '拉萨': [91.11, 29.97],
          '云浮': [112.02, 22.93],
          '梅州': [116.1, 24.55],
          '文登': [122.05, 37.2],
          '上海': [121.48, 31.22]
        };
        let res = [];
        let len = data.length;
        for (let i = 0; i < len; i++) {
            let geoCoord = geoData[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    const chinaJson = require('./map-data/china.json');
    let map =echarts.init(document.getElementById("mapChart"));
    echarts.registerMap('china', chinaJson);
    map.setOption({
      backgroundColor: '#FFF',
      geo: {
          map: 'china',
          label: {
              emphasis: {
                  show: false
              }
          },
          itemStyle: {
              normal: {
                  areaColor: '#EFEFEF',
                  borderColor: '#CCC'
              },
              emphasis: {
                  areaColor: '#E5E5E5'
              }
          }
      },
      grid: {
          top: 0,
          left: '2%',
          right: '2%',
          bottom: '0',
          containLabel: true
      },
      series: [{
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(this.cityData),
          symbolSize: function (val) {
              return val[2] / 10;
          },
          label: {
              normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
              },
              emphasis: {
                  show: true
              }
          },
          itemStyle: {
              normal: {
                  color: '#0099CC'
              }
          }
      }]
    });
    window.addEventListener('resize', function () {
      map.resize();
    });
  }
};
</script>
