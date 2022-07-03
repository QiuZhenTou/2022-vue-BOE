<template>
  <div class="view-container">
    <!-- 筛选栏 -->
    <div class="filter-container">
      <!-- 第一行 -->
      <el-row :align="middle">
        <el-col :span="8">
          <!-- 输入框 账户名 -->
          <el-col :span="6">
            <div style="line-height: 40px">账户名:</div>
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="queryList.account"
              placeholder="请输入账户名"
              style="width: 200px"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
            <el-button class="my-icon-button" icon="el-icon-search" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <!-- 下拉框 所属机构 -->
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
        <el-col :span="8">
          <!-- 下拉框 状态 -->
          <el-col el-col :span="6">
            <div style="line-height: 40px">状态:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.accountStatus"
              placeholder="请选择状态"
              clearable
              style="width: 240px"
              class="filter-item"
            >
              <el-option
                v-for="item in queryAccountStatusList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row type="flex" class="row-bg" justify="end">
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

    <!-- 功能栏 -->
    <div class="function-button-container">
      <el-row type="flex" justify="end">
        <el-col :span="4">
          <div class="new-group">
            <!-- 新建分组按钮 -->
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              icon="el-icon-edit-outline"
              @click="handleCreate"
            >
              新建账户
            </el-button>
          </div>
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
      <!-- 账户名 -->
      <el-table-column label="账户名" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.accountName }}</span>
        </template>
      </el-table-column>
      <!-- 所属机构 -->
      <el-table-column label="所属机构" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.agency }}</span>
        </template>
      </el-table-column>
      <!-- 所属角色 -->
      <el-table-column label="所属角色" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.role }}</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.accountStatus }}</span>
        </template>
      </el-table-column>
      <!-- 真实姓名 -->
      <el-table-column label="真实姓名" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.userRealName }}</span>
        </template>
      </el-table-column>
      <!-- 手机号 -->
      <el-table-column label="手机号" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phoneNum }}</span>
        </template>
      </el-table-column>
      <!-- 邮箱 -->
      <el-table-column label="邮箱" width="180px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.emailAddr }}</span>
        </template>
      </el-table-column>
      <!-- 更新时间 -->
      <el-table-column label="更新时间" width="160px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row, $index }">
          <!-- 停用 -->
          <el-button
            type="danger"
            plain
            size="mini"
            @click="handleChangeStatus(row)"
          >
            停用
          </el-button>
          <!-- 编辑 -->
          <el-button type="warning" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <!-- 删除 -->
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

    <!-- 对话框 添加账户/编辑账户-->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="30%"
      top="10px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 300px; margin-left: 50px"
      >
        <!-- 账户名 -->
        <el-form-item label="账户名" prop="accountName">
          <el-input v-model="temp.accountName" placeholder="请输入账户名" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="temp.passWord" placeholder="请输入密码" />
        </el-form-item>
        <!-- 所属机构 -->
        <el-form-item label="所属机构" prop="agency">
          <el-select
            v-model="temp.agency"
            class="filter-item"
            placeholder="请选择所属机构"
          >
            <el-option
              v-for="item in groupList"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <!-- 所属角色 -->
        <el-form-item label="所属角色" prop="role">
          <el-select
            v-model="temp.role"
            class="filter-item"
            placeholder="请选择所属角色"
          >
            <el-option
              v-for="item in groupList"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <!-- 账户状态 -->
        <el-form-item label="账户状态" prop="accountStatus">
          <el-select
            v-model="temp.accountStatus"
            class="filter-item"
            placeholder="请选择账户状态"
          >
            <el-option
              v-for="item in accountStatusList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!-- 真实姓名 -->
        <el-form-item label="真实姓名" prop="userRealName">
          <el-input v-model="temp.userRealName" placeholder="请输入真实姓名" />
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="emailAddr">
          <el-input v-model="temp.emailAddr" placeholder="请输入邮箱" />
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="temp.phoneNum" placeholder="请输入手机号" />
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
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import InputSearch from '@/components/InputSearch'

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
          // 标记点
          accountName: "test",
          passWord: "123",
          agency: "机构1",
          role: "无",
          accountStatus: "启用",
          userRealName: "qqr",
          phoneNum: 61584220941,
          emailAddr: "61584220941@163.com",
          updateTime: "	2022-06-27 09:17:25",
        },
        {
          accountName: "tester",
          passWord: "123",
          agency: "机构2",
          role: "无",
          accountStatus: "启用",
          userRealName: "qqr",
          phoneNum: 61584220941,
          emailAddr: "61584220941@163.com",
          updateTime: "	2022-06-27 09:17:25",
        },
        {
          accountName: "test-man",
          passWord: "123",
          agency: "机构3",
          role: "无",
          accountStatus: "启用",
          userRealName: "qqr",
          phoneNum: 61584220941,
          emailAddr: "61584220941@163.com",
          updateTime: "	2022-06-27 09:17:25",
        },
      ],
      /*--------------------------------------------*/
      // 下拉框 选项
      agencyList: ["机构1", "机构2", "机构3"],
      queryAccountStatusList: ["所有", "启用", "停用"],
      accountStatusList: ["启用", "停用"],
      // 筛选栏 绑定的数据
      queryList: {
        page: 1,
        limit: 20,
        account: "",
        agency: "",
        accountStatus: "",
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
        update: "编辑账户",
        create: "添加账户",
      },
      // 对话框 属性验证规则
      rules: {
        accountName: [
          {
            required: true,
            message: "请输入账户名",
            trigger: "change",
          },
        ],
        passWord: [
          {
            required: true,
            message: "请输入分组名称",
            trigger: "change",
          },
        ],
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
        role: [
          {
            required: true,
            message: "请选择所属角色",
            trigger: "change",
          },
        ],
        accountStatus: [
          {
            required: true,
            message: "请选择账户状态",
            trigger: "change",
          },
        ],
        userRealName: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "change",
          },
        ],
        emailAddr: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "change",
          },
        ],
        phoneNum: [
          {
            required: true,
            message: "请输入手机号",
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
      // fetchList(this.queryList).then((response) => {
      //   this.list = response.data.items;
      //   this.total = response.data.total;

      //   // 模拟请求的时间
      //   setTimeout(() => {
      //     this.listLoading = false;
      //   }, 1.5 * 1000);
      // });
    },
    // 按钮 重置
    handleReset() {
      this.queryList = {
        page: 1,
        limit: 20,
        account: "",
        agency: "",
        accountStatus: "",
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
    handleChangeStatus(row) {},
    // 按钮 编辑
    handleUpdate(row, index) {
      this.updateDataIndex = index;
      this.temp = Object.assign({}, row); // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp);
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
.my-icon-button {
  padding: 12px 12px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
