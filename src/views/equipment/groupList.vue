<template>
  <div class="view-container">
    <!-- 筛选栏 -->
    <div class="filter-container">
      <!-- 第一行 -->
      <el-row type="flex" justify="space-between">
        <!-- 输入框 分组名称 -->
        <el-col :span="10">
          <el-col :span="6">
            <div style="line-height: 40px">分组名称:</div>
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="queryList.groupName"
              placeholder="请输入分组名称"
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
        <!-- 下拉框 所属机构 -->
        <el-col :span="10">
          <el-col :span="6">
            <div style="line-height: 40px">所属机构:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.agency"
              placeholder="请选择所属机构"
              clearable
              style="width: 250px"
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
        <el-col :span="4">
          <!-- 按钮 新建分组 -->
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleCreate"
          >
            新建分组
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
      <el-table-column label="操作" width="250px" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="info" size="mini" @click="handleMoreInfo(row)">
            详情
          </el-button>
          <el-button type="warning" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(row, $index)"
          >
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
              v-for="item in agencyList"
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
          {{ temp.equName }}
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
          groupID: "1",
          groupName: "分组1",
          agency: "机构1",
          equNum: "1",
          describe: "没有描述",
          equName: "设备1",
        },
      ],
      /*--------------------------------------------*/
      // 下拉框 选项
      agencyList: ["机构1", "机构2", "机构3"],
      equNameList: ["设备1", "设备2", "设备3"],
      // 筛选栏 绑定的数据
      queryList: {
        page: 1,
        limit: 20,
        groupName: "",
        agency: "",
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
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
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
    handleDelete(row, index) {
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
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
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
