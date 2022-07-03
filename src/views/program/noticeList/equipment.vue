<template>
  <div class="view-container">
    <!-- 筛选栏 -->
    <div class="filter-container">
      <!-- 第一行 -->
      <el-row type="flex" justify="space-around">
        <!-- 输入框 设备名称 -->
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">设备名称:</div>
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="queryList.equName"
              placeholder="请输入设备名称"
              style="width: 200px"
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
        <!-- 下拉框 所属机构 -->
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">所属机构:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.agency"
              placeholder="请选择所属机构"
              clearable
              style="width: 240px"
              class="filter-item"
            >
              <el-option
                v-for="item in agencyList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-col>
        <!-- 下拉框 所属分组 -->
        <el-col :span="8">
          <el-col :span="3"> </el-col>
          <el-col :span="6">
            <div style="line-height: 40px">所属分组:</div>
          </el-col>
          <el-col :span="15">
            <el-select
              v-model="queryList.group"
              placeholder="请选择所属分组"
              clearable
              style="width: 240px"
              class="filter-item"
            >
              <el-option
                v-for="item in groupList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5" :offset="19">
          <!-- 重置按钮 -->
          <el-button
            class="filter-item"
            icon="el-icon-refresh"
            @click="handleReset"
          >
            重置
          </el-button>
          <!-- 查询按钮 -->
          <el-button
            v-waves
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

    <!-- 标签页 -->
    <el-tabs
      type="card"
      v-model="activeTab"
      @tab-click="handleClick"
      class="table"
    >
      <el-tab-pane label="单个设备" name="first">
        <!-- 表格 选择设备 -->
        <el-table
          :key="tableKey"
          :data="equDataList"
          fit
          highlight-current-row
          style="width: 100%"
          @sort-change="sortChange"
          class="table table-container"
        >
          <el-table-column type="selection" width="25px" />
          <el-table-column
            label="设备名称"
            prop="id"
            align="center"
            width="150px"
            :class-name="getSortClass('id')"
          >
            <template slot-scope="{ row }">
              <span>{{ row.equName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属机构" width="120px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.agency }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属分组" width="120px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.group }}</span>
            </template>
          </el-table-column>
          <el-table-column label="MAC地址" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.macAddress }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分辨率" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.resolution }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备状态" width="120px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.equStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统升级" width="120px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.systemStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当前计划" width="120px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.plan }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="设备分组" name="second">
        <!-- 表格 选择分组 -->
        <el-table
          :key="tableKey"
          :data="groupDataList"
          fit
          highlight-current-row
          style="width: 100%"
          @sort-change="sortChange"
          class="table table-container"
        >
          <el-table-column type="selection" width="25px" />
          <el-table-column
            label="分组ID"
            prop="groupID"
            align="center"
            width="150px"
            :class-name="getSortClass('groupID')"
          >
            <template slot-scope="{ row }">
              <span>{{ row.groupID }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分组名称" width="200px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.groupName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属机构" width="200px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.agency }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备数量" width="100px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.equNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" width="250px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.describe }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryList.page"
      :limit.sync="queryList.limit"
      @pagination="getList"
    />

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-button @click="handleCancel"> 取消 </el-button>
        <el-button @click="handleBefore"> 上一步 </el-button>
        <el-button type="primary" @click="handleFinish"> 完成 </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle } from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: {
    Pagination,
  },
  directives: { waves },
  data() {
    return {
      // 表格 显示的数据
      equDataList: [
        {
          equName: "设备1",
          agency: "机构1",
          group: "分组1",
          macAddress: "123-312-213",
          resolution: "1920*1080(横)",
          equStatus: "离线",
          systemStatus: "已是最新",
          plan: "-",
        },
      ],
      groupDataList: [
        {
          groupID: 1,
          groupName: "分组1",
          agency: "机构1",
          equNum: "1",
          describe: "没有描述",
          equName: ["设备1"],
        },
        {
          groupID: 2,
          groupName: "分组1",
          agency: "机构1",
          equNum: "1",
          describe: "没有描述",
          equName: ["设备1"],
        },
        {
          groupID: 3,
          groupName: "分组1",
          agency: "机构1",
          equNum: "1",
          describe: "没有描述",
          equName: ["设备1"],
        },
      ],
      /*--------------------------------------------*/
      // 下拉框 选项
      agencyList: ["机构1", "机构2", "机构3"],
      groupList: ["组1", "组2", "组3"],
      planList: ["计划1", "计划2", "计划3"],
      equStatusList: ["全部", "播放", "空闲", "离线"],
      systemStatusList: ["全部", "已是最新", "升级", "有新版本"],
      // 筛选栏 绑定的数据
      queryList: {
        page: 1,
        limit: 20,
        equName: "",
        agency: "",
        group: "",
        macAddress: "",
        resolution: "",
        equStatus: "全部",
        systemStatus: "全部",
        plan: "",
        snCode: "",
      },
      // 对话框 绑定的临时数据
      temp: {
        equName: "",
        group: "",
      },
      // 对话框 标题
      dialogTitleMap: {
        update: "编辑设备",
        info: "设备详情",
      },
      // 对话框 属性验证规则
      rules: {
        equName: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: "change",
          },
        ],
      },
      // 对话框 显示控制标志
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 对话框 相关其他数据
      dialogStatus: "",
      activeTab: "first",
      updateDataIndex: 0,
      /*--------------------------------------------*/
      // 表格 相关其他数据
      total: 0,
      tableKey: 0,
      listLoading: true,
    };
  },
  // created 生命周期
  created() {
    // this.getList()
  },
  methods: {
    // 获得数据
    getList() {
      this.listLoading = true;
      fetchList(this.queryList).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;

        // 模拟请求的时间
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    // 按钮 重置
    handleReset() {
      this.queryList = {
        page: 1,
        limit: 20,
        equName: "",
        agency: "",
        group: "",
        macAddress: "",
        resolution: "",
        equStatus: "全部",
        systemStatus: "全部",
        plan: "",
        snCode: "",
      };
    },
    // 按钮 查询
    handleFilter() {
      this.queryList.page = 1;
      // this.getList()
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
    handleCancel() {
      this.$router.push("/program/noticeList");
    },
    handleBefore() {
      this.$router.push("/program/noticeList/new");
    },
    handleFinish() {
      this.$router.push("/program/noticeList");
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/public-styles.scss";
</style>
