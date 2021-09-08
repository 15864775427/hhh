<template>
  <div class="alone" id="alone">
    <el-tabs v-model="activeName">
      <!-- 会议室管理 -->
      <el-tab-pane label="会议室管理" name="first">
        <div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <!-- <el-form-item label="会议室名称">
              <el-select
                @change="getConferenceRoom"
                v-model="sreachForm.conferenceroomName"
                placeholder="请选择"
                clearable
              >
                <el-option label="会议室1" value="会议室1"></el-option>
                <el-option label="会议室2" value="会议室2"></el-option>
                <el-option label="会议室3" value="会议室3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会议室楼层">
              <el-select
                @change="getConferenceRoom"
                v-model="sreachForm.conferenceroomPosition"
                placeholder="请选择"
                clearable
              >
                <el-option label="一楼" value="一楼"></el-option>
                <el-option label="二楼" value="二楼"></el-option>
                <el-option label="三楼" value="三楼"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会议室地址">
              <el-select
                @change="getConferenceRoom"
                v-model="sreachForm.conferenceroomAddress"
                placeholder="请选择"
                clearable
              >
                <el-option label="一楼101" value="一楼101"></el-option>
                <el-option label="二楼202" value="二楼202"></el-option>
                <el-option label="三楼303" value="三楼303"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="会议室设施">
              <el-select
                @change="getConferenceRoom"
                v-model="sreachForm.conferenceroomFacilities"
                placeholder="请选择"
                clearable
              >
                <el-option label="投影仪" value="投影仪"></el-option>
                <el-option label="摄像头" value="摄像头"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="搜索会议室楼层/面积"
                suffix-icon="el-icon-search"
                v-model="input1"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="addConferenceFun">添加</el-button>
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="table.data"
            :height="table.height"
            v-if="table.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column prop="conferenceroomName" label="会议室名称" align="left">
            </el-table-column>
            <el-table-column
              prop="conferenceroomPosition"
              label="位置(楼层、房间)"
              align="left"
            >
            </el-table-column>
            <el-table-column prop="conferenceroomArea" label="面积(㎡)" align="left">
            </el-table-column>
            <!-- <el-table-column prop="meetingStartTime" label="会议室使用时间" align="left">
            </el-table-column> -->
            <!-- <el-table-column prop="appointmentPerson" label="会议室预约人" align="left">
            </el-table-column> -->
            <!-- <el-table-column
              prop="appointmentsDepartment"
              label="会议室预约部门"
              align="left"
            >
            </el-table-column> -->
            <el-table-column prop="conferenceroomCapacity" label="可容纳(人)" align="left">
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
      <!-- 会议室预约 -->
      <el-tab-pane label="会议室预约" name="second">
        <ConferenceRoomReservation />
      </el-tab-pane>
      <!-- 我的预约 -->
      <el-tab-pane label="我的预约" name="three">
          <div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="会议室">
              <el-select
                @change="getConferenceRoom"
                v-model="sreachForm.conferenceroomFacilities"
                placeholder="请选择"
                clearable
              >
                <el-option label="投影仪" value="投影仪"></el-option>
                <el-option label="摄像头" value="摄像头"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                @change="getConferenceRoom"
                v-model="sreachForm.conferenceroomFacilities"
                placeholder="请选择"
                clearable
              >
                <el-option label="投影仪" value="投影仪"></el-option>
                <el-option label="摄像头" value="摄像头"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="table.data"
            :height="table.height"
            v-if="table.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column prop="conferenceroomName" label="会议室名称" align="left">
            </el-table-column>
            <el-table-column prop="conferenceroomArea" label="会议室主题" align="left">
            </el-table-column>
            <el-table-column prop="conferenceroomCapacity" label="预约时间" align="left">
            </el-table-column>
            <el-table-column prop="conferenceroomCapacity" label="人数" align="left">
            </el-table-column>
            <el-table-column prop="conferenceroomCapacity" label="状态" align="left">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="editEnterIndex(scope.row)">取消预约</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deleteEnterIndex(scope.row)"
                  >会议详情</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="reservationSizeChange"
            @current-change="reservationCurrentChange"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="reservation.pageInfo.total"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <!-- 会议室使用统计 -->
      <el-tab-pane label="会议室使用统计" name="four"> </el-tab-pane>
    </el-tabs>
    <!-- 会议管理新增 -->
    <el-dialog :title="dialog.title" :visible.sync="dialogFormVisible">
      <el-form :model="MeetingAppointmentEditor">
        <!-- <el-form-item label="会议室名称" :label-width="formLabelWidth">
          <el-select
            v-model="MeetingAppointmentEditor.conferenceroomName"
            placeholder="请选择"
            clearable
          >
            <el-option label="会议室1" value="会议室1"></el-option>
            <el-option label="会议室2" value="会议室2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="会议室名称:" :label-width="formLabelWidth">
          <el-input
            v-model="MeetingAppointmentEditor.conferenceroomName"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="设施:" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="电视"></el-checkbox>
            <el-checkbox label="液晶电视"></el-checkbox>
            <el-checkbox label="投影仪"></el-checkbox>
            <el-checkbox label="黑板"></el-checkbox>
            <el-checkbox label="视频"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="可容纳人数:" :label-width="formLabelWidth">
          <el-input
            v-model="MeetingAppointmentEditor.conferenceroomCapacity"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="位置:" :label-width="formLabelWidth">
          <!-- <el-select
            v-model="MeetingAppointmentEditor.conferenceroomPosition"
            placeholder="请选择"
            clearable
          >
            <el-option label="一楼" value="一楼"></el-option>
            <el-option label="二楼" value="二楼"></el-option>
          </el-select> -->
          <el-input
            v-model="MeetingAppointmentEditor.conferenceroomPosition"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
          type="textarea"
            v-model="MeetingAppointmentEditor.conferenceroomArea"
            autocomplete="off"
            placeholder="请输入"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="会议室面积" :label-width="formLabelWidth">
          <el-input
            v-model="MeetingAppointmentEditor.conferenceroomArea"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="会议室设施" :label-width="formLabelWidth">
          <el-select
            v-model="MeetingAppointmentEditor.conferenceroomFacilities"
            placeholder="请选择"
            clearable
          >
            <el-option label="投影仪" value="投影仪"></el-option>
            <el-option label="摄像头" value="摄像头"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="可容纳人数" :label-width="formLabelWidth">
          <el-input
            v-model="MeetingAppointmentEditor.conferenceroomCapacity"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="meetingCancellation">取 消</el-button>
        <el-button type="primary" @click="MeetingInformationConfirmation"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 会议室预约新增 -->
    <el-dialog title="会议室预约新增信息" :visible.sync="dialogFormTargeted">
      <el-form :model="form">
        <el-form-item label="会议室名称" :label-width="formLabelWidth">
          <el-select v-model="sreachForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议室地址" :label-width="formLabelWidth">
          <el-select v-model="sreachForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议主题" :label-width="formLabelWidth">
          <el-input v-model="form.desc" show-word-limit placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="参会人数" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="会议召开时间" :label-width="formLabelWidth">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="会议开始时间" :label-width="formLabelWidth">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="会议结束时间" :label-width="formLabelWidth">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约人" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="预约部门" :label-width="formLabelWidth">
          <el-select v-model="sreachForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间" :label-width="formLabelWidth">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormTargeted = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormTargeted = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, httpDelete, postDownload, httpGet } from "@/http";
