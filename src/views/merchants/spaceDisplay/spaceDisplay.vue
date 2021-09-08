<template>
  <div class="alone" ref="alone">
    <el-scrollbar ref="scroll">
      <div class="spaceDisplay">
        <div class="incubatorBox">
          <el-input placeholder="搜索指标名" clearable v-model="sreachForm.any">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="incubatorList">
            <div
              class="incubatorItem"
              v-bind:class="{ activeIncubator: item.id === activeIncubator }"
              v-for="item in incubatorData"
              :key="item.id"
              @click="switchIncubator(item.id)"
            >
              <div class="title">
                {{ item.incubatorName ? item.incubatorName : "无" }}
              </div>
              <span class="todetails">详情</span>
              <div class="infoList">
                <div class="infoItem">
                  <div class="label">占地总面积：</div>
                  <div class="content">
                    {{
                      item.incubatorLandArea ? item.incubatorLandArea : "0"
                    }}亩
                  </div>
                </div>
                <div class="infoItem">
                  <div class="label">总建筑面积：</div>
                  <div class="content">
                    {{
                      item.incubatorConstructionArea
                        ? item.incubatorConstructionArea
                        : "0"
                    }}㎡
                  </div>
                </div>
                <div class="infoItem">
                  <div class="label">可利用面积：</div>
                  <div class="content">
                    {{
                      item.incubatorUsableArea ? item.incubatorUsableArea : "0"
                    }}㎡
                  </div>
                </div>
                <div class="infoItem">
                  <div class="label">产权单位：</div>
                  <div class="content">
                    {{ item.titleCompanyName ? item.titleCompanyName : "无" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="incubatorMain" v-if="buildingData.length > 0">
          <div class="buildingBox">
            <div class="buildingList">
              <el-radio-group
                v-model="activeBuilding.id"
                size="small"
                @change="switchBuilding"
              >
                <el-radio-button
                  :label="item.id"
                  v-for="item in buildingData"
                  :key="item.id"
                  >{{ item.buildingName }}</el-radio-button
                >
              </el-radio-group>
            </div>
            <div class="buildingInfoList">
              <div class="buildingInfoItem">
                <div class="label">占地面积(亩)：</div>
                <div class="content">
                  {{
                    activeBuilding.buildingLandArea
                      ? activeBuilding.buildingLandArea
                      : 0
                  }}
                </div>
              </div>
              <div class="buildingInfoItem">
                <div class="label">总面积(㎡)：</div>
                <div class="content">
                  {{
                    activeBuilding.buildingConstructionArea
                      ? activeBuilding.buildingConstructionArea
                      : 0
                  }}
                </div>
              </div>
              <div class="buildingInfoItem">
                <div class="label">可利用面积(㎡)：</div>
                <div class="content">
                  {{
                    activeBuilding.buildingUsableArea
                      ? activeBuilding.buildingUsableArea
                      : 0
                  }}
                </div>
              </div>
              <div class="buildingInfoItem">
                <div class="label">已出让面积(㎡)：</div>
                <div class="content">
                  {{
                    activeBuilding.buildingAlreadySoldArea
                      ? activeBuilding.buildingAlreadySoldArea
                      : 0
                  }}
                </div>
              </div>
              <div class="buildingInfoItem">
                <div class="label">价格(㎡/天)：</div>
                <div class="content">
                  {{
                    activeBuilding.buildingRentPrice
                      ? activeBuilding.buildingRentPrice
                      : 0
                  }}
                </div>
              </div>
            </div>
            <!-- <el-button class="change" size="mini">更改</el-button> -->
            <span class="todetails">详情</span>
          </div>
          <div class="roomBox">
            <div class="roomTip">
              <div class="tipItem">
                <div class="tipLegend blue"></div>
                <div class="tipLabel">已租赁</div>
              </div>
              <div class="tipItem">
                <div class="tipLegend white"></div>
                <div class="tipLabel">未租赁</div>
              </div>
            </div>
            <div class="roomList">
              <div class="roomItem" v-for="(item, key) in roomData" :key="key">
                <div class="roomItemLabel">{{ item.floorName }}</div>
                <div class="roomItemContent">
                  <div
                    class="flexRoom"
                    v-for="son in item.incubatorRoomResponses"
                    :key="son.id"
                  >
                    <el-popover placement="top" width="400" trigger="hover">
                      <div class="roomPopover">
                        <div class="roomPopoverTop">
                          <div class="itemlist">
                            <div class="item">
                              <span>总面积(㎡)：</span>
                              <span>{{ son.roomConstructionArea }}</span>
                            </div>
                            <div class="item">
                              <span>可用面积(㎡)：</span>
                              <span>{{ son.roomUsableArea }}</span>
                            </div>
                          </div>
                          <div class="itemlist">
                            <div class="item">
                              <span>房屋现状</span>
                              <span>{{ son.roomHousingStatus }}</span>
                            </div>
                            <div class="item">
                              <span>价格(㎡/天)：</span>
                              <span>{{ son.roomRentPrice }}</span>
                            </div>
                          </div>
                          <div class="itemlist">
                            <div class="item">
                              <span>租赁状态：</span>
                              <span>{{
                                getTenancyStatus(son.roomRentalStatus)
                              }}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          class="roomPopoverBottom"
                          v-if="son.roomRentalStatus === '01'"
                        >
                          <div class="item">
                            <span>企业名称：</span>
                            <span>{{ son.roomRentingFirmName }}</span>
                          </div>
                          <div class="item">
                            <span>联系方式：</span>
                            <span>{{ son.roomRentingPhone }}</span>
                          </div>
                          <div class="item">
                            <span>租赁期限(㎡)：</span>
                            <span
                              >{{ son.roomLeaseStartTime }}-{{
                                son.roomLeaseEndTime
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div slot="reference" class="room not">
                        <span class="number">{{ son.roomNumber }}</span>
                        <div class="roomInfo">
                          <span class="renovation">{{
                            getRenovationTypeName(son.roomHousingStatus)
                          }}</span>
                          <span class="area"
                            >{{
                              son.roomConstructionArea
                                ? son.roomConstructionArea
                                : 0
                            }}㎡</span
                          >
                        </div>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-empty
          class="empty"
          v-if="buildingData.length === 0"
          :image-size="200"
        ></el-empty>
      </div>
    </el-scrollbar>
    <div class="paging" v-if="roomData.length > 0">
      <el-radio-group
        v-model="roomPageInfo.currPage"
        size="mini"
        @change="switchRoom"
      >
        <el-radio-button :label="i" v-for="i in roomPageInfo.allPage" :key="i"
          >{{ (i - 1) * 5 + 1 + "~" + i * 5 }}层</el-radio-button
        >
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet } from "@/http";
export default {
  name: "SpaceDisplay",
  data() {
    return {
      sreachForm: {
        any: ""
      },
      incubatorData: [], // 孵化器列表数据
      activeIncubator: "", // 选中孵化器
      buildingData: [], // 楼宇列表数据
      activeBuilding: {
        id: "",
        buildingLandArea: "", // 占地面积
        buildingConstructionArea: "", // 总建筑面积
        buildingUsableArea: "", // 可利用面积
        buildingAlreadySoldArea: "", // 已出让面积
        buildingRentPrice: "" // 价格
      }, // 选中楼宇
      roomData: [], // 房间列表数据
      roomPageInfo: {
        currPage: 1,
        allPage: 0
      },
      renovationType: [], // 装修状态
      tenancyStatus: [] // 租赁状态
    };
  },
  created() {
    // 初始化
    this.init();
    this.$store.dispatch("getRenovationType").then(() => {
      this.renovationType = this.$store.state.renovationType;
    });
    this.$store.dispatch("getTenancyStatus").then(() => {
      this.tenancyStatus = this.$store.state.tenancyStatus;
    });
  },
  mounted() {},
  methods: {
    init() {
      httpPost("/incubator/incubatorInfo/queryAllIncubatorInfo").then(res => {
        if (res.code === "1000000000") {
          this.incubatorData = res.result;
          this.activeIncubator = res.result[3].id;
          httpPost("/incubator/incubatorBuildingInfo/queryAllInfo", {
            incubatorId: this.activeIncubator
          }).then(res => {
            if ((res.code = "1000000000")) {
              this.buildingData = res.result;
              if (res.result.length > 0) {
                for (let key in this.activeBuilding) {
                  this.activeBuilding[key] = res.result[0][key];
                }
                httpPost(
                  "/incubator/incubatorFloorInfo/queryFloorAndRoomyInfo/1/5",
                  { buildingId: this.activeBuilding.id }
                ).then(res => {
                  if (res.code === "1000000000") {
                    this.roomPageInfo.allPage = Math.ceil(
                      res.pageInfo.total / 5
                    );
                    this.roomData = res.result;
                  }
                });
              }
            }
          });
        }
      });
    },
    /**
     * 切换孵化器
     */
    switchIncubator(id) {
      this.activeIncubator = id;
      this.$refs["scroll"].wrap.scrollTop = 0;
      httpPost("/incubator/incubatorBuildingInfo/queryAllInfo", {
        incubatorId: this.activeIncubator
      }).then(res => {
        if ((res.code = "1000000000")) {
          this.buildingData = res.result;
          if (res.result.length > 0) {
            for (let key in this.activeBuilding) {
              this.activeBuilding[key] = res.result[0][key];
            }
            httpPost(
              "/incubator/incubatorFloorInfo/queryFloorAndRoomyInfo/1/5",
              { buildingId: this.activeBuilding.id }
            ).then(res => {
              if (res.code === "1000000000") {
                this.roomPageInfo.allPage = Math.ceil(res.pageInfo.total / 5);
                this.roomData = res.result;
              }
            });
          }
        }
      });
    },
    /**
     * 切换楼宇
     */
    switchBuilding(id) {
      httpPost("/incubator/incubatorFloorInfo/queryFloorAndRoomyInfo/1/5", {
        buildingId: id
      }).then(res => {
        if (res.code === "1000000000") {
          this.roomPageInfo.allPage = Math.ceil(res.pageInfo.total / 5);
          this.roomData = res.result;
        }
      });
    },
    /**
     * 切换楼层
     */
    switchRoom(id) {
      httpPost(`/incubator/incubatorFloorInfo/queryFloorAndRoomyInfo/${id}/5`, {
        buildingId: this.activeBuilding.id
      }).then(res => {
        if (res.code === "1000000000") {
          this.roomPageInfo.allPage = Math.ceil(res.pageInfo.total / 5);
          console.log(res.pageInfo.total);
          this.roomData = res.result;
        }
      });
    },
    /**
     * 获取装修状态字典值
     */
    getRenovationTypeName(val) {
      for (let i = 0; i < this.renovationType.length; i++) {
        if (val === this.renovationType[i].value) {
          return this.renovationType[i].name;
        }
      }
    },
    /**
     * 获取租赁状态字典值
     */
    getTenancyStatus(val) {
      for (let i = 0; i < this.tenancyStatus.length; i++) {
        if (val === this.tenancyStatus[i].value) {
          return this.tenancyStatus[i].name;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.alone /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar {
  height: 100%;
}
.spaceDisplay {
  display: flex;
  .incubatorBox {
    width: 330px;
    .incubatorList {
      margin-top: 16px;
      .incubatorItem {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ebedf0;
        background-color: #fff;
        padding: 16px;
        cursor: pointer;
      }
      .incubatorItem + .incubatorItem {
        margin-top: 16px;
      }
    }
  }
  .incubatorMain {
    flex: 1;
  }
}
/**孵化器列表项 */
.incubatorItem {
  position: relative;
  .todetails {
    position: absolute;
    top: 16px;
    right: 16px;
    color: #276ce3;
    cursor: pointer;
  }
  .title {
    font-weight: bold;
  }
  .infoList {
    margin-top: 20px;
    .infoItem + .infoItem {
      margin-top: 8px;
    }
    .infoItem {
      display: flex;
      color: #323233;
      .label {
        white-space: nowrap;
      }
    }
  }
}
.buildingBox {
  border-bottom: 1px solid #dcdee0;
  position: relative;
  .buildingList {
    box-sizing: border-box;
    padding: 0 80px 0 25px;
  }
  .buildingInfoList {
    margin-top: 30px;
    box-sizing: border-box;
    padding: 0 80px 0 25px;
    display: flex;
    flex-wrap: wrap;
    .buildingInfoItem {
      display: flex;
      color: #323233;
      width: 280px;
      margin-bottom: 16px;
      .label {
        white-space: nowrap;
      }
    }
  }
  .change {
    position: absolute;
    top: 0;
    right: 20px;
  }
  .todetails {
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    color: #276ce3;
  }
}
.roomTip {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  box-sizing: border-box;
  padding: 0 25px 0 100px;
  .tipItem {
    display: flex;
    align-items: center;
    .blue {
      background-color: #276ce3;
    }
    .white {
      background-color: #f0f3fe;
    }
    .tipLegend {
      height: 8px;
      width: 8px;
      border-radius: 50%;
    }
    .tipLabel {
      color: #323233;
      margin-left: 6px;
    }
  }
  .tipItem + .tipItem {
    margin-left: 16px;
  }
}
.roomList {
  box-sizing: border-box;
  padding: 0 20px;
}
.roomItem {
  display: flex;
  margin-top: 16px;
  .roomItemLabel {
    margin-right: 16px;
    white-space: nowrap;
  }
}
.roomItemContent {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  .not {
    background: #f0f3fe;
  }
  .already {
    background-color: #276ce3;
  }
}
.flexRoom {
  width: 12.5%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
}
.room {
  width: 90px;
  height: 70px;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 8px 8px 4px 8px;
  position: relative;
  color: #969799;
  cursor: pointer;
  .roomInfo {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
}
.paging {
  height: 40px;
  background-color: #fff;
  position: fixed;
  bottom: 50px;
  right: 90px;
}
.activeIncubator {
  border-color: #276ce3 !important;
}
.empty {
  flex: 1;
  height: 600px;
}
.roomPopover {
  .roomPopoverTop {
    background-color: #276ce3;
    height: 112px;
    padding: 24px 24px 12px 24px;
    color: #fff;
    .itemlist {
      display: flex;
      .item {
        flex: 1;
        margin-bottom: 8px;
      }
    }
  }
  .roomPopoverBottom {
    background-color: #fff;
    height: 112px;
    padding: 24px 24px 12px 24px;
  }
}
</style>
