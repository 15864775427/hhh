<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="产业类型">
          <el-select
            v-model="sreachForm.industryClass"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
            <el-option
              v-for="(item, index) in industryType"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入驻形式">
          <el-select
            v-model="sreachForm.projectType"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
            <el-option
              v-for="(item, index) in settledType"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="搜索企业名称"
            clearable
            v-model="sreachForm.firmName"
            @clear="initTable()"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              @click="initTable()"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="addEnterprise">添加</el-button>
      <el-button type="primary" @click="exportEnterprise">全部导出</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
        :header-cell-style="{ background: '#F7F8FA' }"
      >
        <el-table-column prop="firmName" label="企业名称" align="center">
        </el-table-column>
        <el-table-column prop="legalPerson" label="企业法人" align="center">
        </el-table-column>
        <el-table-column
          prop="legalPersonPhone"
          label="联系方式"
          align="center"
        >
        </el-table-column>
        <el-table-column label="产业类型" align="center">
          <template slot-scope="scope">
            <span>{{ getSettledTypeName(scope.row.industryClass) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入驻形式" align="center">
          <template slot-scope="scope">
            <span>{{ getIndustryTypeName(scope.row.projectType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productSchedule" label="当前进度" align="center">
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-link type="primary" @click="editEnterprise(scope.row)"
              >编辑</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="deleteEnterprise(scope.row)"
              >删除</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="detailsEnterprise(scope.row)"
              >详情</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="admissionApplication(scope.row)"
              >入园申请</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="table.total"
        @current-change="currentChangeHandle"
      >
      </el-pagination>
    </div>
    <!-- 添加 and 编辑 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="1700px"
      top="50px"
      @close="dialogClose"
    >
      <el-form
        label-width="100px"
        :model="EnterpriseForm"
        :rules="rules"
        :inline="true"
        ref="EnterpriseFormRef"
      >
        <div>
          <el-form-item label="租赁地址" prop="address">
            <el-input
              v-model="EnterpriseForm.address"
              placeholder="租赁地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业联系人" prop="contactPerson">
            <el-input
              v-model="EnterpriseForm.contactPerson"
              placeholder="企业联系人"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="企业联系人身份证号"
            prop="contactPersonIdentityNumber"
          >
            <el-input
              v-model="EnterpriseForm.contactPersonIdentityNumber"
              placeholder="企业联系人身份证号"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="企业联系人手机号" prop="contactPersonPhone">
            <el-input
              v-model="EnterpriseForm.contactPersonPhone"
              placeholder="企业联系人手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="社会统一信用代码" prop="creditCode">
            <el-input
              v-model="EnterpriseForm.creditCode"
              placeholder="社会统一信用代码"
            ></el-input>
          </el-form-item>
          <el-form-item label="租赁结束时间" prop="endTime">
            <el-date-picker
              v-model="EnterpriseForm.endTime"
              type="date"
              placeholder="租赁结束时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="融资情况" prop="financingSituation">
            <el-input
              v-model="EnterpriseForm.financingSituation"
              placeholder="融资情况"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="firmName">
            <el-input
              v-model="EnterpriseForm.firmName"
              placeholder="企业名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="年税收(万元)" prop="inTax">
            <el-input
              v-model="EnterpriseForm.inTax"
              placeholder="年税收(万元)"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="上下游企业" prop="industryChain">
            <el-input
              v-model="EnterpriseForm.industryChain"
              placeholder="上下游企业"
            ></el-input>
          </el-form-item>
          <el-form-item label="产业类型" prop="industryClass">
            <el-select
              v-model="EnterpriseForm.industryClass"
              placeholder="产业类型"
            >
              <el-option
                v-for="(item, index) in industryType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入园时间" prop="intime">
            <el-date-picker
              v-model="EnterpriseForm.intime"
              type="date"
              placeholder="入园时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="是否已投产" prop="intoProductionCode">
            <el-select
              v-model="EnterpriseForm.intoProductionCode"
              placeholder="是否已投产"
            >
              <el-option
                v-for="(item, index) in whetherProduction"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计投产时间" prop="intoProductionDate">
            <el-date-picker
              v-model="EnterpriseForm.intoProductionDate"
              type="date"
              placeholder="预计投产时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="企业法人" prop="legalPerson">
            <el-input
              v-model="EnterpriseForm.legalPerson"
              placeholder="企业法人"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="法人身份证号" prop="legalPersonIdentityNumber">
            <el-input
              v-model="EnterpriseForm.legalPersonIdentityNumber"
              placeholder="法人身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="法人联系方式" prop="legalPersonPhone">
            <el-input
              v-model="EnterpriseForm.legalPersonPhone"
              placeholder="法人联系方式"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目简介" prop="projectBrief">
            <el-input
              v-model="EnterpriseForm.projectBrief"
              placeholder="项目简介"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="入驻形式" prop="projectType">
            <el-select
              v-model="EnterpriseForm.projectType"
              placeholder="入驻形式"
            >
              <el-option
                v-for="(item, index) in settledType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业类型" prop="registType">
            <el-select
              v-model="EnterpriseForm.registType"
              placeholder="企业类型"
            >
              <el-option
                v-for="(item, index) in enterpriseType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册资金(万元)" prop="registeredFund">
            <el-input
              v-model="EnterpriseForm.registeredFund"
              placeholder="注册资金(万元)"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="EnterpriseForm.remark"
              placeholder="备注"
            ></el-input>
          </el-form-item>
          <el-form-item label="租赁面积" prop="rentalArea">
            <el-input
              v-model="EnterpriseForm.rentalArea"
              placeholder="租赁面积"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业与高校院所开展学研情况" prop="research">
            <el-input
              v-model="EnterpriseForm.research"
              placeholder="企业与高校院所开展学研情况"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="入孵状态" prop="settleInIncubatorStatus">
            <el-input
              v-model="EnterpriseForm.settleInIncubatorStatus"
              placeholder="入孵状态"
            ></el-input>
          </el-form-item>
          <el-form-item label="租赁开始时间" prop="startTime">
            <el-date-picker
              v-model="EnterpriseForm.startTime"
              type="date"
              placeholder="租赁开始时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="企业科技人员数" prop="technicianForce">
            <el-input
              v-model="EnterpriseForm.technicianForce"
              placeholder="企业科技人员数"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="企业职工总数" prop="workForce">
            <el-input
              v-model="EnterpriseForm.workForce"
              placeholder="企业职工总数"
            ></el-input>
          </el-form-item>
          <el-form-item label="年企业总收入（万元）" prop="yearGeneralIncome">
            <el-input
              v-model="EnterpriseForm.yearGeneralIncome"
              placeholder="年企业总收入（万元）"
            ></el-input>
          </el-form-item>
          <el-form-item label="年销售收入（万元）" prop="yearGrossSales">
            <el-input
              v-model="EnterpriseForm.yearGrossSales"
              placeholder="年销售收入（万元）"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item
            style="width:100%"
            label="企业参与指定国家、行业标准情况"
            prop="participation"
          >
            <el-input
              type="textarea"
              :rows="2"
              v-model="EnterpriseForm.participation"
              placeholder="企业参与指定国家、行业标准情况"
            ></el-input>
          </el-form-item>
          <el-form-item label="投资额(万元)" prop="investmentVolume">
            <el-input
              v-model="EnterpriseForm.investmentVolume"
              placeholder="投资额(万元)"
            ></el-input>
          </el-form-item>
        </div>
        <div
          class="listBox"
          v-for="(item, index) in EnterpriseForm.enterSubList"
          :key="index"
        >
          <el-form-item label="主要产品名称" prop="productName">
            <el-input
              v-model="item.productName"
              placeholder="主要产品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品所属领域" prop="productField">
            <el-input
              v-model="item.productField"
              placeholder="产品所属领域"
            ></el-input>
          </el-form-item>
          <el-form-item label="主要产品进度" prop="productSchedule">
            <el-select
              v-model="item.productSchedule"
              placeholder="主要产品进度"
            >
              <el-option
                v-for="(item, index) in productProgress"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品技术水平" prop="technicalLevel">
            <el-input
              v-model="item.technicalLevel"
              placeholder="产品技术水平"
            ></el-input>
          </el-form-item>
          <i
            class="el-icon-remove-outline"
            @click="removeEnterSubListItem"
            v-show="EnterpriseForm.enterSubList.length - 1 === index"
          ></i>
          <i
            class="el-icon-circle-plus-outline"
            @click="addEnterSubListItem"
            v-show="EnterpriseForm.enterSubList.length - 1 === index"
          ></i>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="addEnterpriseDetermine"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      title="详情"
      :visible.sync="detailsDialog"
      width="1600px"
      top="50px"
      @close="dialogClose"
    >
      <el-descriptions>
        <el-descriptions-item
          v-for="(item, index) in EnterpriseFormDetails.list"
          :key="index"
          :label="item.label"
          >{{ item.value }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions
        :column="4"
        v-for="(item, index) in EnterpriseFormDetails.enterSubList"
        :key="index"
      >
        <el-descriptions-item label="主要产品名称">{{
          item.productName
        }}</el-descriptions-item>
        <el-descriptions-item label="产品所属领域">{{
          item.productField
        }}</el-descriptions-item>
        <el-descriptions-item label="主要产品进度">{{
          item.productSchedule
        }}</el-descriptions-item>
        <el-descriptions-item label="产品技术水平">{{
          item.technicalLevel
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet, postDownload } from "@/http";
import getLabel from "./label";
import check from "./check";
export default {
  name: "TargetEnterprise",
  data() {
    return {
      //字典 start
      settledType: [], // 入驻类型
      industryType: [], // 产业类型
      productProgress: [], // 产品进度
      whetherProduction: [], // 是否投产
      enterpriseType: [], // 企业类型
      // end
      sreachForm: {},
      table: {
        data: [],
        height: "",
        total: 0,
        loading: false,
        currentPage: 1
      },
      dialog: {
        visible: false,
        title: ""
      },
      EnterpriseForm: {
        address: "",
        contactPerson: "",
        contactPersonIdentityNumber: "",
        contactPersonPhone: "",
        creditCode: "",
        endTime: "",
        enterSubList: [
          {
            productField: "", // 领域
            productName: "", // 名称
            productSchedule: "", // 进度
            technicalLevel: "" // 技术
          }
        ],
        financingSituation: "",
        firmName: "",
        inTax: "",
        industryChain: "",
        industryClass: "",
        intime: "",
        intoProductionCode: "",
        intoProductionDate: "",
        legalPerson: "",
        legalPersonIdentityNumber: "",
        legalPersonPhone: "",
        participation: "",
        productName: "",
        productSchedule: "",
        projectBrief: "",
        projectType: "",
        registType: "",
        registeredFund: "",
        remark: "",
        rentalArea: "",
        research: "",
        settleInIncubatorStatus: "",
        startTime: "",
        technicianForce: "",
        workForce: "",
        yearGeneralIncome: "",
        yearGrossSales: "",
        investmentVolume: ""
      },
      EnterpriseFormDetails: {
        list: [],
        enterSubList: []
      },
      editId: "",
      rules: check,
      detailsDialog: false // 详情模态框
    };
  },
  created() {
    /**
     * 初始化字典
     */
    // 入驻类型
    this.$store.dispatch("getSettledType").then(() => {
      this.settledType = this.$store.state.settledType;
    });
    // 产业类型
    this.$store.dispatch("getIndustryType").then(() => {
      this.industryType = this.$store.state.industryType;
    });
    // 产品进度
    this.$store.dispatch("getProductProgress").then(() => {
      this.productProgress = this.$store.state.productProgress;
    });
    // 是否投产
    this.$store.dispatch("getWhetherProduction").then(() => {
      this.whetherProduction = this.$store.state.whetherProduction;
    });
    // 企业类型
    this.$store.dispatch("getEnterpriseType").then(() => {
      this.enterpriseType = this.$store.state.enterpriseType;
    });
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
    this.$nextTick(_ => {
      this.initTable();
    });
  },
  methods: {
    /**
     * 初始化表格
     */
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      this.tableLoading = true;
      httpPost(
        `/enterprise/Enterprise/queryAll/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        this.table.total = res.pageInfo.total;
        this.table.data = res.result;
        this.table.loading = false;
      });
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    /**
     * 新增子集合
     */
    addEnterSubListItem() {
      this.EnterpriseForm.enterSubList.push({
        productField: "", // 领域
        productName: "", // 名称
        productSchedule: "", // 进度
        technicalLevel: "" // 技术
      });
    },
    /**
     * 删除子集合
     */
    removeEnterSubListItem() {
      if (this.EnterpriseForm.enterSubList.length > 1) {
        this.EnterpriseForm.enterSubList.pop();
      } else {
        this.$message.error("最少填写一行");
      }
    },
    /**
     * 添加
     */
    addEnterprise() {
      this.dialog.title = "添加信息";
      this.dialog.visible = true;
    },
    /**
     * 添加确定 and 编辑确定
     */
    addEnterpriseDetermine() {
      if (this.editId) {
        this.$refs.EnterpriseFormRef.validate(valid => {
          this.EnterpriseForm.id = this.editId;
          if (valid) {
            httpPost(
              `/enterprise/Enterprise/updateInfo`,
              this.EnterpriseForm
            ).then(res => {
              if (res.code === "1000000000") {
                this.dialog.visible = false;
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              } else {
                this.$message.error(res.message);
              }
            });
          }
        });
      } else {
        this.$refs.EnterpriseFormRef.validate(valid => {
          if (valid) {
            httpPost(
              "/enterprise/Enterprise/addInfo",
              this.EnterpriseForm
            ).then(res => {
              if (res.code === "1000000000") {
                this.dialog.visible = false;
                this.initTable(this.table.currentPage);
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
              } else {
                this.$message.error(res.message);
              }
            });
          }
        });
      }
    },
    /**
     * 删除
     */
    deleteEnterprise(data) {
      this.$confirm("此操作将永久删除企业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDelete(`/enterprise/Enterprise/deleteById/${data.id}`).then(
            res => {
              if (res.code === "1000000000") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.initTable(this.currentPage);
              } else {
                this.$message.error("删除失败");
              }
            }
          );
        })
        .catch(() => {});
    },
    /**
     * 编辑
     */
    editEnterprise(data) {
      this.dialog.title = "编辑参数";
      httpGet(`/enterprise/Enterprise/queryById/${data.id}`).then(res => {
        const { code, result, message } = res;
        if (code === "1000000000") {
          for (let key in this.EnterpriseForm) {
            this.EnterpriseForm[key] = result[key];
          }
          if (!this.EnterpriseForm.enterSubList) {
            this.EnterpriseForm.enterSubList = [
              {
                productField: "", // 领域
                productName: "", // 名称
                productSchedule: "", // 进度
                technicalLevel: "" // 技术
              }
            ];
          }

          this.editId = data.id;
          this.dialog.visible = true;
        } else {
          this.$message.error(message);
        }
      });
    },
    /**
     * 入园申请
     */
    admissionApplication(row) {},
    detailsEnterprise(row) {
      httpGet(`/enterprise/Enterprise/queryById/${row.id}`).then(res => {
        const { code, result, message } = res;
        if (code === "1000000000") {
          for (let key in this.EnterpriseForm) {
            if (getLabel(key)) {
              this.EnterpriseFormDetails.list.push({
                value: result[key],
                label: getLabel(key)
              });
            }
          }
          this.EnterpriseFormDetails.enterSubList = result.enterSubList;
          this.detailsDialog = true;
        } else {
          this.$message.error(message);
        }
      });
    },
    /**
     * 关闭模态框回调
     */
    dialogClose() {
      //重置表单
      if (this.$refs.EnterpriseFormRef) {
        this.$refs.EnterpriseFormRef.resetFields();
      }
      this.EnterpriseFormDetails = { list: [], enterSubList: [] };
      // 重置编辑id
      this.editId = 0;
    },
    exportEnterprise() {
      postDownload("/enterprise/excel/downExcelFile", this.sreachForm).then(
        res => {
          let flieName = decodeURIComponent(
            res.headers["content-disposition"]
              .split(";")[1]
              .split("filename=")[1]
          );
          const blob = new Blob([res.data]);
          const objecturl = window.URL.createObjectURL(blob);
          const creEleA = document.createElement("a");
          creEleA.setAttribute("href", objecturl);
          creEleA.setAttribute("download", flieName);
          creEleA.click();
        }
      );
    },
    /**
     * 获取入驻类型字典值
     */
    getSettledTypeName(val) {
      for (let i = 0; i < this.settledType.length; i++) {
        if (val === this.settledType[i].value) {
          return this.settledType[i].name;
        }
      }
    },
    /**
     * 获取产业类型字典值
     */
    getIndustryTypeName(val) {
      for (let i = 0; i < this.industryType.length; i++) {
        if (val === this.industryType[i].value) {
          return this.industryType[i].name;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-button {
  height: 40px;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}
.listBox {
  display: flex;
  align-items: center;
  height: 70px;
}
.listBox .el-form-item {
  margin: 0;
}
.listBox i {
  margin-left: 10px;
  cursor: pointer;
}
</style>