import ConferenceRoomReservation from "./conferenceRoomReservation.vue";
export default {
  name: "conferenceRoomManagement",
  components: {
    ConferenceRoomReservation,
  },
  data() {
    return {
      //设施多选
      checkList:[],
      input1:'',
      //会议信息编辑与新增
      MeetingAppointmentEditor: {
        conferenceroomName: "",
        conferenceroomPosition: "",
        conferenceroomArea: "",
        conferenceroomFacilities: [],
        conferenceroomCapacity: "",
        conferenceroomAddress: "",
      },
      //会议管理 修改 新增
      dialog: {
        visible: false,
        title: "",
      },
      room: "two",
      value1: "",
      value: "",
      sreachForm: {
        conferenceroomName: "",
        conferenceroomPosition: "",
        conferenceroomArea: "",
        conferenceroomFacilities: "",
        conferenceroomCapacity: "",
        conferenceroomAddress: "",
      },
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
      reservation: {
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
    this.renderTable();
    this.myReservation()
    this.ID()
  },
  mounted() {
    let divDom = document.getElementById("alone");
    this.table.height = divDom.offsetHeight - 250;
    this.reservation.height = divDom.offsetHeight - 250;
  },
  methods: {
    //获取会议室信息
    getConferenceRoom() {
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(
        `meeting/conferenceroom/selectConferenceroomList/${pageNum}/${pageSize}`,
        this.sreachForm
      ).then((res) => {
        console.log(this.sreachForm);
        this.table.pageInfo.total = res.pageInfo.total;
        this.table.data = res.result;
        console.log(res);
      });
    },
    //渲染表格
    renderTable() {
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(
        `meeting/conferenceroom/selectConferenceroomList/${pageNum}/${pageSize}`
      ).then((res) => {
        this.table.pageInfo.total = res.pageInfo.total;
        this.table.data = res.result;
        // console.log(res);
      });
    },
    /**
     * 切换每页条数
     */
    handleSizeChange(val) {
      // console.log(val);
      // this.table.pageInfo.pageSize = val;
      this.table.pageInfo.pageSize = val;
      this.renderTable();
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.table.pageInfo.pageNum = val;
      this.renderTable();
    },
    //会议管理编辑
    editEnterIndex(row) {
      this.dialog.title = "编辑信息";
      this.dialogFormVisible = true;
      httpGet(`meeting/conferenceroom/selectConferenceroomInfoById/${row.id}`).then(
        (res) => {
          console.log(res);
          const { code, result, message } = res;
          if (code == "1000000000") {
            this.MeetingAppointmentEditor = { ...result };
          }
        }
      );
    },
    //删除数据
    deleteEnterIndex(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpDelete(
            `meeting/conferenceroom/deleteConferenceroomInfoById/${row.id}`
          ).then((res) => {
            if (res.code === "1000000000") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.renderTable();
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
    //会议管理点击添加
    addConferenceFun() {
      this.MeetingAppointmentEditor = {};
      this.dialogFormVisible = true;
      this.dialog.title = "添加信息";
    },
    //确定后的操作
    MeetingInformationConfirmation() {
      if (this.MeetingAppointmentEditor.id) {
        httpPost(
          `meeting/conferenceroom/updateConferenceroomInfo`,
          this.MeetingAppointmentEditor
        ).then((res) => {
          if (res.code === "1000000000") {
            this.dialog.visible = false;
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            this.$message.error(res.message);
          }
        });
        this.dialogFormVisible = false;
      }

      if (!this.MeetingAppointmentEditor.id) {
        httpPost(
          `meeting/conferenceroom/addConferenceroomInfo`,
          this.MeetingAppointmentEditor
        ).then((res) => {
          if (res.code === "1000000000") {
            this.dialog.visible = false;
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.renderTable();
          } else {
            this.$message.error(res.message);
          }
        });
        this.dialogFormVisible = false;
      }
      this.renderTable();
    },
    //取消之后的操作
    meetingCancellation() {
      this.dialogFormVisible = false;
      this.renderTable();
    },
    //我   的   预   约
    //渲染列表
     myReservation(){
      const { pageNum, pageSize } = this.reservation.pageInfo;
      httpPost(
        `meeting/myAppointment/selectMyAppointmentList/${pageNum}/${pageSize}`
      ).then((res) => {
        // this.reservation.pageInfo.total = res.pageInfo.total;
        // this.reservation.data = res.result;
        console.log(res);
      });
     },
     /**
     * 切换每页条数
     */
    reservationSizeChange(val) {
      // console.log(val);
      // this.table.pageInfo.pageSize = val;
      this.reservation.pageInfo.pageSize = val;
      this.myReservation();
    },
    reservationCurrentChange(val) {
      // console.log(val);
      this.reservation.pageInfo.pageNum = val;
      this.myReservation();
    },
     //根据id查询
     ID(){
       httpGet(
        `meeting/myAppointment/selectMyAppointmentById/2`
      ).then((res) => {
        // this.reservation.pageInfo.total = res.pageInfo.total;
        // this.reservation.data = res.result;
        console.log(res);
      });
     }
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
<style>
.demo-app .fc-v-event{
      /* display: block; */
    /* border: 1px solid #3788d8;
    border: 1px solid var(--fc-event-border-color, #3788d8); */
    border: none;
    border-left: 2px solid green;
    background-color: #3788d8;
    background-color: var(--fc-event-bg-color, #3788d8);
}
</style>
