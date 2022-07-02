<template>
  <div class="view-container">
    <!-- 筛选栏 -->
    <div class="filter-container">
      <!-- 第一行 -->
      <el-row type="flex" justify="space-between">
        <!-- 下拉框 公告状态 -->
        <el-col :span="10">
          <el-col :span="6">
            <div style="line-height: 40px">公告状态:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.noticeStatus"
              placeholder="请选择公告状态"
              clearable
              style="width: 250px"
              class="filter-item"
            >
              <el-option
                v-for="item in noticeStatusList"
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

    <!-- 功能栏 -->
    <div class="function-button-container">
      <el-row type="flex" justify="end">
        <el-col :span="7">
          <!-- 按钮 批量删除 -->
          <el-button
            v-waves
            disabled
            class="filter-item"
            type="primary"
            icon="el-icon-delete"
            @click="handleCreate"
          >
            批量删除
          </el-button>
          <!-- 按钮 创建公告 -->
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-edit-outline"
            @click="handleCreate"
          >
            创建公告
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
      <el-table-column type="selection" width="25px" />
      <el-table-column label="公告内容" width="200px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.noticeText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播放时间" width="200px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.playTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公告状态" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.noticeStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="info" size="mini" @click="handleMoreInfo(row)">
            详情
          </el-button>
          <el-button
            type="warning"
            size="mini"
            @click="handleUpdate(row, $index)"
          >
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete($index)">
            删除
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

    <!-- 对话框 新建/编辑分组 -->
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
        <el-form-item label="分组名称:" prop="groupName">
          <el-input v-model="temp.groupName" placeholder="请输入分组名称" />
        </el-form-item>
        <el-form-item label="所属机构:" prop="agency">
          <el-select
            v-model="temp.agency"
            class="filter-item"
            placeholder="请选择所属机构"
          >
            <el-option
              v-for="item in noticeStatusList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述:" prop="describe">
          <el-input v-model="temp.describe" placeholder="描述最多200字" />
        </el-form-item>
        <el-form-item label="设备选择:" prop="equName">
          <el-select
            multiple
            v-model="temp.equName"
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

    <!-- 对话框 详情 分组详情 -->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogTableVisible"
    >
      <el-form
        ref="dataTable"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="分组名称:">
          {{ temp.groupName }}
        </el-form-item>
        <el-form-item label="所属机构:">
          {{ temp.agency }}
        </el-form-item>
        <el-form-item label="描述:">
          {{ temp.describe }}
        </el-form-item>
        <el-form-item label="设备选择:">
          <li v-for="item in temp.equName" :key="item">{{ item }}</li>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false"> 返回 </el-button>
      </div>
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
      // 表格 显示的数据
      dataList: [
        {
          noticeStatus: "发布中",
          noticeText: "test",
          playTime: "2022-07-01 11:24:19",
          author: "qqr",
          createdTime: "2022-07-01 14:17:19",
        },
        {
          noticeStatus: "发布中",
          noticeText: "test",
          playTime: "2022-07-01 11:24:19",
          author: "qqr",
          createdTime: "2022-07-01 14:17:19",
        },
        {
          noticeStatus: "发布中",
          noticeText: "test",
          playTime: "2022-07-01 11:24:19",
          author: "qqr",
          createdTime: "2022-07-01 14:17:19",
        },
      ],
      /*--------------------------------------------*/
      // 下拉框 选项
      noticeStatusList: [
        "全部",
        "待发布",
        "发布中",
        "播放中",
        "部分成功",
        "发布失败",
        "已失败",
      ],
      equNameList: ["设备1", "设备2", "设备3"],
      // 筛选栏 绑定的数据
      queryList: {
        page: 1,
        limit: 20,
        noticeStatus: "全部",
      },
      // 对话框 绑定的临时数据
      temp: {
        groupName: "12",
        agency: "1",
        describe: "2",
        equName: "3",
      },
      // 对话框 标题
      dialogTitleMap: {
        update: "编辑分组",
        create: "新建分组",
        info: "分组详情",
      },
      // 对话框 属性验证规则
      rules: {
        groupName: [
          {
            required: true,
            message: "请输入分组名称",
            trigger: "change",
          },
        ],
        agency: [
          {
            required: true,
            message: "请选择所属机构",
            trigger: "change",
          },
        ],
        equName: [
          {
            required: true,
            message: "请选择设备",
            trigger: "change",
          },
        ],
      },
      // 对话框 显示控制标志
      dialogFormVisible: false,
      dialogTableVisible: false,
      // 对话框 相关其他数据
      dialogStatus: "",
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
        noticeStatus: "",
      };
    },
    // 按钮 查询
    handleFilter() {
      this.queryList.page = 1;
      // this.getList()
    },
    // 按钮 新建分组
    handleCreate() {
      this.$router.push("/program/noticeList/new");
    },
    resetTemp() {
      this.temp = {
        groupName: "",
        agency: "",
        describe: "",
        equName: "",
      };
    },
    // 按钮 详情
    handleMoreInfo(row) {
      this.dialogStatus = "info";
      this.dialogTableVisible = true;
      this.temp = Object.assign({}, row);
    },
    // 按钮 编辑
    handleUpdate(row, index) {
      this.updateDataIndex = index;
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
        title: "删除成功",
        message: "已删除数据",
        type: "success",
        duration: 2000,
      });
      this.dataList.splice(index, 1);
    },
    // 对话框 按钮 保存
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.groupID = this.getMaxGroupID(this.dataList);
          this.temp.equNum = this.temp.equName.length;
          this.dataList.unshift(this.temp); // 在表头添加数据
          this.dialogFormVisible = false;
          this.$notify({
            title: "Success",
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
          this.dataList.splice(this.updateDataIndex, 1, this.temp);
          this.dialogFormVisible = false;
          this.$notify({
            title: "修改成功",
            message: "数据修改成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    },
    getMaxGroupID(dataList) {
      var max = 0;
      for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].groupID > max) max = dataList[i].groupID;
      }
      return max + 1;
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
