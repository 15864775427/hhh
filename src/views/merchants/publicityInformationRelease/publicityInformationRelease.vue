<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="信息类型">
          <el-select
            v-model="sreachForm.informationType"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
            <el-option
              v-for="(item, index) in informationTypeList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布部门">
          <el-select
            v-model="sreachForm.publishingDepartment"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
            <el-option
              v-for="(item, index) in departmentList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="sreachForm.releaseTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:hh:mm"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="addNews">添加</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
        :header-cell-style="{ background: '#F7F8FA' }"
        :show-overflow-tooltip="true"
      >
        <el-table-column prop="title" label="信息标题" align="left">
        </el-table-column>
        <el-table-column prop="summary" label="摘要" align="left">
        </el-table-column>
        <el-table-column prop="releaseTime" label="发布时间" align="left">
        </el-table-column>
        <el-table-column
          prop="publishingDepartment"
          label="发布部门"
          align="left"
        >
        </el-table-column>
        <el-table-column prop="publisher" label="发布人" align="left">
        </el-table-column>
        <el-table-column prop="postStatus" label="信息发布状态" align="left">
          <template slot-scope="scope">
            <span>{{ getReleaseStatusName(scope.row.postStatus) }}</span>
            <el-popover
              v-if="scope.row.postStatus === '04'"
              placement="top-start"
              title="驳回理由"
              width="200"
              trigger="hover"
              :content="getRejectionReason(scope.row.rejectionReason)"
            >
              <el-tag type="danger" slot="reference" size="mini"
                >驳回理由</el-tag
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="300">
          <template slot-scope="scope">
            <el-link type="primary" @click="editNews(scope.row)">编辑</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="deleteNews(scope.row)">删除</el-link
            ><el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="detailsNews(scope.row)"
              >详情</el-link
            >
            <template v-if="scope.row.postStatus === '01'">
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="submitNews(scope.row)"
                >提交</el-link
              >
            </template>
            <template v-if="scope.row.postStatus === '02'">
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="withdrawNews(scope.row)"
                >撤回</el-link
              >
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="rejectNews(scope.row)"
                >驳回</el-link
              >
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="adoptNews(scope.row)"
                >通过</el-link
              >
            </template>
            <template v-if="scope.row.postStatus === '04'">
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="submitNews(scope.row)"
                >提交</el-link
              >
            </template>
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
      @close="dialogClose"
    >
      <el-form
        label-position="right"
        label-width="100px"
        width="100%"
        :model="newsForm"
        :rules="rules"
        ref="newsFormRef"
      >
        <el-form-item label="信息标题" prop="title">
          <el-input v-model="newsForm.title" placeholder="信息标题"></el-input>
        </el-form-item>
        <el-form-item label="信息内容" prop="content">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="信息内容"
            v-model="newsForm.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="信息摘要" prop="summary">
          <el-input
            v-model="newsForm.summary"
            placeholder="信息摘要"
          ></el-input>
        </el-form-item>
        <el-form-item label="信息类型" prop="informationType">
          <el-select v-model="newsForm.informationType">
            <el-option
              v-for="(item, index) in informationTypeList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布部门" prop="publishingDepartment">
          <el-select v-model="newsForm.publishingDepartment">
            <el-option
              v-for="(item, index) in departmentList"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="releaseTime">
          <el-date-picker
            v-model="sreachForm.releaseTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:hh:mm"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadFlie"
            :before-upload="beforeImageUpload"
            :file-list="flieList"
            :on-remove="removeFlie"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__text">单个文件不超过10M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="addNewsDetermine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      title="详情"
      :visible.sync="detailsDialog"
      width="900px"
      @close="dialogClose"
    >
      <div class="flexBox">
        <div class="flexChild average">
          <div class="detailsItem">
            <div class="detailsItemLabel">标题</div>
            <div class="detailsItemContent">{{ detailsForm.title }}</div>
          </div>
          <div class="detailsItem">
            <div class="detailsItemLabel">摘要</div>
            <div class="detailsItemContent">{{ detailsForm.summary }}</div>
          </div>
          <div class="detailsItem">
            <div class="detailsItemLabel">内容</div>
            <div class="detailsItemContent">{{ detailsForm.content }}</div>
          </div>
          <div class="detailsItem">
            <div class="detailsItemLabel">附件</div>
            <div class="detailsItemContent">
              <div
                v-for="(item, index) in detailsForm.investmentAnnexes"
                :key="index"
              >
                <el-link type="primary" @click="showImg"
                  >{{ item.annexName }}.{{ item.annexType }}</el-link
                >
              </div>
            </div>
          </div>
          <div class="detailsItemGroup">
            <div class="detailsItem">
              <div class="detailsItemLabel">发布人</div>
              <div class="detailsItemContent">{{ detailsForm.publisher }}</div>
            </div>
            <div class="detailsItem">
              <div class="detailsItemLabel">发布部门</div>
              <div class="detailsItemContent">
                {{ detailsForm.publishingDepartment }}
              </div>
            </div>
          </div>
          <div class="detailsItemGroup">
            <div class="detailsItem">
              <div class="detailsItemLabel">发布时间</div>
              <div class="detailsItemContent">
                {{ detailsForm.releaseTime }}
              </div>
            </div>
            <div class="detailsItem">
              <div class="detailsItemLabel">发布状态</div>
              <div class="detailsItemContent">
                {{ getReleaseStatusName(detailsForm.postStatus) }}
              </div>
            </div>
          </div>
        </div>
        <div class="flexChild" style="width:16  0px">
          <div class="detailsItem">
            <div class="detailsItemLabel">信息类型</div>
            <div class="detailsItemContent">
              {{ getInformationTypeList(detailsForm.informationType) }}
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 附件展示 -->
    <ds-modal
      :visible.sync="previewMedia"
      :list="detailsForm.investmentAnnexes"
    ></ds-modal>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet } from "@/http";
