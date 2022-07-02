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
      <!-- 序号 -->
      <el-table-column label="序号" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.itemID }}</span>
        </template>
      </el-table-column>
      <!-- 缩略图 -->
      <el-table-column
        label="缩略图"
        prop="groupID"
        align="center"
        width="150px"
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
      <!-- 	使用设备数 -->
      <el-table-column label="	使用设备数" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.usedEquNum }}</span>
        </template>
      </el-table-column>
      <!-- 作者 -->
      <el-table-column label="作者" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <!-- 更新日期 -->
      <el-table-column label="更新日期" width="200px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updateDate }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="200px" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="info"
            size="mini"
            @click="handleMoreInfo(row, $index)"
          >
            详情
          </el-button>
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
          itemID: 1,
          imgPreview: "--",
          planName: "1",
          usedEquNum: 1,
          author: "--",
          updateDate: "--",
        },
        {
          itemID: 2,
          imgPreview: "--",
          planName: "1",
          usedEquNum: 1,
          author: "--",
          updateDate: "--",
        },
        {
          itemID: 3,
          imgPreview: "--",
          planName: "1",
          usedEquNum: 1,
          author: "--",
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
    // 按钮 详情
    handleMoreInfo(row) {
      this.dialogStatus = "more";
      this.dialogTableVisible = true;
      this.temp = Object.assign({}, row);
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
