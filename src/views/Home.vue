<template>
  <div>
    <a-carousel effect="fade" autoplay>
      <div
        v-for="(item, index) in imgList"
        :key="index"
        style="width: 400px; height: 600px"
      >
        <img style="width: 100%; height: 400px" :src="item.img" alt="" />
      </div>
    </a-carousel>
    <a-card size="small" title="发热人数统计图" style="width: 100%">
      <div style="width: 100%; height: 300px" id="chartOne"></div>
    </a-card>
    <a-card
      size="small"
      title="核酸统计图"
      style="width: 100%; margin-top: 30px"
    >
      <div style="width: 100%; height: 500px" id="chartTwo"></div>
    </a-card>
  </div>
</template>

<script>
import demo01 from "@/assets/image/demo01.jpg";
import demo02 from "@/assets/image/demo02.jpg";
import demo03 from "@/assets/image/demo03.jpg";
import demo04 from "@/assets/image/111.jpg";
import { UserInfoApi } from "@/api";
import * as echarts from "echarts";
const colors = ["#5470C6", "#91CC75", "#EE6666"];
export default {
  name: "Home",
  data() {
    return {
      imgList: [
        {
          img: demo01,
        },
        {
          img: demo02,
        },
        {
          img: demo03,
        },
        {
          img: demo04,
        },
      ],
      options1: {
        xAxis: {
          type: "category",
          data: [],
          name: "学院",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: true,
        },
        yAxis: {
          type: "value",
          name: "发热人数",
        },
        series: [
          {
            data: [1, 2, 4, 6, 1, 0, 0],
            type: "bar",
            smooth: false,
          },
        ],
      },
      options2: {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["实际检查人数", "应该检查人数"],
        },
        xAxis: {
          type: "category",
          data: [],
          name: "学院",
        },
        yAxis: [
          {
            type: "value",
            name: "应检人数",
            position: "right",
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value}人",
            },
          },
          {
            type: "value",
            name: "实际检查人数",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: "{value}人",
            },
          },
        ],
        series: [
          {
            name: "实际检查人数",
            type: "bar",
            yAxisIndex: 0,
            data: [2020, 1355, 2080, 610, 1270, 700, 611],
          },
          {
            name: "应该检查人数",
            type: "line",
            yAxisIndex: 1,
            data: [2024, 1361, 2085, 614, 1277, 707, 621],
          },
        ],
      },
    };
  },
  async created() {
    await this.selectAllCollege();
  },
  // mounted() {
  //   this.drawOptions();
  // },
  methods: {
    autoCarousel(slideNumber, dontAnimate) {
      console.log(slideNumber, dontAnimate);
    },
    async selectAllCollege() {
      const { data } = await UserInfoApi.selectAllCollege();
      let collegeData = [];
      data.data.map((item) => {
        collegeData.push(item.college);
      });
      this.options1.xAxis.data = collegeData;
      this.options2.xAxis.data = collegeData;
      this.drawOptions1();
      this.drawOptions2();
    },
    drawOptions1() {
      var myChart = echarts.init(document.getElementById("chartOne"));
      myChart.setOption(this.options1);
    },
    drawOptions2() {
      var myChart = echarts.init(document.getElementById("chartTwo"));
      myChart.setOption(this.options2);
    },
  },
};
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  width: 400px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.card-echarts {
  margin-top: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>