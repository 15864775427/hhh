<template>
  <div>
    <!-- <el-form :model="sreachForm" :inline="true"> -->
    <!-- <el-form-item>
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input1">
        </el-input>
      </el-form-item> -->
    <!-- <el-form-item label="会议室名称">
        <el-select v-model="sreachForm.conferenceroomName" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议室地址">
        <el-select v-model="sreachForm.conferenceroomAddress" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议召开时间">
        <el-date-picker
          v-model="sreachForm.meetingTime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="会议开始时间">
        <el-date-picker
          v-model="sreachForm.meetingStartTime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="会议结束时间">
        <el-date-picker
          v-model="sreachForm.meetingEndTime"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预约部门">
        <el-select v-model="sreachForm.appointmentsDepartment" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
    <!-- </el-form> -->
    <div class="demo-app">
      <ul @click="conferenceRoomSelection">
        <li class="ReservationSearch">
          <el-input
            placeholder="搜索会议室"
            suffix-icon="el-icon-search"
            v-model="input1"
          >
          </el-input>
        </li>
        <li :class="[isActive == 1 ? 'active' : '']" data-name="1号会议室">
          <span data-name="1号会议室">1号会议室</span>
          <p data-name="1号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 2 ? 'active' : '']" data-name="2号会议室">
          <span data-name="2号会议室">2号会议室</span>
          <p data-name="2号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 3 ? 'active' : '']" data-name="3号会议室">
          <span data-name="3号会议室">3号会议室</span>
          <p data-name="3号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 4 ? 'active' : '']" data-name="4号会议室">
          <span data-name="4号会议室">4号会议室</span>
          <p data-name="4号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 5 ? 'active' : '']" data-name="5号会议室">
          <span data-name="5号会议室">5号会议室</span>
          <p data-name="5号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 6 ? 'active' : '']" data-name="6号会议室">
          <span data-name="6号会议室">6号会议室</span>
          <p data-name="6号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 7 ? 'active' : '']" data-name="7号会议室">
          <span data-name="7号会议室">7号会议室</span>
          <p data-name="7号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 8 ? 'active' : '']" data-name="8号会议室">
          <span data-name="8号会议室">8号会议室</span>
          <p data-name="8号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 9 ? 'active' : '']" data-name="9号会议室">
          <span data-name="9号会议室">9号会议室</span>
          <p data-name="9号会议室">50人 | 45㎡ | 5层503</p>
        </li>
        <li :class="[isActive == 10 ? 'active' : '']" data-name="10号会议室">
          <span data-name="10号会议室">10号会议室</span>
          <p data-name="10号会议室">50人 | 45㎡ | 5层503</p>
        </li>
      </ul>
      <div class="demo-app-main">
        <FullCalendar
          ref="fullCalendar"
          class="demo-app-calendar"
          :options="calendarOptions"
        >
        </FullCalendar>
      </div>
    </div>
    <!-- 会议预约新增 -->
    <el-dialog title="会议室预约新增" :visible.sync="dialogFormTargeted">
      <el-form :model="queryCondition">
        <!-- <el-form-item label="会议室名称" :label-width="formLabelWidth">
          <el-select
            v-model="AddconferenceRoomReservation.conferenceroomName"
            placeholder="请选择"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议室地址" :label-width="formLabelWidth">
          <el-select
            v-model="AddconferenceRoomReservation.conferenceroomAddress"
            placeholder="请选择"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="会议主题" :label-width="formLabelWidth">
          <el-input
            v-model="queryCondition.meetingTheme"
            show-word-limit
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="appointmentTime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="参会人数" :label-width="formLabelWidth">
          <el-input
            v-model="queryCondition.meetingNumPeople"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="会议召开时间" :label-width="formLabelWidth">
          <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="会议开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="AddconferenceRoomReservation.meetingTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="会议结束时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="AddconferenceRoomReservation.meetingEndTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约人" :label-width="formLabelWidth">
          <el-input
            v-model="AddconferenceRoomReservation.appointmentPerson"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="预约部门" :label-width="formLabelWidth">
          <el-select
            v-model="AddconferenceRoomReservation.appointmentsDepartment"
            placeholder="请选择"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="AddconferenceRoomReservation.appointmentsTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormTargeted = false">取 消</el-button>
        <el-button type="primary" @click="addMeetingReservation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, httpDelete, postDownload, httpGet } from "@/http";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      input1: "",
      viewTitle: "",
      table: {
        height: "",
        data: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
      },
      //会议室切换条件 并转换时间
      queryCondition: {
        appointmentPerson: null,
        appointmentsDepartment: null,
        appointmentsMeetingRoom: null,
        appointmentsTime: null,
        conferenceroomAddress: null,
        conferenceroomName: "1号会议室",
        createTime: null,
        creater: null,
        deleteStatus: null,
        endTime: null,
        meetingEndTime: null,
        meetingId: null,
        meetingName: null,
        meetingNumPeople: null,
        meetingStartTime: null,
        meetingTheme: null,
        meetingTime: null,
        spareField1: null,
        spareField2: null,
        spareField3: null,
        startTime: null,
        updateTime: null,
        updater: null,
      },
      //会议室切换
      meetingReservationConfirmed: {
        appointmentPerson: null,
        appointmentsDepartment: null,
        appointmentsMeetingRoom: null,
        appointmentsTime: null,
        conferenceroomAddress: null,
        conferenceroomName: "1号会议室",
        createTime: null,
        creater: null,
        deleteStatus: null,
        endTime: null,
        meetingEndTime: null,
        meetingId: null,
        meetingName: null,
        meetingNumPeople: null,
        meetingStartTime: null,
        meetingTheme: null,
        meetingTime: null,
        spareField1: null,
        spareField2: null,
        spareField3: null,
        startTime: null,
        updateTime: null,
        updater: null,
      },
      conferenceRoom: "1号会议室",
      //获取会议时间
      appointmentTime:[],
      isActive: 1,
      sreachForm: {
        appointmentsDepartment: null,
        conferenceroomAddress: null,
        meetingTime: null,
        meetingStartTime: null,
        meetingEndTime: null,
        appointmentsDepartment: null,
      },
      AddconferenceRoomReservation: {
        conferenceroomName: null,
        conferenceroomAddress: null,
        meetingTheme: null,
        meetingNumPeople: null,
        meetingTime: null,
        meetingEndTime: null,
        appointmentPerson: null,
        appointmentsDepartment: null,
        appointmentsTime: null,
      },
      value1: "",
      dialogFormTargeted: false,
      form: {},
      formLabelWidth: "120px",
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek",
        },
        locale: "zh-cn", // 切换语言，当前为中文
        initialView: "timeGridWeek",
        allDaySlot: false, // 周，日视图时，all-day 不显示
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        events: [
        ],
        editable: false,
        eventLimit: true, // 设置月日程，与all-day slot的最大显示数量，超过的通过弹窗显示
        slotLabelFormat: {
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false, // 设置时间为24小时
        },
        slotMinTime: "1:00", //展示时间
        slotMaxTime: "19:00", //展示时间
        selectable: true,
        // selectConstraint:[
        //     ],
        selectMirror: true,
        dayMaxEvents: true,
        weekends: false,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        // datesRender:this.handleDatesRender ,
        slotEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  mounted() {
    this.RenderDiagram();
    //获取时间
    // this.handleDatesRender()
  },
  methods: {
    //渲染图形表格 查询条件
    RenderDiagram() {
      // this.table.data = []
      const { pageNum, pageSize } = this.table.pageInfo;
      // console.log('提交前的数据',this.queryCondition);
      httpPost(
        `meeting/AppointmentMeeting/selectAppointmentMeetingList/${pageNum}/${pageSize}`,
        this.meetingReservationConfirmed
      ).then((res) => {
        this.table.data = []
        this.calendarOptions.events = []
        console.log('赋值前的数据',this.table.data);
        this.table.data = res.result;
        console.log(this.meetingReservationConfirmed);
        console.log('请求到的数据',res.result);
        console.log('转化前的数据',this.table.data);
        this.table.data.forEach((item) => {
          if (item.meetingStartTime != null || item.meetingEndTime != null) {
            let arrStartTime = item.meetingStartTime.split(" ");
            let strStartTime = `${arrStartTime[0]}T${arrStartTime[1]}`;
            item.meetingStartTime = strStartTime;
            let arrEndTime = item.meetingEndTime.split(" ");
            let strEndTime = `${arrEndTime[0]}T${arrEndTime[1]}`;
            item.meetingEndTime = strEndTime;
            this.calendarOptions.events.push({
              title: item.meetingTheme,
              start: item.meetingStartTime,
              end: item.meetingEndTime,
              id:item.id,
              backgroundColor: "#AFEEEE",
            });
          }
        });
        // // console.log(res);
        console.log('转化后的数据',this.table.data);
        // console.log(this.queryCondition.conferenceroomName);
      });
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    //预约新增 点击确定
    addMeetingReservation(){
      // this.queryCondition = {}
      // this.queryCondition.meetingTheme = null
      // this.queryCondition.meetingNumPeople = null
      this.dialogFormTargeted = false
      this.queryCondition.conferenceroomName = this.meetingReservationConfirmed.conferenceroomName
      console.log('确定前的数据',this.queryCondition);
      httpPost(
          `meeting/AppointmentMeeting/addAppointmentMeetingInfo`,
          this.queryCondition
        ).then((res) => {
          if (res.code === "1000000000") {
            // this.dialog.visible = false;
            this.RenderDiagram();
            this.$message({
              type: "success",
              message: "新建会议成功",
            });
          } else {
            this.$message.error(res.message);
          }
        });
        // console.log("添加的数据",this.queryCondition);
    },
    //下拉添加
    // handleDateSelect(selectInfo) {
    //   let title = prompt("请为您的会议输入一个新的标题");
    //   let calendarApi = selectInfo.view.calendar;

    //   calendarApi.unselect(); // clear date selection

    //   if (title) {
    //     calendarApi.addEvent({
    //       id: createEventId(),
    //       title,
    //       start: selectInfo.startStr,
    //       end: selectInfo.endStr,
    //       allDay: selectInfo.allDay,
    //     });
    //   }
    // },
    //时间转换
    time(date) {
			var y = date.getFullYear()
			var m = date.getMonth() + 1
			m = m < 10 ? '0' + m : m
			var d = date.getDate()
			d = d < 10 ? '0' + d : d
			var h = date.getHours()
			h = h < 10 ? '0' + h : h
			var minute = date.getMinutes()
			minute = minute < 10 ? '0' + minute : minute
			var second = date.getSeconds()
			second = second < 10 ? '0' + second : second
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
        },
    //点击添加会议时 新增
    handleDateSelect(selectInfo) {
      this.dialogFormTargeted = true;
      if (this.conferenceRoom == "1号会议室") {
        // console.log(this.conferenceRoom);
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(selectInfo);
        this.appointmentTime = []
        console.log(this.queryCondition);
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(this.appointmentTime[0])
          this.queryCondition.meetingEndTime = this.time(this.appointmentTime[1])
        }
        // this.RenderDiagram();
        // console.log(this.queryCondition);
        console.log('添加的时间',this.appointmentTime);
        console.log('确定前的数据',this.queryCondition);
      }
      if (this.conferenceRoom == "2号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "3号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "4号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "5号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "6号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "7号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "8号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "9号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
      if (this.conferenceRoom == "10号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        console.log(this.conferenceRoom);
        console.log(selectInfo);
        this.appointmentTime = []
        if (this.dialogFormTargeted = true) {
          this.appointmentTime.push(selectInfo.start)
          this.appointmentTime.push(selectInfo.end)
          this.queryCondition.meetingStartTime = this.time(selectInfo.start)
          this.queryCondition.meetingEndTime = this.time(selectInfo.end)
        }
        console.log(this.queryCondition);
        this.RenderDiagram();
      }
    },
    //会议室预约删除
    handleEventClick(clickInfo) {
      // if (confirm(`您确定要删除事件吗 '${clickInfo.event.title}'`)) {
        // clickInfo.event.remove();
        console.log(clickInfo);
        this.$confirm("此操作将永久删除该条会议记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpDelete(
            `/meeting/AppointmentMeeting/deleteAppointmentMeetingById/${clickInfo.event.id}`
          ).then((res) => {
            if (res.code === "1000000000") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.RenderDiagram()
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
      // }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },
    //会议室切换
    conferenceRoomSelection(e) {
      // console.log(e);
      if (e.target.dataset.name == "1号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 1;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "2号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 2;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "3号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 3;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "4号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 4;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "5号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 5;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "6号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 6;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "7号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 7;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "8号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 8;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "9号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 9;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
      if (e.target.dataset.name == "10号会议室") {
        this.queryCondition.meetingTheme = null
        this.queryCondition.meetingNumPeople = null
        this.conferenceRoom = e.target.dataset.name;
        this.isActive = 10;
        this.meetingReservationConfirmed.conferenceroomName = e.target.dataset.name;
        console.log(this.meetingReservationConfirmed.conferenceroomName);
        this.RenderDiagram();
      }
    },
    //获取初始时间
    // handleDatesRender(){
    //   let calendarApi = this.$refs.fullCalendar.getApi()
    //   this.viewTitle = calendarApi.view.title
    //   // let data = calendarApi.getView()
    //   // console.log(data);
    //   console.log(calendarApi.view.activeStart);
    //   console.log(calendarApi.view.activeEnd);
    //   console.log(calendarApi.view.title);
    //   if (this.viewTitle != calendarApi.view.title) {
    //     console.log(calendarApi.view.activeStart);
    //   console.log(calendarApi.view.activeEnd);
    //   }
    // }
    //时间格式转换
    timeFormatConversion() {
      this.table.data;
    },
  },
};
</script>

<style lang="less" scoped>
.demo-app h2 {
  margin: 0;
  font-size: 16px;
}

.demo-app ul {
  margin: 0;
  padding: 0 0 0 1em;
}

.demo-app li {
  margin: 1.5em 0;
  padding: 0;
}

.demo-app b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  width: 100%;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  margin-top: 0.2em;
  .ReservationSearch {
    border: none;
    margin-top: -11px;
  }
}
.demo-app-main {
  flex-grow: 1;
  // padding: 1em;
}
.demo-app {
  // display: flex;
  // flex-direction: column;
  // background-color: antiquewhite;
  ul {
    margin-right: 0.1em;
    li {
      border: 1px solid #ccc;
      width: 160px;
      height: 60px;
      margin: 0.5em 0;
      padding: 0.7em 0.6em;
      // text-align: center;
      // background: rgb(147, 174, 233);
      cursor: pointer;
      p {
        font-size: 8px;
        color: darkgray;
      }
      span {
        font-size: 18px;
        // color: rgb(158, 155, 155);
      }
    }
  }
}
.fc {
  /* the calendar root */
  width: 100%;
  height: 750px;
  /* margin: 0 auto; */
}
.demo-app ul .active {
  border: 1px solid rgb(14, 78, 196);
  font-weight: bold;
  color: #000;
}
// .demo-app-calendar{
  .fc-v-event {
    display: block;
    border: none;
    /* border: 1px solid #3788d8; */
    /* border: 1px solid var(--fc-event-border-color, #3788d8); */
    background-color: #3788d8;
    background-color: var(--fc-event-bg-color, #3788d8);
}
// }
</style>
