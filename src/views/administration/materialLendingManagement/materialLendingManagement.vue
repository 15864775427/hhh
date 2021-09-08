<template>
  <div class="alone" id="alone">
    <el-tabs v-model="activeName">
      <!-- 资料管理 -->
      <el-tab-pane label="资料管理" name="first">
        <div class="operation">
          <el-form :model="dataManagement" :inline="true">
            <el-form-item label="资料名称">
              <el-select @change="dataManagementChanges" v-model="dataManagement.materialName" placeholder="请选择">
                <el-option label="区域一" value="区域一"></el-option>
                <el-option label="区域二" value="区域二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资料类型">
              <el-select @change="dataManagementChanges" v-model="dataManagement.materialType" placeholder="请选择">
                <el-option label="区域一" value="区域一"></el-option>
                <el-option label="区域二" value="区域二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资料发布部门">
              <el-select @change="dataManagementChanges" v-model="dataManagement.materialReleasedept" placeholder="请选择">
                <el-option label="区域一" value="区域一"></el-option>
                <el-option label="区域二" value="区域二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资料发布时间">
              <el-date-picker @change="dataManagementChanges" v-model="dataManagement.materialReleasetime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="资料保密级别">
              <el-select @change="dataManagementChanges" v-model="dataManagement.materialLevel" placeholder="请选择">
                <el-option label="区域一" value="区域一"></el-option>
                <el-option label="区域二" value="区域二"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          
          <el-button type="primary" @click="addDocumentManagement">添加</el-button>
        </div>
        <div class="tablebox">
          <el-table
            :data="table.data"
            :height="table.height"
            v-if="table.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column prop="materialName" label="资料名称" align="left">
            </el-table-column>
            <el-table-column prop="materialType" label="资料类型" align="left">
            </el-table-column>
            <el-table-column prop="materialIntroduce" label="资料介绍" align="left">
            </el-table-column>
            <el-table-column prop="materialNum" label="资料总数量" align="left">
            </el-table-column>
            <el-table-column prop="materialLentnum" label="资料借出数量" align="left">
            </el-table-column>
            <el-table-column prop="remainingSum" label="资料剩余数量" align="left">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="editEnterIndex(scope.row)">编辑</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deleteEnterIndex(scope.row)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="table.pageInfo.total"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 资料借阅管理 -->
      <el-tab-pane label="资料借阅管理" name="second">
        <div class="operation">
          <el-form :model="dataOfBorrowing" :inline="true">
            <el-form-item label="资料名称">
              <el-select @change="informationLendingEnquiry" clearable v-model="dataOfBorrowing.materialName" placeholder="请选择">
                <el-option label="区域一" value="区域一"></el-option>
                <el-option label="区域二" value="区域二"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资料类型">
              <el-select @change="informationLendingEnquiry" clearable v-model="dataOfBorrowing.materialType" placeholder="请选择">
                <el-option label="B" value="B"></el-option>
                <el-option label="C" value="C"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资料借阅部门">
              <el-date-picker @change="informationLendingEnquiry" clearable v-model="value1" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="资料借阅人">
              <el-select @change="informationLendingEnquiry" clearable v-model="dataOfBorrowing.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="addLibraryInformation">添加</el-button>
        </div>
        <div class="tablebox" id="tablebox">
          <!-- <el-table
            :data="material.data"
            :height="material.height"
            v-if="material.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column prop="materialName" label="资料名称" align="left"> </el-table-column>
            <el-table-column prop="name" label="资料类型" align="left"> </el-table-column>
            <el-table-column prop="address" label="资料介绍" align="left">
            </el-table-column>
            <el-table-column prop="address" label="资料总数量" align="left">
            </el-table-column>
            <el-table-column prop="address" label="资料借出数量" align="left">
            </el-table-column>
            <el-table-column prop="address" label="资料剩余数量" align="left">
            </el-table-column>
            <el-table-column prop="address" label="资料归还时间" align="left">
            </el-table-column>
            <el-table-column prop="address" label="借阅剩余时间" align="left">
            </el-table-column>
            <el-table-column prop="address" label="资料借阅部门" align="left">
            </el-table-column>
            <el-table-column prop="address" label="资料借阅人" align="left">
            </el-table-column>
            <el-table-column prop="address" label="借阅时间" align="left">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="editEnterValue(scope.row)">编辑</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deleteEnterValue(scope.row)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table> -->
          <el-table
            :data="material.data"
            :height="material.height"
            v-if="material.height"
            :header-cell-style="{ background: '#F7F8FA' }"
            row-key="id"
            :tree-props="{children: 'materialApplyList', hasChildren: 'hasChildren'}">
            <!-- <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>-->
            <el-table-column prop="materialName" label="资料名称" align="left"> </el-table-column>
            <el-table-column prop="materialType" label="资料类型" align="left"> </el-table-column>
            <el-table-column prop="address" label="资料介绍" align="left">
            </el-table-column>
            <el-table-column prop="materialIntroduce" label="资料总数量" align="left">
            </el-table-column>
            <el-table-column prop="materialLentnum" label="资料借出数量" align="left">
            </el-table-column>
            <el-table-column prop="remainingSum" label="资料剩余数量" align="left">
            </el-table-column>
            <el-table-column prop="informationId" label="资料归还时间" align="left">
            </el-table-column>
            <el-table-column prop="materialBorrowinglentime" label="借阅剩余时间" align="left">
            </el-table-column>
            <el-table-column prop="materialDept" label="资料借阅部门" align="left">
            </el-table-column>
            <el-table-column prop="borrowerName" label="资料借阅人" align="left">
            </el-table-column>
            <el-table-column prop="borrowerTime" label="借阅时间" align="left">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="editEnterValue(scope.row)">编辑</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deleteEnterValue(scope.row)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table> 
          <el-pagination
            @size-change="borrowingSizeChange"
            @current-change="borrowingCurrentChange"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="material.pageInfo.total"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 资料借阅统计 -->
      <el-tab-pane label="资料借阅统计" name="three"> </el-tab-pane>
    </el-tabs>
    <!-- 资料管理新增与编辑信息 -->
    <el-dialog :title="dialog.title" :visible.sync="dialogFormVisible">
      <el-form :model="addDataManagement">
        <el-form-item label="资料名称" :label-width="formLabelWidth">
          <el-select v-model="addDataManagement.materialName" placeholder="请选择">
            <el-option label="区域一" value="区域一"></el-option>
            <el-option label="区域二" value="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资料类型" :label-width="formLabelWidth">
          <el-select v-model="addDataManagement.materialType" placeholder="请选择">
            <el-option label="区域一" value="区域一"></el-option>
            <el-option label="区域二" value="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资料介绍" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="addDataManagement.materialIntroduce"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="资料数量" :label-width="formLabelWidth">
          <el-input
            v-model="addDataManagement.materialNum"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="资料发布部门" :label-width="formLabelWidth">
          <el-select v-model="addDataManagement.materialReleasedept" placeholder="请选择">
            <el-option label="区域一" value="区域一"></el-option>
            <el-option label="区域二" value="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资料发布时间" :label-width="formLabelWidth">
          <el-date-picker v-model="addDataManagement.materialReleasetime" type="datetime" :value-format="'yyyy-MM-dd HH:mm:ss'"  placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="资料保密级别" :label-width="formLabelWidth">
          <el-select v-model="addDataManagement.materialLevel" placeholder="请选择">
            <el-option label="区域一" value="区域一"></el-option>
            <el-option label="区域二" value="区域二"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataManagementDetermination">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 资料借阅管理新增 -->
    <el-dialog :title="dialog.title" :visible.sync="dialogFormTargeted">
      <el-form :model="materialLendingAdded">
        <el-form-item label="资料名称" :label-width="formLabelWidth">
          <el-select v-model="materialLendingAdded.materialName" placeholder="请选择">
            <el-option label="区域一" value="区域一"></el-option>
            <el-option label="区域二" value="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资料类型" :label-width="formLabelWidth">
          <el-select v-model="materialLendingAdded.materialType" placeholder="请选择">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资料介绍" :label-width="formLabelWidth">
          <el-input v-model="materialLendingAdded.materialIntroduce " show-word-limit placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="资料借出数量" :label-width="formLabelWidth">
          <el-input
            v-model="materialLendingAdded.materialLentnum"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="资料借阅时长" :label-width="formLabelWidth">
          <el-date-picker v-model="materialLendingAdded.borrowerTime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="资料借阅部门" :label-width="formLabelWidth">
          <el-select v-model="materialLendingAdded.materialDept" placeholder="请选择">
            <el-option label="部门一" value="部门一"></el-option>
            <el-option label="部门二" value="部门二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资料借阅人" :label-width="formLabelWidth">
          <el-input
            v-model="materialLendingAdded.borrowerName"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="借阅时间" :label-width="formLabelWidth">
          <el-date-picker v-model="materialLendingAdded.materialBorrowingtime" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormTargeted = false">取 消</el-button>
        <el-button type="primary" @click="materialBorrowingConfirmed">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, httpDelete, postDownload, httpGet } from "@/http";
