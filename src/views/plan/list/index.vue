<template>
  <div class="view-container">
    <!-- 筛选栏 -->
    <div class="filter-container">
      <!-- 第一行 -->
      <el-row type="flex" justify="space-between">
        <!-- 输入框 计划名称 -->
        <el-col :span="10">
          <el-col :span="6">
            <div style="line-height: 40px">计划名称:</div>
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="queryList.planName"
              placeholder="请输入计划名称"
              style="width: 210px"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
            <el-button
              class="my-icon-button"
              icon="el-icon-search"
              @click="handleFilter"
            />
          </el-col>
        </el-col>
        <!-- 下拉框 计划状态 -->
        <el-col :span="10">
          <el-col :span="6">
            <div style="line-height: 40px">计划状态:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.planStatus"
              placeholder="请选择计划状态"
              clearable
              style="width: 250px"
              class="filter-item"
            >
              <el-option
                v-for="item in planStatusList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="5">
          <!-- 按钮 重置 -->
          <el-button
            class="filter-item"
            icon="el-icon-edit"
            @click="handleReset"
          >
            重置
          </el-button>
          <!-- 按钮 查询 -->
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
            查询
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 功能栏 -->
    <div class="function-button-container">
      <el-row type="flex" justify="end">
        <el-col :span="6">
          <!-- 按钮 新建计划 -->
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-edit-outline"
            @click="handleCreate"
          >
            新建计划
          </el-button>
          <!-- 按钮 批量删除 -->
          <el-button
            class="filter-item"
            icon="el-icon-delete"
            @click="handleBatchDelete"
          >
            批量删除
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 表格 -->
    <el-table
      :key="tableKey"
      :data="dataList"
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
      class="table table-container"
    >
      <!-- 复选框 -->
      <el-table-column type="selection" width="50px" />
      <!-- 缩略图 -->
      <el-table-column
        label="缩略图"
        prop="groupID"
        align="center"
        width="100px"
        :class-name="getSortClass('groupID')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.imgPreview }}</span>
        </template>
      </el-table-column>
      <!-- 计划名称 -->
      <el-table-column label="计划名称" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.planName }}</span>
        </template>
      </el-table-column>
      <!-- 计划状态 -->
      <el-table-column label="计划状态" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.planStatus }}</span>
        </template>
      </el-table-column>
      <!-- 播放模式 -->
      <el-table-column label="播放模式" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.playMode }}</span>
        </template>
      </el-table-column>
      <!-- 播放日期 -->
      <el-table-column label="播放日期" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.playDate }}</span>
        </template>
      </el-table-column>
      <!-- 作者 -->
      <el-table-column label="作者" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <!-- 审核人 -->
      <el-table-column label="审核人" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <!-- 更新日期 -->
      <el-table-column label="更新日期" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updateDate }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="text" @click="handleMoreInfo(row)"> 详情 </el-button>
          <el-button type="text" @click="handleUpdate(row)"> 修改 </el-button>
          <el-button type="text" @click="handleUpdate(row)"> 复制 </el-button>
          <el-button type="text" @click="handleDelete($index)">
            删除
          </el-button>
          <el-button type="text" @click="handleUpdate(row)">
            加密下载
          </el-button>
          <el-button type="text" @click="handleUpdate(row)"> 发布 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryList.page"
      :limit.sync="queryList.limit"
      @pagination="getList"
    />

    <!-- 对话框 编辑分组 -->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left: 50px"
      >
        <!-- 分组名称 -->
        <el-form-item label="分组名称:" prop="groupName">
          <el-input v-model="temp.groupName" placeholder="请输入分组名称" />
        </el-form-item>
        <!-- 所属机构 -->
        <el-form-item label="所属机构:" prop="agency">
          <el-select
            v-model="temp.agency"
            class="filter-item"
            placeholder="请选择所属机构"
          >
            <el-option
              v-for="item in agencyList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述:" prop="describe">
          <el-input v-model="temp.describe" placeholder="描述最多200字" />
        </el-form-item>
        <!-- 设备选择 -->
        <el-form-item label="设备选择:">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="请选择设备"
          >
            <el-option
              v-for="item in equNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表尾 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          保存
        </el-button>
      </div>
    </el-dialog>

    <!-- 对话框 详情 -->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogTableVisible"
    >
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <!-- 计划详情 -->
          <el-tab-pane label="计划详情" name="first">
            <!-- 第一行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="6"> 计划名称: </el-col>
                <el-col :span="18"> test </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="6"> 播放日期: </el-col>
                <el-col :span="18"> 2022-06-27 14:31:14 </el-col>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="6"> 已选节目: </el-col>
                <el-col :span="18">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="url"
                    :preview-src-list="srcList"
                  >
                  </el-image>
                </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="6"> </el-col>
                <el-col :span="18"> </el-col>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 设备详情 -->
          <el-tab-pane label="设备详情" name="second">
            <!-- 第一行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="6"> 设备型号: </el-col>
                <el-col :span="18"> HiDPTAndroid Hi3751V553 </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="6"> 系统版本: </el-col>
                <el-col :span="18"> BOE_iGallery32_V13103_V5.2.0 </el-col>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </template>
      <!-- 表尾 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false"
          >返回</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle } from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "Equipment-GroupList",
  components: {
    Pagination,
  },
  directives: { waves },
  data() {
    return {
      // 图片资源
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      ],
      // 表格 显示的数据
      dataList: [
        {
          imgPreview: "--",
          planName: "1",
          planStatus: "发布中",
          playMode: "--",
          playDate: "--",
          author: "--",
          reviewer: "--",
          updateDate: "--",
        },
        {
          imgPreview: "--",
          planName: "2",
          planStatus: "发布中",
          playMode: "--",
          playDate: "--",
          author: "--",
          reviewer: "--",
          updateDate: "--",
        },
        {
          imgPreview: "--",
          planName: "3",
          planStatus: "发布成功",
          playMode: "--",
          playDate: "--",
          author: "--",
          reviewer: "--",
          updateDate: "--",
        },
      ],
      /*--------------------------------------------*/
      // 下拉框 选项
      planStatusList: [
        "所有状态",
        "待发布",
        "发布中",
        "发布成功",
        "部分成功",
        "发布失败",
        "已结束",
        "已失效",
        "审核中",
      ],
      agencyList: ["机构1", "机构2", "机构3"],
      equNameList: ["设备1", "设备2", "设备3"],
      // 筛选栏 绑定的数据
      queryList: {
        page: 1,
        limit: 20,
        planName: undefined,
        planStatus: undefined,
      },
      // 对话框 绑定的临时数据
      temp: {
        groupName: undefined,
        agency: 1,
        describe: "",
        status: "",
      },
      // 对话框 标题
      dialogTitleMap: {
        update: "编辑分组",
        create: "新建分组",
        more: "计划详情",
      },
      // 对话框 属性验证规则
      rules: {
        groupName: [
          {
            required: true,
            message: "groupName is required",
            trigger: "change",
          },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      // 对话框 显示控制标志
      dialogFormVisible: false,
      dialogTableVisible: false,
      // 对话框 相关其他数据
      activeName: "first",
      /*--------------------------------------------*/
      // 表格 相关其他数据
      total: 0,
      tableKey: 0,
      listLoading: true,
    };
  },
  // created 生命周期
  created() {
    this.getList();
  },
  methods: {
    // 获得数据
    getList() {
      this.listLoading = true;
      // fetchList(this.queryList).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total

      // 模拟请求的时间
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    // 按钮 重置
    handleReset() {
      this.queryList = {
        planName: "",
        planStatus: "",
      };
    },
    // 按钮 查询
    handleFilter() {
      this.queryList.page = 1;
      // this.getList()
    },
    // 按钮 新建分组
    handleCreate() {
      this.$router.push("/plan/list/new");
    },
    // 按钮 批量删除
    handleBatchDelete() {
      this.$notify({
        title: "删除成功",
        message: "批量删除成功",
        type: "success",
        duration: 2000,
      });
    },
    // 按钮 详情
    handleMoreInfo(row) {
      this.dialogStatus = "more";
      this.dialogTableVisible = true;
      this.temp = Object.assign({}, row);
    },
    // 按钮 编辑
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 按钮 删除
    handleDelete(index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
    // 对话框 按钮 保存
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.list.unshift(this.temp);
          this.dialogFormVisible = false;
          this.$notify({
            title: "创建成功",
            message: "创建成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    // 表格 排序功能
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.queryList.sort = "+id";
      } else {
        this.queryList.sort = "-id";
      }
      this.handleFilter();
    },
    getSortClass: function (key) {
      const sort = this.queryList.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/public-styles.scss";
</style>