import dsModal from "@/components/ds-modal.vue";
import check from "./check";
export default {
  name: "publicityInformationRelease",
  data() {
    return {
      //字典 start
      informationTypeList: [], // 信息类型
      departmentList: [], // 部门集合
      releaseStatus: [], // 发布状态
      // end
      sreachForm: {
        informationType: "", // 类型
        publishingDepartment: "", // 部门
        releaseTime: "" // 时间
      },
      table: {
        data: [],
        height: 0,
        total: 0,
        loading: false,
        currentPage: 1
      },
      dialog: {
        visible: false,
        title: ""
      },
      newsForm: {
        title: "", // 信息标题
        content: "", // 信息内容
        summary: "", // 信息摘要
        informationType: "", // 信息类型
        publishingDepartment: "", // 发布部门
        releaseTime: "", // 发布时间
        investmentAnnexes: [] // 附件集合
      },
      detailsForm: {
        title: "", // 信息标题
        content: "", // 信息内容
        summary: "", // 信息摘要
        informationType: "", // 信息类型
        publishingDepartment: "", // 发布部门
        releaseTime: "", // 发布时间
        investmentAnnexes: [], // 附件集合
        publisher: "", // 发布人
        postStatus: "" // 发布状态
      },
      delectInvestmentAnnexes: [], //删除附件集合
      flieList: [],
      editId: 0,
      rules: check,
      detailsDialog: false,
      previewMedia: false
    };
  },
  components: {
    dsModal
  },
  created() {
    //初始化字典
    this.$store.dispatch("getInformationTypeList").then(() => {
      this.informationTypeList = this.$store.state.informationTypeList;
    });
    this.$store.dispatch("getDepartmentList").then(() => {
      this.departmentList = this.$store.state.departmentList;
    });
    this.$store.dispatch("getReleaseStatus").then(() => {
      this.releaseStatus = this.$store.state.releaseStatus;
      this.initTable();
    });
    console.log(this.$store.state.informationTypeList);
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
  },
  methods: {
    /***
     * 预览
     */
    showImg() {
      this.previewMedia = true;
    },
    /**
     * 初始化表格
     */
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      this.tableLoading = true;
      httpPost(
        `/dispersion/promotionalInfo/queryAll/${pageNum}/10`,
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
     * 添加
     */
    addNews() {
      this.dialog.title = "添加信息";
      this.dialog.visible = true;
      // console.log(this.informationTypeList,this.departmentList,this.releaseStatus )
    },
    /**
     * 添加确定 and 编辑确定
     */
    addNewsDetermine() {
      if (this.editId) {
        const { newsForm } = this;
        newsForm.id = this.editId;
        let flieList = this.flieList.filter(item => !item.id);
        let arr = flieList.map(item => {
          return {
            annexName: item.name,
            annexPath: item.path,
            annexType: item.type,
            boundBusinessType: "1"
          };
        });
        newsForm.investmentAnnexes = newsForm.investmentAnnexes.concat(arr);
        newsForm.delectInvestmentAnnexes = this.delectInvestmentAnnexes;

        this.$refs.newsFormRef.validate(valid => {
          if (valid) {
            httpPost(`/dispersion/promotionalInfo/updateInfo`, newsForm).then(
              res => {
                if (res.code === "1000000000") {
                  this.dialog.visible = false;
                  this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                  this.initTable(this.table.currentPage);
                } else {
                  this.$message.error(res.message);
                }
              }
            );
          }
        });
      } else {
        this.$refs.newsFormRef.validate(valid => {
          if (valid) {
            let arr = this.flieList.map(item => {
              return {
                annexName: item.name,
                annexPath: item.path,
                annexType: item.type,
                boundBusinessType: "1"
              };
            });
            this.newsForm.investmentAnnexes = arr;
            httpPost("/dispersion/promotionalInfo/addInfo", this.newsForm).then(
              res => {
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
              }
            );
          }
        });
      }
    },
    /**
     * 删除
     */
    deleteNews(data) {
      this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDelete(`/dispersion/promotionalInfo/deleteById/${data.id}`).then(
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
    editNews(data) {
      this.dialog.title = "编辑参数";
      httpGet(`/dispersion/promotionalInfo/queryById/${data.id}`).then(res => {
        const { result } = res;
        this.$refs.newsFormRef.resetFields();
        this.newsForm.title = result.title;
        this.newsForm.content = result.content;
        this.newsForm.summary = result.summary;
        this.newsForm.informationType = result.informationType;
        this.newsForm.publishingDepartment = result.publishingDepartment;
        this.newsForm.releaseTime = result.releaseTime;
        this.newsForm.investmentAnnexes = result.investmentAnnexes;
        this.flieList = result.investmentAnnexes.map(item => {
          return {
            name: item.annexName,
            path: item.annexPath,
            id: item.id
          };
        });
      });
      this.editId = data.id;
      this.dialog.visible = true;
    },
    /**
     * 详情
     */
    detailsNews(row) {
      httpGet(`/dispersion/promotionalInfo/queryById/${row.id}`).then(res => {
        const { result } = res;
        for (let key in this.detailsForm) {
          this.detailsForm[key] = result[key];
        }
        this.detailsDialog = true;
      });
    },
    /**
     * 提交
     */
    submitNews(row) {
      httpPost(
        `/dispersion/promotionalInfo/updatePostStatus/${row.id}/02`
      ).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("提交成功");
          this.initTable(this.currentPage);
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    /**
     * 撤回
     */
    withdrawNews(row) {
      httpPost(
        `/dispersion/promotionalInfo/updatePostStatus/${row.id}/01`
      ).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("撤回成功");
          this.initTable(this.currentPage);
        } else {
          this.$message.error("撤回失败");
        }
      });
    },
    /**
     * 通过
     */
    adoptNews(row) {
      httpPost(
        `/dispersion/promotionalInfo/updatePostStatus/${row.id}/03`
      ).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("审核成功");
          this.initTable(this.currentPage);
        } else {
          this.$message.error("审核失败");
        }
      });
    },
    /**
     * 驳回
     */
    rejectNews(row) {
      this.$prompt("请输入驳回理由", "审核", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          httpPost(
            `/dispersion/promotionalInfo/updatePostStatus/${row.id}/04/${value}`
          ).then(res => {
            if (res.code === "1000000000") {
              this.$message.success("审核成功");
              this.initTable(this.currentPage);
            } else {
              this.$message.error("审核失败");
            }
          });
        })
        .catch(() => {});
    },
    /**
     * 关闭模态框回调
     */
    dialogClose() {
      //重置表单
      if (this.$refs.newsFormRef) {
        this.$refs.newsFormRef.resetFields();
      }
      this.flieList = [];
      // 重置编辑id
      this.editId = 0;
    },
    /***
     * 上传预检
     */
    beforeImageUpload(file) {
      // var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      // const testStr = "jpgpngjpeg";
      // if (testStr.indexOf(testmsg) < 0) {
      //   this.$message.error("上传图片只能是jpg，jpeg 或 png 格式!");
      //   return false;
      // }
    },
    /**
     * 上传文件
     */
    uploadFlie(flie) {
      let params = new FormData();
      params.append("file", flie.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        res => {
          if (res.code == "1000000000") {
            let { filePath, filetype, fileName } = res.result;
            this.flieList.push({
              name: fileName,
              path: filePath,
              type: filetype
            });
            this.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**
     * 删除文件
     */
    removeFlie(flie, flieList) {
      const { investmentAnnexes } = this.newsForm;
      const newinvestmentAnnexes = investmentAnnexes.filter(
        item => item.id != flie.id
      );
      this.flieList = this.flieList.filter(item => {
        return item.path != flie.path;
      });
      for (let i = 0; i < investmentAnnexes.length; i++) {
        if (investmentAnnexes[i].id === flie.id) {
          this.delectInvestmentAnnexes.push(investmentAnnexes[i]);
        }
      }
      this.newsForm.investmentAnnexes = JSON.parse(
        JSON.stringify(newinvestmentAnnexes)
      );
    },
    /**
     * 获取发布状态字典值
     */
    getReleaseStatusName(val) {
      for (let i = 0; i < this.releaseStatus.length; i++) {
        if (val === this.releaseStatus[i].value) {
          return this.releaseStatus[i].name;
        }
      }
    },
    getInformationTypeList(val) {
      let informationTypeList = this.informationTypeList;
      for (let i = 0; i < informationTypeList.length; i++) {
        if (val === informationTypeList[i].value) {
          return informationTypeList[i].name;
        }
      }
    },
    /**
     *  封装驳回理由
     */
    getRejectionReason(val) {
      if (val) {
        return val;
      } else {
        return "无驳回理由";
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
.flexBox {
  display: flex;
  padding: 0 60px;
}
.average {
  flex: 1;
}
// .flexBox > div {
//   flex: 1;
// }
.detailsItem {
  display: flex;
  flex: 1;
}
.flexChild + .flexChild {
  margin-left: 60px;
}
.detailsItemLabel {
  margin-right: 10px;
  width: 60px;
  text-align: right;
}
.detailsItemContent {
  flex: 1;
}
.detailsItem + .detailsItem {
  margin-top: 20px;
}
.detailsItemGroup + .detailsItem {
  margin-top: 20px;
}
.detailsItem + .detailsItemGroup {
  margin-top: 20px;
}
.detailsItemGroup > .detailsItem {
  margin: 0;
}
.detailsItemGroup + .detailsItemGroup {
  margin-top: 10px;
}
.detailsItemGroup > .detailsItem + .detailsItem {
  margin-left: 72px;
}
.detailsItemGroup {
  display: flex;
  justify-content: space-between;
}
</style>