export default {
  name: "materialLendingManagement",
  components: {},
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      //会议管理 修改 新增
      dialog: {
        visible: false,
        title: "",
      },
      value: "",
      value1: "",
      sreachForm: {},
      dataManagement:{
        materialName:null,
        materialType:null,
        materialReleasedept:null,
        materialLevel:null,
        materialReleasetime:null
      },
      addDataManagement:{
        materialName:"",
        materialType:"",
        materialReleasedept:"",
        materialLevel:"",
        materialReleasetime:"",
        materialNum:0,
        materialIntroduce:""
      },
      //资料借阅添加
      materialLendingAdded:{
        materialName:'',
        materialType:'',
        materialIntroduce:"",
        materialLentnum:"",
        borrowerTime:"",
        materialDept:"",
        borrowerName:"",
        materialBorrowingtime:""
      },
      //资料借阅
      dataOfBorrowing:{
        materialName:'',
        materialType:''
      },
      //资料借阅
      // libraryInformation:{
      //   materialName:null,
      //   materialType:null
      // },
      activeName: "second",
      table: {
        height: "",
        data: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
      },
      material: {
        height: "",
        data: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
      },
      dialogFormVisible: false,
      dialogFormTargeted: false,
      dialogVisible: false,
      form: {},
      formLabelWidth: "120px",
    };
  },
  created() {
    
  },
  mounted() {
    let divDom = document.getElementById("alone");
    this.table.height = divDom.offsetHeight - 250;
    this.material.height = divDom.offsetHeight - 250;
    this.renderTable();
    this.dataManagementChanges()
    this.materialsLendingManagement()
  },
  methods: {
    //会议管理编辑
    editEnterIndex(row) {
      if (row.id) {
      this.dialogFormVisible = true;
      this.dialog.title = "编辑信息";
      httpGet(`material/materialInfor/queryById/${row.id}`).then(
        (res) => {
          console.log(res);
          const { code, result, message } = res;
          if (code == "1000000000") {
            this.addDataManagement = { ...result };
          }
        }
      );
      }
    },
    //资料管理添加
    addDocumentManagement(){
      this.dialog.title = "添加信息";
      this.addDataManagement = {}
      this.dialogFormVisible = true
      
    },
    //资料借阅添加
    addLibraryInformation(){
      this.materialLendingAdded = {}
      this.dialog.title = "添加信息";
      this.dialogFormTargeted = true
    },
    //资料管理确定
    dataManagementDetermination(){
      if (this.addDataManagement.id) {
        httpPost(
          `/material/materialInfor/updateInfo`,
          this.addDataManagement
        ).then((res) => {
          if (res.code === "1000000000") {
            // this.dialog.visible = false;
            // this.renderTable()
            this.$message({
              type: "success",
              message: "修改成功",
            });
            
          } else {
            this.$message.error(res.message);
          }
        });
        this.renderTable()
      }
      if (!this.addDataManagement.id) {
        httpPost(
          `/material/materialInfor/addInfo`,
          this.addDataManagement
        ).then((res) => {
          if (res.code === "1000000000") {
            // this.dialog.visible = false;
            // this.renderTable()
            this.$message({
              type: "success",
              message: "添加成功",
            });
            console.log(res);
          } else {
            this.$message.error(res.message);
          }
        });
        
      }
      this.dialogFormVisible = false
      
    },
    //资料借阅确定 新增与编辑
    materialBorrowingConfirmed(){
      if (this.materialLendingAdded.id) {
        httpPost(
          `/material/materialInfor/updateInfo`,
          this.materialLendingAdded
        ).then((res) => {
          if (res.code === "1000000000") {
            // this.dialog.visible = false;
            this.materialsLendingManagement()
            this.$message({
              type: "success",
              message: "修改成功",
            });
            
          } else {
            this.$message.error(res.message);
          }
        });
      }
      if (!this.materialLendingAdded.id) {
        console.log('新增前的数据',this.materialLendingAdded);
        httpPost(
          `/material/materialInfor/addMaterialBorrowing`,
          this.materialLendingAdded
        ).then((res) => {
          if (res.code === "1000000000") {
            // this.dialog.visible = false;
            this.materialsLendingManagement()
            this.$message({
              type: "success",
              message: "添加成功",
            });
            console.log(res);
          } else {
            this.$message.error(res.message);
          }
        });
        
      }
      this.dialogFormTargeted = false
    },
    //资料管理查询
    dataManagementChanges(){
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(
        `/material/materialInfor/queryFu/${pageNum}/${pageSize}`,
        this.dataManagement
      ).then((res) => {
        // console.log(this.sreachForm);
        this.table.pageInfo.total = res.pageInfo.total;
        this.table.data = res.result;
        // console.log(res);
        // console.log(this.dataManagement);
      });
    },
    //删除资料管理
    deleteEnterIndex(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpDelete(
            `/material/materialInfor/deleteMaterialBorrowing/${row.id}`
          ).then((res) => {
            if (res.code === "1000000000") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.renderTable()
              this.sreachForm = {};
            } else {
              this.$message.error("删除失败");
            }
          });
          
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
        
    },
    //资料借阅编辑
    editEnterValue(row) {
      console.log(row);
      
      if (row.id) {
      this.dialog.title = "编辑信息";
      httpGet(`material/materialInfor/queryById/${row.id}`).then(
        (res) => {
          console.log(res);
          const { code, result, message } = res;
          if (code == "1000000000") {
            this.materialLendingAdded = { ...result };
          }
        }
      );
      }
      this.dialogFormTargeted = true;
    },
    //资料借阅删除
    deleteEnterValue(row) {
      console.log('资料借阅删除',row);
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpDelete(
            `/material/materialInfor/deleteBorInfo/${row.id}`
          ).then((res) => {
            if (res.code === "1000000000") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.materialsLendingManagement();
            } else {
              this.$message.error("删除失败");
            }
          });
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    detailsSpaceValue(row) {
      console.log(row);
      this.dialogVisible = true;
    },
    //资料借阅查询
    informationLendingEnquiry(){
      const { pageNum, pageSize } = this.material.pageInfo;
        httpPost(`/material/materialInfor/queryAll/${pageNum}/${pageSize}`,this.dataOfBorrowing).then((res) => {
          this.material.pageInfo.total = res.pageInfo.total;
          this.material.data = res.result;
          console.log(res);
        });
      // if (this.dataOfBorrowing.materialName != '' || this.dataOfBorrowing.materialType != '') {
      //   const { pageNum, pageSize } = this.material.pageInfo;
      //   httpPost(`/material/materialInfor/queryAll/${pageNum}/${pageSize}`,this.dataOfBorrowing).then((res) => {
      //     this.material.pageInfo.total = res.pageInfo.total;
      //     this.material.data = res.result;
      //     console.log(res);
      //   });
      //   }
    },
    //资料管理渲染表格
    renderTable() {
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(`/material/materialInfor/queryFu/${pageNum}/${pageSize}`).then((res) => {
        this.table.pageInfo.total = res.pageInfo.total;
        this.table.data = res.result;
        // console.log(res);
        // console.log(this.addDataManagement.materialReleasetime);
      });
    },
    //资料借阅管理 渲染
    materialsLendingManagement(){
      const { pageNum, pageSize } = this.material.pageInfo;
      httpPost(`/material/materialInfor/queryAll/${pageNum}/${pageSize}`).then((res) => {
        this.material.pageInfo.total = res.pageInfo.total;
        this.material.data = res.result;
        console.log(res);
      });
    },
    /**
     * 资料管理切换每页条数
     */
    handleSizeChange(val) {
      this.table.pageInfo.pageSize = val;
      this.renderTable();
    },
    handleCurrentChange(val) {
      this.table.pageInfo.pageNum = val;
      this.renderTable();
    },
     /**
     * 资料借阅切换每页条数
     */
    borrowingSizeChange(val) {
      this.material.pageInfo.pageSize = val;
      this.materialsLendingManagement();
    },
    borrowingCurrentChange(val) {
      this.material.pageInfo.pageNum = val;
      this.materialsLendingManagement();
    },
  },
};
</script>

<style lang="less" scoped>
.operation {
  margin-bottom: 5px;
}
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
#pane-first {
  width: 100%;
  height: 100%;
}

.el-pagination {
  float: right;
  margin-top: 5px;
}
.el_form {
  display: flex;
}
.dialong_dv {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  label {
    width: 120px;
    display: block;
    text-align: right;
  }
  span {
    width: 60%;
    display: block;
  }
  .dialog_span {
    width: 32%;
  }
}
</style>
