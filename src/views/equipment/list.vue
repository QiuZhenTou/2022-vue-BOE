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
      <!-- 第二行 -->
      <el-row type="flex" justify="space-around">
        <!-- 输入框 MAC地址 -->
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">MAC地址:</div>
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="queryList.macAddress"
              placeholder="请输入MAC地址"
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
        <!-- 输入框 分辨率 -->
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">分辨率:</div>
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="queryList.resolution"
              placeholder="请输入分辨率"
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
        <!-- 下拉框 设备状态 -->
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">设备状态:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.equStatus"
              style="width: 240px"
              class="filter-item"
              @change="handleFilter"
            >
              <el-option
                v-for="item in equStatusList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row type="flex" justify="space-around">
        <!-- 下拉框 系统版本 -->
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">系统版本:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.systemStatus"
              style="width: 240px"
              class="filter-item"
              @change="handleFilter"
            >
              <el-option
                v-for="item in systemStatusList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-col>
        <!-- 下拉框 当前计划 -->
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">当前计划:</div>
          </el-col>
          <el-col :span="18">
            <el-select
              v-model="queryList.plan"
              placeholder="请选择当前计划"
              clearable
              style="width: 240px"
              class="filter-item"
            >
              <el-option
                v-for="item in planList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="6">
            <div style="line-height: 40px">SN:</div>
          </el-col>
          <!-- 输入框 SN -->
          <el-col :span="18">
            <el-input
              v-model="queryList.snCode"
              placeholder="请输入SN号"
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
      </el-row>
      <!-- 第四行 -->
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

    <!-- 功能栏 -->
    <div class="function-button-container">
      <el-row type="flex" justify="end">
        <el-col :span="14">
          <div class="new-group">
            <!-- 按钮 批量导入 -->
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              icon="el-icon-document-copy"
              @click="handleBatchImport"
            >
              批量导入
            </el-button>
            <!-- 按钮 模板下载 -->
            <el-button
              v-waves
              class="filter-item"
              icon="el-icon-download"
              @click="handleDownloadTemplate"
            >
              模板下载
            </el-button>
            <!-- 按钮 批量删除 -->
            <el-button
              v-waves
              class="filter-item"
              icon="el-icon-delete"
              @click="handleBatchDelete"
            >
              批量删除
            </el-button>
            <!-- 按钮 批量控制 -->
            <el-button
              v-waves
              class="filter-item"
              icon="el-icon-connection"
              @click="handleBatchControl"
            >
              批量控制
            </el-button>
            <!-- 按钮 数据导出 -->
            <el-button
              v-waves
              class="filter-item"
              icon="el-icon-upload2"
              @click="handleDownloadData"
            >
              数据导出
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
      <!-- 复选框 -->
      <el-table-column type="selection" width="25px" />
      <!-- 设备名称 -->
      <el-table-column
        label="设备名称"
        prop="id"
        align="center"
        width="120px"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.equName }}</span>
        </template>
      </el-table-column>
      <!-- 所属机构 -->
      <el-table-column label="所属机构" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.agency }}</span>
        </template>
      </el-table-column>
      <!-- 所属分组 -->
      <el-table-column label="所属分组" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.group }}</span>
        </template>
      </el-table-column>
      <!-- MAC地址 -->
      <el-table-column label="MAC地址" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.macAddress }}</span>
        </template>
      </el-table-column>
      <!-- 分辨率 -->
      <el-table-column label="分辨率" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.resolution }}</span>
        </template>
      </el-table-column>
      <!-- 设备状态 -->
      <el-table-column label="设备状态" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.equStatus }}</span>
        </template>
      </el-table-column>
      <!-- 系统升级 -->
      <el-table-column label="系统升级" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.systemStatus }}</span>
        </template>
      </el-table-column>
      <!-- 当前计划 -->
      <el-table-column label="当前计划" width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.plan }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="350px" align="center">
        <template slot-scope="{ row, $index }">
          <!-- 详情 -->
          <el-button type="info" size="mini" @click="handleMoreInfo(row)">
            详情
          </el-button>
          <!-- 控制 -->
          <el-button
            type="primary"
            size="mini"
            @click="handleControl()"
            disabled
          >
            控制
          </el-button>
          <!-- 刷新 -->
          <el-button type="success" size="mini" @click="handleRefresh()">
            刷新
          </el-button>
          <!-- 编辑 -->
          <el-button
            type="warning"
            size="mini"
            @click="handleUpdate(row, $index)"
          >
            编辑
          </el-button>
          <!-- 删除 -->
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

    <!-- 对话框 编辑 编辑设备 -->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 300px; margin-left: 50px"
      >
        <!-- 设备名称 -->
        <el-form-item label="设备名称" prop="equName">
          <el-input
            v-model="temp.equName"
            placeholder="请输入设备名称"
          /> </el-form-item
        >
        <!-- 所属分组 -->
        <el-form-item label="所属分组" prop="group">
          <el-select
            v-model="temp.group"
            class="filter-item"
            placeholder="请选择所属分组"
          >
            <el-option
              v-for="item in groupList"
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

    <!-- 对话框 详情 设备详情 -->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogTableVisible"
      width="50%"
    >
      <template>
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
          <!-- 设备信息 -->
          <el-tab-pane label="设备信息" name="first">
            <!-- 第一行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="8"> 设备型号: </el-col>
                <el-col :span="16"> HiDPTAndroid Hi3751V553 </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="8"> 系统版本: </el-col>
                <el-col :span="16"> BOE_iGallery32_V13103_V5.2.0 </el-col>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="8"> 有线MAC地址: </el-col>
                <el-col :span="16"> A0BB3ED3861D </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="8"> 无线MAC地址: </el-col>
                <el-col :span="16"> A0BB3ED2F376 </el-col>
              </el-col>
            </el-row>
            <!-- 第三行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="8"> SN: </el-col>
                <el-col :span="16"> T232BS200721000123 </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="8"> 激活时间: </el-col>
                <el-col :span="16"> 2022-06-23 10:40:12 </el-col>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 安装信息 -->
          <el-tab-pane label="安装信息" name="second">
            <!-- 第一行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="6"> 设备名称: </el-col>
                <el-col :span="18"> test </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="6"> 注册时间: </el-col>
                <el-col :span="18"> 2022-06-27 14:31:14 </el-col>
              </el-col>
            </el-row>
            <!-- 第二行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="6"> 所属分组: </el-col>
                <el-col :span="18"> -- </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="6"> 分辨率: </el-col>
                <el-col :span="18"> 1920*1080 </el-col>
              </el-col>
            </el-row>
            <!-- 第三行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="6"> 所属机构: </el-col>
                <el-col :span="18"> 机构1 </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="6"> 屏显方式: </el-col>
                <el-col :span="18"> 横屏 </el-col>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 状态信息 -->
          <el-tab-pane label="状态信息" name="third">
            <!-- 第一行 -->
            <el-row>
              <el-col :span="12">
                <el-col :span="6"> 设备状态: </el-col>
                <el-col :span="18"> 离线 </el-col>
              </el-col>
              <el-col :span="12">
                <el-col :span="6"> 当前计划: </el-col>
                <el-col :span="18"> -- </el-col>
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
  name: "ComplexTable",
  components: {
    Pagination,
  },
  directives: { waves },
  data() {
    return {
      // 表格 显示的数据
      dataList: [
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
    // 按钮 详情
    handleMoreInfo(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "info";
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 按钮 控制
    handleControl() {},
    // 按钮 刷新
    handleRefresh() {},
    // 按钮 编辑
    handleUpdate(row, index) {
      this.updateDataIndex = index;
      this.temp = Object.assign({}, row); // copy obj
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
      this.dataList.splice(index, 1);
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
