<template>
  <el-form ref="form" title="" :model="form" label-width="80px">
    <el-form-item label="计划名称">
      <el-input v-model="form.planName"></el-input>
    </el-form-item>
    <el-form-item label="播放策略">
      <el-radio-group v-model="form.playStrategy">
        <el-radio label="替换"></el-radio>
        <el-radio label="插播"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="播放模式">
      <el-radio-group v-model="form.playMode">
        <el-radio label="时段播放"></el-radio>
        <el-radio label="持续播放"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="多屏同步">
      <el-radio-group v-model="form.synchronize">
        <el-radio label="打开"></el-radio>
        <el-radio label="关闭"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="播放日期">
      <el-date-picker
        v-model="playDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-form-item>
    <div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
</style>