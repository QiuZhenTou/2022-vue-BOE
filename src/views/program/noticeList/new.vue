<template>
  <div class="new-notice-container">
    <el-row>
      <el-col :span="14">
        <div class="screen-input">
          <div id="virtual-screen">
            <marquee
              :scrollamount="speed"
              scrolldelay="60"
              direction="left"
              onmouseover="this.stop()"
              onmouseout="this.start()"
              :style="[
                { color: textColor },
                { fontSize: multiple * fontSize / 20 + 'rem' },
                { backgroundColor: backgroundColor },
                { lineHeight: multiple * (lineHeight / 10 + 1 )+ 'rem' },
                { paddingTop: multiple * position / 10 + 'rem' },
              ]"
              >{{ text }}
            </marquee>
          </div>
          <el-input
            v-model="text"
            :autosize="{ minRows: 4 }"
            placeholder="请输入公告内容"
            show-word-limit
            type="textarea"
            class="noticeInput"
            ref="getValue"
          />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="menu-container">
          <div class="menu-item-container">
            <span class="menu-label"> 文字颜色: </span>
            <el-color-picker v-model="textColor" show-alpha />
          </div>
          <div class="menu-item-container">
            <span class="menu-label"> 文字字号: </span>
            <div class="slider">
              <el-slider v-model="fontSize"></el-slider>
            </div>
          </div>
          <el-divider />
          <div class="menu-item-container">
            <span class="menu-label"> 背景颜色: </span>
            <el-color-picker v-model="backgroundColor" show-alpha />
          </div>
          <div class="menu-item-container">
            <span class="menu-label"> 背景高度: </span>
            <div class="slider">
              <el-slider v-model="lineHeight"></el-slider>
            </div>
          </div>
          <el-divider />
          <div>
            <div>
              <div class="menu-item-container">
                <span class="menu-label"> 文字位置: </span>
                <el-select v-model="position">
                  <el-option label="上" value="0" />
                  <el-option label="中" value="60" />
                  <el-option label="下" value="120" />
                </el-select>
              </div>

              <div class="menu-item-container">
                <span class="menu-label"> 播放速度: </span>
                <el-select v-model="speed">
                  <el-option label="快" value="12" />
                  <el-option label="中" value="6" />
                  <el-option label="慢" value="3" />
                </el-select>
              </div>

              <div class="menu-item-container">
                <span class="menu-label"> 播放模式: </span>
                <el-radio-group v-model="radio" class="ml-4">
                  <el-radio label="1" size="middle" class="menu-label"
                    >时段播放</el-radio
                  >
                  <el-radio label="2" size="large" class="menu-label"
                    >持续播放</el-radio
                  >
                  <div class="block" v-if="radio == 1">
                    <el-date-picker
                      v-model="lineHeight"
                      type="datetimerange"
                      :shortcuts="shortcuts"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                    />
                  </div>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <el-button @click="handleCancel"> 取消 </el-button>
        <el-button type="primary" @click="handleNext"> 下一步 </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      textColor: "rgb(255, 255, 255)",
      backgroundColor: "rgb(0, 0, 0)",
      fontSize: 15,
      lineHeight: 20,
      position: "0",
      speed: "6",
      radio: "2",
      multiple: 1, // 画屏倍数 3 
    };
  },
  methods: {
    handleCancel() {
      this.$router.push("/program/noticeList");
    },
    handleNext() {
      this.$router.push("/program/noticeList/equipment");
    },
  },
};
</script>
<style lang="scss" scoped>
.screen-input {
  margin: 10px 15px;
}
.new-notice-container {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.075);
  margin: 10px 20px;
  padding: 20px 0px;
}
.menu-label {
  padding-right: 10px;
}
.slider {
  width: 200px;
}
#virtual-screen {
  font-family: "微软雅黑";
  font-size: 40px;
  color: white;
  padding-top: 0px;
  text-decoration: none;
  height: 360px;
  width: 640px;
  border: 25px ridge white;
  background-color: black;
  overflow: hidden;
}
.noticeInput {
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.075);
  margin-top: 20px;
  width: 640px;
}

.menu-item-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
</style>
