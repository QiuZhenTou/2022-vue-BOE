<template>
  <div class="container">
    <!-- gutter属性设置方格之间的距离 -->
    <el-row :gutter="20" class="panel-group">
      <!-- xs sm lg 分别对应各种尺寸显示器的表格占行 web端对应的是lg -->
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="device" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">设备数量</div>
            <div class="card-panel-num">1</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="program" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">节目数量</div>
            <div class="card-panel-num">23</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="plan" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">计划数量</div>
            <div class="card-panel-num">23</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 左侧环形进度条 设备状态 -->
        <div class="left">
          <div class="title">
            <div class="blueLine" />
            <span class="sp">设备状态</span>
          </div>
          <div class="info">
            <el-progress
              type="circle"
              :percentage="circle_percentage"
              :stroke-width="10"
            />
            <!-- 设备信息，具体离线、播放、空闲的设备数量 -->
            <div class="deviceInfo">
              <div class="offline test">
                <!-- 小绿点 -->
                <dot :dot-color="dotColor_offline" />
                <span class="sp">离线 {{ offline_num }}台</span>
              </div>
              <div class="onlion test">
                <dot :dot-color="dotColor_onlion" />
                <span class="sp">在线 {{ onlion_num }}台</span>
              </div>
              <div class="free test">
                <dot :dot-color="dotColor_free" />
                <span class="sp">空闲 {{ free_num }}台</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="medium">
          <div class="title">
            <div class="blueLine" />
            <span class="sp">素材资源</span>
          </div>
          <div class="info">
            <el-progress
              type="circle"
              :percentage="100"
              :format="jsjs"
              :stroke-width="10"
            />
            <!-- 设备信息，具体离线、播放、空闲的设备数量 -->
            <div class="deviceInfo">
              <div class="offline test">
                <!-- 小绿点 -->
                <dot :dot-color="dotColor_offline" />
                <span class="sp">图片 4.85MB</span>
              </div>
              <div class="onlion test">
                <dot :dot-color="dotColor_onlion" />
                <span class="sp">视频 0B</span>
              </div>
              <div class="free test">
                <dot :dot-color="dotColor_free" />
                <span class="sp">音频 0B</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 柱状图 -->
      <el-col :span="8">
        <div class="right">
          <el-card shadow="hover">
            <schart
              ref="bar"
              class="schart"
              canvas-id="bar"
              :options="options"
            />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col span="24">
        <div class="bottom">
          <div class="title">
            <div class="blueLine" />
            <span>计划审核提醒</span>
          </div>
          <div class="table">
            <el-table :data="tableData" height="250" border style="width: 100%">
              <el-table-column prop="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="name" label="计划名称" width="180">
              </el-table-column>
              <el-table-column prop="status" label="计划状态" width="150">
              </el-table-column>
              <el-table-column prop="date" label="提交时间" width="180">
              </el-table-column>
              <el-table-column prop="people" label="提交人" width="180">
              </el-table-column>
              <el-table-column prop="option" label="操作">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Schart from "vue-schart";
import dot from '@/components/Dot'

export default {
  name: 'Home',
  components: { dot, Schart },

  data () {
    return {
      dotColor_offline: '#708090',
      dotColor_onlion: '#008000',
      dotColor_free: '#FFA500',
      // 各种状态设备数量
      offline_num: 1,
      onlion_num: 1,
      free_num: 1,
      circle_percentage: -1,
      // 设备分布图 展示设备分组情况
      options: {
        type: "bar",
        title: {
          text: "设备分布图",
        },
        labels: ["分组1", "分组2", "分组3", "分组4"],
        datasets: [
          {
            label: "设备数量",
            data: [1, 0, 0, 0],
          },
        ],
      },
      // 计划审核提醒
      tableData: [{
        index: 1,
        name: '测试001',
        status: '发布成功',
        date: '2016-05-03',
        people: '周禹江',
        option: '发布图片'
      }, {
        index: 2,
        name: '测试002',
        status: '发布失败',
        date: '2022-06-28',
        people: '邱哲朋',
        option: '你管我发布啥'
      }, {
        index: 3,
        name: '测试003',
        status: '发布中',
        date: '2022-06-28',
        people: '郑瑞焓',
        option: '发布图片、视频、公告'
      }, {
        index: 4,
        name: '测试004',
        status: '发布成功',
        date: '2022-06-28',
        people: '张晶',
        option: '发布图片'
      }, {
        index: 5,
        name: '测试005',
        status: '发布成功',
        date: '2022-06-28',
        people: 'zyj',
        option: '发布图片'
      }, {
        index: 6,
        name: '测试006',
        status: '发布失败',
        date: '2022-06-28',
        people: 'zj',
        option: '发布公告'
      }, {
        index: 7,
        name: '测试007',
        status: '发布中',
        date: '2022-06-28',
        people: 'qks',
        option: '发布视频'
      }]
    }
  },

  computed: {
    ...mapGetters([
      'name'
    ])
  },

  created () {
    this.percentage()
  },

  methods: {
    // 计算环形图占比
    percentage: function () {
      this.circle_percentage = Math.floor((this.onlion_num * 100) / (this.offline_num + this.onlion_num + this.free_num))
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 98px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.container {
  padding: 20px 50px;
}
.left {
  display: flex;
  flex-direction: column;
  height: 230px;
  padding: 20px 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  .title {
    display: flex;
    align-items: center;
    .blueLine {
      background-color: rgb(24, 144, 255);
      width: 5px;
      height: 25px;
    }
    .sp {
      margin-left: 10px;
    }
  }
  .info {
    display: flex;
    // 侧轴居中
    align-items: center;
    margin-top: 30px;
    .deviceInfo {
      display: flex;
      height: 125px;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      margin-left: 50px;
      .test {
        display: flex;
      }
    }
  }
}

.medium {
  display: flex;
  flex-direction: column;
  height: 230px;
  padding: 20px 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  .title {
    display: flex;
    align-items: center;
    .blueLine {
      background-color: rgb(24, 144, 255);
      width: 5px;
      height: 25px;
    }
    .sp {
      margin-left: 10px;
    }
  }
  .info {
    display: flex;
    // 侧轴居中
    align-items: center;
    margin-top: 30px;
    // flex-direction: ;
    .deviceInfo {
      display: flex;
      height: 125px;
      justify-content: space-evenly;
      // 左对齐
      align-items: left;
      flex-direction: column;
      margin-left: 50px;
      .test {
        display: flex;
      }
    }
  }
}

.right {
  height: 210px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  .el-card__body {
    padding: 0px;
    .schart {
      height: 190px;
    }
  }
}

.bottom {
  margin-top: 20px;
  height: 325px;
  width: 1210px;
  padding: 20px 20px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .blueLine {
      background-color: rgb(24, 144, 255);
      width: 5px;
      height: 25px;
      margin-right: 10px;
    }
  }
}
</style>
