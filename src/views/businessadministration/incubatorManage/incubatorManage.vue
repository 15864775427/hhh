<template>
  <div class="alone" id="alone">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="信息管理" name="first">
        <template v-if="activeName === 'first'">
          <div class="operation">
            <el-form :inline="true" :model="sreachForm">
              <el-form-item>
                <el-input
                  placeholder="搜索企业名称"
                  clearable
                  v-model="sreachForm.any"
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
            <el-button type="primary" @click="addInfo">添加</el-button>
          </div>
          <el-table
            v-if="table.height"
            :data="table.data"
            style="width: 100%;margin-bottom:10px;"
            row-key="key"
            :height="table.height"
            :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="constructionArea" label="总建筑面积">
            </el-table-column>
            <el-table-column prop="landArea" label="占地面积">
            </el-table-column>
            <el-table-column prop="usableArea" label="可利用面积">
            </el-table-column>
            <el-table-column prop="alreadySoldArea" label="已出让面积">
            </el-table-column>
            <el-table-column label="产权单位">
              <template slot-scope="scope">
                {{
                  scope.row.titleCompanyName ? scope.row.titleCompanyName : "-"
                }}
              </template>
            </el-table-column>
            <el-table-column label="负责人">
              <template slot-scope="scope">
                {{ scope.row.principal ? scope.row.principal : "-" }}
              </template>
            </el-table-column>
            <el-table-column label="联系方式">
              <template slot-scope="scope">
                {{ scope.row.principalPhone ? scope.row.principalPhone : "-" }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <template v-if="scope.row.operation">
                  <el-link type="primary" @click="editIncubator(scope.row)"
                    >编辑</el-link
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary" @click="deleteIncubator(scope.row)"
                    >删除</el-link
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
        </template>
      </el-tab-pane>
      <el-tab-pane label="租赁管理" name="second">
        <el-scrollbar
          ref="scroll"
          :style="{ height: rightHeight + 'px' }"
          v-if="activeName === 'second'"
        >
          <div class="spaceDisplay">
            <div class="incubatorBox">
              <el-input
                placeholder="孵化器名称/孵化器地址/产权单位名称"
                clearable
                v-model="sreachForm.any"
              >
                <i
                  slot="suffix"
                  @click="init"
                  class="el-input__icon el-icon-search"
                ></i>
              </el-input>
              <div class="incubatorList">
                <div
                  class="incubatorItem"
                  v-bind:class="{
                    activeIncubator: item.id === activeIncubator
                  }"
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
                          item.incubatorUsableArea
                            ? item.incubatorUsableArea
                            : "0"
                        }}㎡
                      </div>
                    </div>
                    <div class="infoItem">
                      <div class="label">产权单位：</div>
                      <div class="content">
                        {{
                          item.titleCompanyName ? item.titleCompanyName : "无"
                        }}
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
                <el-button
                  @click="roomSetModalOpen()"
                  class="change"
                  size="mini"
                  :disabled="getCheckRoom()"
                  >更改</el-button
                >
                <span class="todetails">详情</span>
              </div>
              <div class="roomBox">
                <div class="roomTip">
                  <el-checkbox v-model="checked">多选</el-checkbox>
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
                  <el-checkbox-group v-model="checkedCities">
                    <div
                      class="roomItem"
                      v-for="(item, key) in roomData"
                      :key="key"
                    >
                      <div class="roomItemLabel">
                        <el-checkbox
                          :indeterminate="
                            item &&
                              item.floorName &&
                              roomDataAllCheck[item.floorName] &&
                              checkRoomList[item.floorName] &&
                              roomDataAllCheck[item.floorName].length >
                                checkRoomList[item.floorName].length &&
                              checkRoomList[item.floorName].length > 0
                          "
                          :label="item.floorName"
                          @change="
                            handleCheckedCitiesChange($event, item.floorName)
                          "
                        >
                          {{ item.floorName }}</el-checkbox
                        >
                      </div>
                      <div class="roomItemContent">
                        <template v-if="item && item.incubatorRoomResponses">
                          <div
                            class="flexRoom"
                            v-for="son in item.incubatorRoomResponses"
                            :key="son.id"
                          >
                            <el-popover
                              placement="top"
                              width="400"
                              trigger="hover"
                              :disabled="checked"
                            >
                              <div class="roomPopover">
                                <div class="roomPopoverTop">
                                  <div class="itemlist">
                                    <div class="item">
                                      <span>总面积(㎡)：</span>
                                      <span>{{
                                        son.roomConstructionArea
                                      }}</span>
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
                              <div
                                slot="reference"
                                class="room"
                                v-bind:class="[
                                  son.roomRentalStatus === '02'
                                    ? 'not'
                                    : 'already',
                                  checked ? '' : 'roomHover',
                                  getRoomChecked(item.floorName, son.id)
                                    ? 'roomChecked'
                                    : ''
                                ]"
                                @click="
                                  handleCheckedRoom(son.id, item.floorName)
                                "
                              >
                                <div class="hoverChange">
                                  <el-button
                                    type="primary"
                                    @click="roomSetModalOpen(son)"
                                    size="mini"
                                    >更改</el-button
                                  >
                                </div>
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
                        </template>
                      </div>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <el-empty
              class="empty"
              v-if="buildingData.length === 0"
              :image-size="200"
            ></el-empty>
          </div>
          <div class="paging" v-if="roomData.length > 0">
            <el-radio-group
              v-model="roomPageInfo.currPage"
              size="mini"
              @change="switchRoom"
            >
              <el-radio-button
                :label="i"
                v-for="i in roomPageInfo.allPage"
                :key="i"
                >{{ (i - 1) * 5 + 1 + "~" + i * 5 }}层</el-radio-button
              >
            </el-radio-group>
          </div>
          <el-drawer title="房间设置" :visible.sync="roomSetModal">
            <div class="roomSet">
              <div class="roomInfo" v-if="checkRoomInfoList.length > 0">
                <div class="infoItem">
                  <div class="infoItemLabel">房间号：</div>
                  <div class="infoItemContent">
                    <span
                      v-for="(item, key) in checkRoomInfoList"
                      :key="item.id"
                      >{{ item.roomNumber }}
                      <span v-if="checkRoomInfoList.length !== key + 1"
                        >、</span
                      ></span
                    >
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">总面积(㎡)：</div>
                  <div class="infoItemContent">
                    <span
                      v-for="(item, key) in checkRoomInfoList"
                      :key="item.id"
                      >{{ item.roomConstructionArea }}({{
                        item.roomNumber
                      }})<span v-if="checkRoomInfoList.length !== key + 1"
                        >、</span
                      ></span
                    >
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">可用面积(㎡)：</div>
                  <div class="infoItemContent">
                    <span
                      v-for="(item, key) in checkRoomInfoList"
                      :key="item.id"
                      >{{ item.roomUsableArea }}({{ item.roomNumber }})<span
                        v-if="checkRoomInfoList.length !== key + 1"
                        >、</span
                      ></span
                    >
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">房屋现状：</div>
                  <div class="infoItemContent">
                    <span
                      v-for="(item, key) in checkRoomInfoList"
                      :key="item.id"
                      >{{ getRenovationTypeName(item.roomHousingStatus) }}({{
                        item.roomNumber
                      }})<span v-if="checkRoomInfoList.length !== key + 1"
                        >、</span
                      ></span
                    >
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">租赁状态：</div>
                  <div class="infoItemContent">
                    <span
                      v-for="(item, key) in checkRoomInfoList"
                      :key="item.id"
                      >{{ getTenancyStatus(item.roomRentalStatus) }}({{
                        item.roomNumber
                      }})<span v-if="checkRoomInfoList.length !== key + 1"
                        >、</span
                      ></span
                    >
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">价格(㎡/天)：</div>
                  <div class="infoItemContent">
                    <span
                      v-for="(item, key) in checkRoomInfoList"
                      :key="item.id"
                      >{{ item.roomRentPrice }}({{ item.roomNumber }})<span
                        v-if="checkRoomInfoList.length !== key + 1"
                        >、</span
                      ></span
                    >
                  </div>
                </div>
              </div>
              <div class="roomInfo" v-else>
                <div class="infoItem">
                  <div class="infoItemLabel">房间号：</div>
                  <div class="infoItemContent">
                    {{ checkRoomInfo.roomNumber }}
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">总面积(㎡)：</div>
                  <div class="infoItemContent">
                    {{ checkRoomInfo.roomConstructionArea }}
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">可用面积(㎡)：</div>
                  <div class="infoItemContent">
                    {{ checkRoomInfo.roomUsableArea }}
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">房屋现状：</div>
                  <div class="infoItemContent">
                    {{ getRenovationTypeName(checkRoomInfo.roomHousingStatus) }}
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">租赁状态：</div>
                  <div class="infoItemContent">
                    {{ getTenancyStatus(checkRoomInfo.roomRentalStatus) }}
                  </div>
                </div>
                <div class="infoItem">
                  <div class="infoItemLabel">价格(㎡/天)：</div>
                  <div class="infoItemContent">
                    {{ checkRoomInfo.roomRentPrice }}
                  </div>
                </div>
              </div>
              <div class="roomform">
                <el-form ref="form" :model="leaseFormSet" label-width="100px">
                  <el-form-item label="企业名称">
                    <el-select
                      v-model="leaseFormSet.roomRentingFirmId"
                      v-el-select-loadmore="loadmore"
                      placeholder="企业名称"
                    >
                      <el-option
                        v-for="(item, index) in selectOption.data"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="联系方式">
                    <el-input
                      v-model="leaseFormSet.roomRentingPhone"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="租赁期限">
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="leaseFormSet.roomLeaseStartTime"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center;"
                      >至</el-col
                    >
                    <el-col :span="11">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-model="leaseFormSet.roomLeaseEndTime"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <div class="formFooter">
                    <el-button type="primary" @click="roomSetDetermine"
                      >确定</el-button
                    >
                    <el-button>取消</el-button>
                  </div>
                </el-form>
              </div>
            </div>
          </el-drawer>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增 编辑 孵化器 -->
    <div class="addAllPage" v-if="addAllPage">
      <el-scrollbar>
        <div class="pageTitle">
          新增信息
        </div>
        <div class="pageMain">
          <el-form ref="form" :model="addAllForm" label-width="100px">
            <div class="itemTitle">
              孵化器信息
            </div>
            <el-form-item label="孵化器名称">
              <el-input v-model="addAllForm.incubatorName"></el-input>
            </el-form-item>
            <el-form-item label="所在地">
              <el-input v-model="addAllForm.incubatorAddress"></el-input>
            </el-form-item>

            <div class="tableForm">
              <div class="item">
                <div class="column">
                  <div class="label">占地面积(亩)</div>
                  <div class="content">
                    <el-input v-model="addAllForm.incubatorLandArea"></el-input>
                  </div>
                </div>
                <div class="column">
                  <div class="label">总建筑面积(㎡)</div>
                  <div class="content">
                    <el-input
                      v-model="addAllForm.incubatorConstructionArea"
                    ></el-input>
                  </div>
                </div>
                <div class="column">
                  <div class="label">已出让面积(㎡)</div>
                  <div class="content">
                    <el-input
                      v-model="addAllForm.incubatorAlreadySoldArea"
                    ></el-input>
                  </div>
                </div>
                <div class="column">
                  <div class="label">可利用面积(㎡)</div>
                  <div class="content">
                    <el-input
                      v-model="addAllForm.incubatorUsableArea"
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <el-form-item label="产权单位">
              <el-select
                filterable
                allow-create
                v-el-select-loadmore="loadmore"
                v-model="addAllForm.titleCompanyId"
                @change="changePropertyrightUnit"
                placeholder="产权单位/若无可输入新增产权单位"
              >
                <el-option
                  v-for="(item, index) in selectOption.data"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产权单位地址">
              <el-input v-model="addAllForm.titleCompanyAddress"></el-input>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input v-model="addAllForm.principal"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="addAllForm.principalPhone"></el-input>
            </el-form-item>
            <div class="itemTitle">
              楼宇信息
            </div>
            <div class="buildingBox">
              <div class="buildingList">
                <el-radio-group v-model="addAllFormBuilding" size="mini">
                  <el-radio-button
                    v-for="(item, index) in addAllForm.incubatorBuildingInfos"
                    :key="index"
                    :label="index"
                    >{{ item.buildingName }}</el-radio-button
                  >
                </el-radio-group>
              </div>
              <div class="buildingLabel" @click="addOneBuilding">添加楼宇</div>
            </div>
            <el-form-item label="楼宇名称">
              <el-input
                v-model="
                  addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                    .buildingName
                "
              ></el-input>
            </el-form-item>
            <el-form-item label="楼号">
              <el-input
                v-model="
                  addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                    .buildingNumber
                "
              ></el-input>
            </el-form-item>
            <div class="tableForm">
              <div class="item">
                <div class="column">
                  <div class="label">占地面积(亩)</div>
                  <div class="content">
                    <el-input
                      v-model="
                        addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                          .buildingLandArea
                      "
                    ></el-input>
                  </div>
                </div>
                <div class="column">
                  <div class="label">总建筑面积(㎡)</div>
                  <div class="content">
                    <el-input
                      v-model="
                        addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                          .buildingConstructionArea
                      "
                    ></el-input>
                  </div>
                </div>
                <div class="column">
                  <div class="label">已出让面积(㎡)</div>
                  <div class="content">
                    <el-input
                      v-model="
                        addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                          .buildingAlreadySoldArea
                      "
                    ></el-input>
                  </div>
                </div>
                <div class="column">
                  <div class="label">可利用面积(㎡)</div>
                  <div class="content">
                    <el-input
                      v-model="
                        addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                          .buildingUsableArea
                      "
                    ></el-input>
                  </div>
                </div>
                <div class="column">
                  <div class="label">价格(平米/天)</div>
                  <div class="content">
                    <el-input
                      v-model="
                        addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                          .buildingRentPrice
                      "
                    ></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemTitle">
              楼层房屋信息
            </div>
            <div class="floorRoomBox">
              <div
                class="floorBox"
                v-for="(item, index) in addAllForm.incubatorBuildingInfos[
                  addAllFormBuilding
                ].incubatorFloorInfos"
                :key="index"
              >
                <div class="floorLabel">
                  <span>第{{ item.floorNumber }}层</span>
                  <div
                    v-if="
                      index > 0 &&
                        index + 1 ===
                          addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                            .incubatorFloorInfos.length
                    "
                    class="delOneFloor"
                    @click="delOneFloor(index)"
                  >
                    删除当前层
                  </div>
                </div>
                <div class="floorContent">
                  <div class="tableForm">
                    <div class="item">
                      <div class="column">
                        <div class="label">总建筑面积(㎡)</div>
                        <div class="content">
                          <el-input
                            v-model="item.floorConstructionArea"
                          ></el-input>
                        </div>
                      </div>
                      <div class="column">
                        <div class="label">已出让面积(㎡)</div>
                        <div class="content">
                          <el-input
                            v-model="item.floorAlreadySoldArea"
                          ></el-input>
                        </div>
                      </div>
                      <div class="column">
                        <div class="label">可利用面积(㎡)</div>
                        <div class="content">
                          <el-input v-model="item.floorUsableArea"></el-input>
                        </div>
                      </div>
                      <div class="column">
                        <div class="label">价格(元/平米/天)</div>
                        <div class="content">
                          <el-input v-model="item.floorRentPrice"></el-input>
                        </div>
                      </div>
                      <div class="column">
                        <div class="label">承重(kn/㎡)</div>
                        <div class="content">
                          <el-input v-model="item.floorLoadBearing"></el-input>
                        </div>
                      </div>
                      <div class="column">
                        <div class="label">层高(m)</div>
                        <div class="content">
                          <el-input v-model="item.floorHigh"></el-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="floorContentGroup">
                    <radio-group
                      :radioData="item.incubatorRoomInfos"
                      exhibition="roomNumber"
                      @radioChange="dsRadioChange($event, index)"
                      @radioClose="dsRadioClose($event, index)"
                    ></radio-group>
                    <span class="addOneRoom" @click="addOneRoom(index)"
                      >添加房间</span
                    >
                  </div>
                </div>
              </div>
              <div class="floorRoomBoxFooter">
                <span class="addFloor" @click="addOneFloor">新增一层</span>
              </div>
            </div>
          </el-form>
        </div>

        <div class="pageNavigation"></div>
        <div class="pageFooter">
          <el-button @click="addAllPage = false">取消</el-button>
          <el-button @click="addAllRoomDetermine" type="primary"
            >确定</el-button
          >
        </div>
      </el-scrollbar>
    </div>
    <!-- 新增 编辑 孵化器  房间信息设置 -->
    <el-drawer title="房间设置" :visible.sync="addAllroomSetModal">
      <div class="addAllroomSetModal">
        <el-form
          :model="
            addAllForm.incubatorBuildingInfos[addAllFormBuilding]
              .incubatorFloorInfos[addAllFormFloor].incubatorRoomInfos[
              addAllFormRoom
            ]
          "
          label-width="100px"
        >
          <el-form-item label="房间号">
            <el-input
              v-model="
                addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                  .incubatorFloorInfos[addAllFormFloor].incubatorRoomInfos[
                  addAllFormRoom
                ].roomNumber
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="房屋现状">
            <el-select
              v-model="
                addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                  .incubatorFloorInfos[addAllFormFloor].incubatorRoomInfos[
                  addAllFormRoom
                ].roomHousingStatus
              "
            >
              <el-option
                v-for="(item, index) in renovationType"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="tableForm">
            <div class="item">
              <div class="column">
                <div class="label">总建筑面积(㎡)</div>
                <div class="content">
                  <el-input
                    v-model="
                      addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                        .incubatorFloorInfos[addAllFormFloor]
                        .incubatorRoomInfos[addAllFormRoom].roomConstructionArea
                    "
                  ></el-input>
                </div>
              </div>
              <div class="column">
                <div class="label">价格(元/平米/天)</div>
                <div class="content">
                  <el-input
                    v-model="
                      addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                        .incubatorFloorInfos[addAllFormFloor]
                        .incubatorRoomInfos[addAllFormRoom].roomRentPrice
                    "
                  ></el-input>
                </div>
              </div>
              <div class="column">
                <div class="label">租金</div>
                <div class="content">
                  <el-input
                    v-model="
                      addAllForm.incubatorBuildingInfos[addAllFormBuilding]
                        .incubatorFloorInfos[addAllFormFloor]
                        .incubatorRoomInfos[addAllFormRoom].roomPrice
                    "
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-form>
        <div class="addAllroomSetModalFooter">
          <el-button @click="addAllroomSetModal = false">取消</el-button>
          <el-button type="primary" @click="addAllroomSetModal = false"
            >确定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet } from "@/http";
import radioGroup from "@/components/radio-group.vue";
export default {
  name: "SpaceDisplay",
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector(
          ".el-scrollbar__wrap.el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  components: {
    radioGroup
  },
  watch: {
    roomData(val) {
      if (val && val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          this.roomDictionaries = [
            ...this.roomDictionaries,
            ...(val[i]["incubatorRoomResponses"] || [])
          ];
        }
      } else {
        this.roomDictionaries = [];
      }
    },
    addAllPage(val) {
      if (!val) {
        Object.assign(this.$data.addAllForm, this.$options.data().addAllForm);
      }
    }
  },
  data() {
    return {
      sreachForm: {
        any: ""
      },
      activeName: "first",
      table: {
        data: [],
        height: "",
        total: 0,
        currentPage: 1
      },
      rightHeight: "",
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
      tenancyStatus: [], // 租赁状态
      checked: false, // 开启多选
      checkedCities: [], // 楼层选中集合
      roomDataAllCheck: {}, // 房间多选全部数据
      checkRoomList: {}, // 选中房间集合
      roomDictionaries: [],
      checkRoomInfoList: [], // 选中房间详细信息
      checkRoomInfo: {}, // 单个房间详细信息
      roomSetModal: false, // 设置房间模态框
      leaseFormSet: {
        roomRentingFirmId: "",
        roomRentingPhone: "",
        roomLeaseStartTime: "",
        roomLeaseEndTime: ""
      },
      addAllPage: false, // 添加孵化器 页面
      addAllForm: {
        incubatorName: "", // 孵化器名称
        incubatorAddress: "", // 孵化器地址
        incubatorLandArea: "", // 占地面积
        incubatorConstructionArea: "", // 总建筑面积
        incubatorAlreadySoldArea: "", // 已出让面积
        incubatorUsableArea: "", //可利用面积
        titleCompanyId: "", // 产权单位id
        titleCompanyAddress: "", // 产权单位地址
        titleCompanyName: "", // 产权单位名称
        principal: "", // 负责人
        principalPhone: "", // 负责人联系方式
        incubatorBuildingInfos: [
          {
            buildingNumber: "1", // 楼号
            buildingName: "1号楼", //名称
            buildingLandArea: "", // 占地面积
            buildingConstructionArea: "", // 总建筑面积
            buildingAlreadySoldArea: "", // 已出让面积
            buildingUsableArea: "", //可利用面积
            buildingRentPrice: "", //价格
            incubatorFloorInfos: [
              {
                floorNumber: "1", //层数
                floorConstructionArea: "", // 总建筑面积
                floorAlreadySoldArea: "", // 已出让面积
                floorUsableArea: "", //可利用面积
                floorRentPrice: "", //价格
                floorLoadBearing: "", //承重
                floorHigh: "", //层高
                incubatorRoomInfos: [
                  {
                    roomNumber: "101", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "102", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "103", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "104", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "105", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "106", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "107", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "108", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  }
                ] // 房间
              },
              {
                floorNumber: "2", //层数
                floorConstructionArea: "", // 总建筑面积
                floorAlreadySoldArea: "", // 已出让面积
                floorUsableArea: "", //可利用面积
                floorRentPrice: "", //价格
                floorLoadBearing: "", //承重
                floorHigh: "", //层高
                incubatorRoomInfos: [
                  {
                    roomNumber: "201", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "202", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "203", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "204", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "205", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "206", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "207", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "208", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  }
                ] // 房间
              },
              {
                floorNumber: "3", //层数
                floorConstructionArea: "", // 总建筑面积
                floorAlreadySoldArea: "", // 已出让面积
                floorUsableArea: "", //可利用面积
                floorRentPrice: "", //价格
                floorLoadBearing: "", //承重
                floorHigh: "", //层高
                incubatorRoomInfos: [
                  {
                    roomNumber: "301", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "302", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "303", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "304", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "305", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "306", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "307", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "308", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  }
                ] // 房间
              },
              {
                floorNumber: "4", //层数
                floorConstructionArea: "", // 总建筑面积
                floorAlreadySoldArea: "", // 已出让面积
                floorUsableArea: "", //可利用面积
                floorRentPrice: "", //价格
                floorLoadBearing: "", //承重
                floorHigh: "", //层高
                incubatorRoomInfos: [
                  {
                    roomNumber: "401", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "402", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "403", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "404", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "405", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "406", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "407", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "408", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  }
                ] // 房间
              },
              {
                floorNumber: "5", //层数
                floorConstructionArea: "", // 总建筑面积
                floorAlreadySoldArea: "", // 已出让面积
                floorUsableArea: "", //可利用面积
                floorRentPrice: "", //价格
                floorLoadBearing: "", //承重
                floorHigh: "", //层高
                incubatorRoomInfos: [
                  {
                    roomNumber: "501", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "502", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "503", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "504", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "505", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "506", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "507", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  },
                  {
                    roomNumber: "508", //房间号
                    roomHousingStatus: "", // 装修状态 房屋现状
                    roomConstructionArea: "", //总建筑面积
                    roomRentPrice: "", // 租金单价
                    roomPrice: "" //总租金
                  }
                ] // 房间
              }
            ] //楼层
          }
        ] // 楼宇
      },
      addAllFormBuilding: "0", // 选中楼宇下标
      addAllFormFloor: "0", // 选中楼层下标
      addAllFormRoom: "0", // 选中房间下标
      addAllroomSetModal: false, // 添加编辑孵化器 设置房间
      selectOption: {
        data: [],
        page: 1,
        pageNum: 10,
        total: 0
      },
      editAllId: ""
    };
  },
  created() {
    this.$store.dispatch("getRenovationType").then(() => {
      this.renovationType = this.$store.state.renovationType;
    });
    this.$store.dispatch("getTenancyStatus").then(() => {
      this.tenancyStatus = this.$store.state.tenancyStatus;
    });
    this.getPropertyrightUnit();
  },
  mounted() {
    let tableDom = document.getElementById("alone");
    this.table.height = tableDom.offsetHeight - 180;
    this.rightHeight = tableDom.offsetHeight - 100;
    this.initTable();
  },
  methods: {
    /**
     * 添加孵化器
     */
    addInfo() {
      this.addAllPage = true;
    },
    /**
     * 初始化表格
     */
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      httpPost(
        `/incubator/incubatorInfo/queryAll/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        this.table.total = res.pageInfo.total;
        this.table.data = this.integration(res.result);
      });
    },
    /**
     * tab切换
     */
    handleClick() {
      if (this.activeName === "second") {
        this.init();
      }
    },
    /**
     * 切换分页
     */
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    roomSetModalOpen(obj) {
      if (obj) {
        this.checkRoomInfo = obj;
      } else {
        let checkRoomList = this.checkRoomList;
        let roomDictionaries = this.roomDictionaries;
        let data = [];
        for (let key in checkRoomList) {
          data = [...data, ...(checkRoomList[key] ? checkRoomList[key] : [])];
        }
        let info = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < roomDictionaries.length; j++) {
            if (roomDictionaries[j].id === data[i]) {
              info.push(roomDictionaries[j]);
            }
          }
        }
        this.checkRoomInfoList = info;
      }
      this.roomSetModal = true;
    },
    /**
     * 整合表格数据
     */
    integration(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].incubatorBuildingResponses) {
          data[i].child = data[i].incubatorBuildingResponses;
          for (let j = 0; j < data[i].child.length; j++) {
            if (data[i].child[j].incubatorFloorResponses) {
              data[i].child[j].child = data[i].child[j].incubatorFloorResponses;
            }
          }
        }
      }
      data.map(item => {
        item.key = item.id + "a";
        item.operation = true;
        item.name = item.incubatorName; // 名字
        item.alreadySoldArea = item.incubatorAlreadySoldArea; // 已出让面积
        item.constructionArea = item.incubatorConstructionArea; // 总建筑面积
        item.landArea = item.incubatorLandArea; // 占地面积
        item.usableArea = item.incubatorUsableArea; // 可利用面积
        if (item.child) {
          item.child = item.child.map(son => {
            son.key = son.id + "b";
            son.name = son.buildingName; // 名字
            son.alreadySoldArea = son.buildingAlreadySoldArea; // 已出让面积
            son.constructionArea = son.buildingConstructionArea; // 总建筑面积
            son.landArea = son.buildingLandArea; // 占地面积
            son.usableArea = son.buildingUsableArea; // 可利用面积
            if (son.child) {
              son.child = son.child.map(sson => {
                sson.key = sson.id + "c";
                sson.name = sson.floorNumber; // 名字
                sson.alreadySoldArea = sson.floorAlreadySoldArea; // 已出让面积
                sson.constructionArea = sson.floorConstructionArea; // 总建筑面积
                sson.landArea = "-"; // 占地面积
                sson.usableArea = sson.floorUsableArea; // 可利用面积
                return sson;
              });
            }
            return son;
          });
        }
        return item;
      });
      return data;
    },
    /**
     * 楼层选择回调
     */
    handleCheckedCitiesChange(val, floorName) {
      if (val) {
        this.$set(
          this.checkRoomList,
          floorName,
          this.roomDataAllCheck[floorName]
        );
      } else {
        this.$set(this.checkRoomList, floorName, []);
      }
    },
    /**
     * 房间选择回调
     */
    handleCheckedRoom(id, floorName) {
      if (this.checked) {
        if (
          this.checkRoomList[floorName] &&
          this.checkRoomList[floorName].includes(id)
        ) {
          this.$set(
            this.checkRoomList,
            floorName,
            this.checkRoomList[floorName].filter(item => item !== id)
          );
          this.checkedCities = this.checkedCities.filter(
            item => item !== floorName
          );
        } else {
          if (this.checkRoomList[floorName]) {
            this.checkRoomList[floorName].push(id);
            if (
              this.checkRoomList[floorName].length ===
              this.roomDataAllCheck[floorName].length
            ) {
              this.checkedCities.push(floorName);
            }
          } else {
            this.$set(this.checkRoomList, floorName, [id]);
            if (
              this.checkRoomList[floorName].length ===
              this.roomDataAllCheck[floorName].length
            ) {
              this.checkedCities.push(floorName);
            }
          }
        }
      } else {
        return false;
      }
    },
    /**
      初始化
     */
    init() {
      httpPost(
        "/incubator/incubatorInfo/queryAllIncubatorInfo",
        this.sreachForm
      ).then(res => {
        if (res.code === "1000000000") {
          this.incubatorData = res.result;
          if (res.result.length > 0) {
            this.activeIncubator = res.result[0].id;
          }
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
                    let arr = res.result ? res.result : [];
                    this.roomData = arr;
                    this.roomDataAllCheck = {};
                    for (let i = 0; i < arr.length; i++) {
                      let sonArr = arr[i].incubatorRoomResponses
                        ? arr[i].incubatorRoomResponses
                        : [];
                      this.$set(
                        this.roomDataAllCheck,
                        arr[i].floorName,
                        sonArr
                          .filter(son => son.roomRentalStatus === "02")
                          .map(son => son.id)
                      );
                    }
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
      this.resetChecked();
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
                let arr = res.result ? res.result : [];
                this.roomData = arr;
                this.roomDataAllCheck = {};
                for (let i = 0; i < arr.length; i++) {
                  let sonArr = arr[i].incubatorRoomResponses
                    ? arr[i].incubatorRoomResponses
                    : [];
                  this.$set(
                    this.roomDataAllCheck,
                    arr[i].floorName,
                    sonArr
                      .filter(son => son.roomRentalStatus === "02")
                      .map(son => son.id)
                  );
                }
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
      this.resetChecked();
      httpPost("/incubator/incubatorFloorInfo/queryFloorAndRoomyInfo/1/5", {
        buildingId: id
      }).then(res => {
        if (res.code === "1000000000") {
          this.roomPageInfo.allPage = Math.ceil(res.pageInfo.total / 5);
          let arr = res.result ? res.result : [];
          this.roomData = arr;
          this.roomDataAllCheck = {};
          for (let i = 0; i < arr.length; i++) {
            let sonArr = arr[i].incubatorRoomResponses
              ? arr[i].incubatorRoomResponses
              : [];
            this.$set(
              this.roomDataAllCheck,
              arr[i].floorName,
              sonArr
                .filter(son => son.roomRentalStatus === "02")
                .map(son => son.id)
            );
          }
        }
      });
    },
    /**
     * 切换楼层
     */
    switchRoom(id) {
      this.resetChecked();
      httpPost(`/incubator/incubatorFloorInfo/queryFloorAndRoomyInfo/${id}/5`, {
        buildingId: this.activeBuilding.id
      }).then(res => {
        if (res.code === "1000000000") {
          this.roomPageInfo.allPage = Math.ceil(res.pageInfo.total / 5);
          let arr = res.result ? res.result : [];
          this.roomData = arr;
          this.roomDataAllCheck = {};
          for (let i = 0; i < arr.length; i++) {
            let sonArr = arr[i].incubatorRoomResponses
              ? arr[i].incubatorRoomResponses
              : [];
            this.$set(
              this.roomDataAllCheck,
              arr[i].floorName,
              sonArr
                .filter(son => son.roomRentalStatus === "02")
                .map(son => son.id)
            );
          }
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
    },
    /**
     * 获取房间选中状态
     */
    getRoomChecked(floorName, id) {
      if (
        this.checkRoomList[floorName] &&
        this.checkRoomList[floorName].includes(id)
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 多选房间放开更改
     */
    getCheckRoom() {
      let checkRoomList = this.checkRoomList;
      let sum = 0;
      for (let key in checkRoomList) {
        sum += checkRoomList[key] ? checkRoomList[key].length : 0;
      }
      if (sum === 0) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 选中状态 还原
     */
    resetChecked() {
      this.checked = false;
      this.checkedCities = [];
      this.roomDataAllCheck = [];
      this.checkRoomList = {};
    },
    /**
     * 自定义单选组件点击回调
     */
    dsRadioChange(data, key) {
      this.addAllFormFloor = key; // 楼层下标
      this.addAllFormRoom = data.index; // 房间下标
      this.addAllroomSetModal = true;
    },
    /**
     * 自定义单选组件关闭回调
     */
    dsRadioClose(data, key) {
      let arr = this.addAllForm.incubatorBuildingInfos[this.addAllFormBuilding]
        .incubatorFloorInfos[key].incubatorRoomInfos;
      this.addAllForm.incubatorBuildingInfos[
        this.addAllFormBuilding
      ].incubatorFloorInfos[key].incubatorRoomInfos = arr.filter(
        item => item.roomNumber !== data.roomNumber
      );
    },
    /**
     * 新增一栋楼
     */
    addOneBuilding() {
      let floorList = [];
      for (let j = 1; j < 6; j++) {
        let roomList = [];
        for (let i = 1; i < 9; i++) {
          roomList.push({
            roomNumber: j + "0" + i, //房间号
            roomHousingStatus: "", // 装修状态 房屋现状
            roomConstructionArea: "", //总建筑面积
            roomRentPrice: "", // 租金单价
            roomPrice: "" //总租金
          });
        }
        floorList.push({
          floorNumber: j, //层数
          floorConstructionArea: "", // 总建筑面积
          floorAlreadySoldArea: "", // 已出让面积
          floorUsableArea: "", //可利用面积
          floorRentPrice: "", //价格
          floorLoadBearing: "", //承重
          floorHigh: "",
          incubatorRoomInfos: roomList
        });
      }
      let building = {
        buildingNumber: `${this.addAllForm.incubatorBuildingInfos.length + 1}`, // 楼号
        buildingName:
          this.addAllForm.incubatorBuildingInfos.length + 1 + "号楼", //名称
        buildingLandArea: "", // 占地面积
        buildingConstructionArea: "", // 总建筑面积
        buildingAlreadySoldArea: "", // 已出让面积
        buildingUsableArea: "", //可利用面积
        buildingRentPrice: "", //价格
        incubatorFloorInfos: floorList
      };
      this.addAllForm.incubatorBuildingInfos.push(building);
    },
    /**
     * 新增一层
     */
    addOneFloor() {
      let floorList = this.addAllForm.incubatorBuildingInfos[
        this.addAllFormBuilding
      ]["incubatorFloorInfos"];
      let roomList = [];
      for (let i = 1; i < 9; i++) {
        roomList.push({
          roomNumber: floorList.length + 1 + "0" + i, //房间号
          roomHousingStatus: "", // 装修状态 房屋现状
          roomConstructionArea: "", //总建筑面积
          roomRentPrice: "", // 租金单价
          roomPrice: "" //总租金
        });
      }
      this.addAllForm.incubatorBuildingInfos[this.addAllFormBuilding][
        "incubatorFloorInfos"
      ].push({
        floorNumber: floorList.length + 1, //层数
        floorConstructionArea: "", // 总建筑面积
        floorAlreadySoldArea: "", // 已出让面积
        floorUsableArea: "", //可利用面积
        floorRentPrice: "", //价格
        floorLoadBearing: "", //承重
        floorHigh: "",
        incubatorRoomInfos: roomList
      });
    },
    /**
     * 删除一层
     */
    delOneFloor(index) {
      this.addAllForm.incubatorBuildingInfos[this.addAllFormBuilding][
        "incubatorFloorInfos"
      ].splice(index, 1);
    },
    /**
     * 新增一个房间
     */
    addOneRoom(index) {
      let roomList = this.addAllForm.incubatorBuildingInfos[
        this.addAllFormBuilding
      ]["incubatorFloorInfos"][index]["incubatorRoomInfos"];
      this.addAllForm.incubatorBuildingInfos[this.addAllFormBuilding][
        "incubatorFloorInfos"
      ][index]["incubatorRoomInfos"].push({
        roomNumber: index + 1 + "0" + (roomList.length + 1), //房间号
        roomHousingStatus: "", // 装修状态 房屋现状
        roomConstructionArea: "", //总建筑面积
        roomRentPrice: "", // 租金单价
        roomPrice: "" //总租金
      });
    },
    /**
     * 新增or修改孵化器
     */
    addAllRoomDetermine() {
      let flag = true;
      for (let i = 0; i < this.selectOption.data.length; i++) {
        if (
          this.selectOption.data[i].value === this.addAllForm.titleCompanyId
        ) {
          flag = false;
        }
      }
      if (flag) {
        this.addAllForm.titleCompanyName = this.addAllForm.titleCompanyId;
        this.addAllForm.titleCompanyId = "";
      }
      if (this.editAllId) {
        let data = this.addAllForm;
        data.id = this.editAllId;
        httpPost("/incubator/incubatorInfo/updateInfo", data).then(res => {
          if (res.code === "1000000000") {
            this.$message.success("修改成功");
            this.addAllPage = false;
            this.getPropertyrightUnit();
            this.initTable();
          } else {
            this.$message.error("修改失败");
          }
        });
      } else {
        httpPost("/incubator/incubatorInfo/addInfo", this.addAllForm).then(
          res => {
            if (res.code === "1000000000") {
              this.addAllPage = false;
              this.$message.success("添加成功");
              this.getPropertyrightUnit();
              this.initTable();
            }
          }
        );
      }
    },
    /**
     * 无限滚动
     */
    loadmore() {
      this.selectOption.page += 1;
      if (
        this.selectOption.page * this.selectOption.pageNum -
          this.selectOption.total >
        10
      ) {
        return false;
      }
      this.getPropertyrightUnit();
    },
    /**
     * 获取产权单位选项
     */
    getPropertyrightUnit() {
      httpPost(
        `/firm/firmInfo/queryAll/${this.selectOption.page}/${this.selectOption.pageNum}`,
        {}
      ).then(res => {
        this.selectOption.total = res.pageInfo.total;
        this.selectOption.data = this.selectOption.data.concat(
          res.result.map(item => {
            item.name = item.firmName;
            item.value = item.id;
            return item;
          })
        );
      });
    },
    /**
     * 选中产权单位
     */
    changePropertyrightUnit(val) {
      let data = this.selectOption.data.filter(item => {
        return val === item.value;
      });
      if (data.length > 0) {
        this.addAllForm.titleCompanyAddress = data[0].firmRegistAddress;
        this.addAllForm.principal = data[0].contactPerson;
        this.addAllForm.principalPhone = data[0].contactPersonPhone;
      } else {
        this.addAllForm.titleCompanyAddress = "";
        this.addAllForm.principal = "";
        this.addAllForm.principalPhone = "";
      }
    },
    /**
     * 确定修改
     */
    roomSetDetermine() {
      if (this.checkRoomInfoList.length > 0) {
        let data = this.leaseFormSet;
        data.ids = this.checkRoomInfoList.map(item => {
          return item.id;
        });
        httpPost("/incubator/incubatorRoomInfo/updateInfo", data).then(res => {
          if ((res, code === "")) {
            this.$message.success("修改成功");
            this.roomSetModal = false;
            Object.assign(
              this.$data.checkRoomInfo,
              this.$options.data().checkRoomInfo
            );
            Object.assign(
              this.$data.leaseFormSet,
              this.$options.data().leaseFormSet
            );
          }
        });
      } else {
        let data = this.leaseFormSet;
        data.id = this.checkRoomInfo.id;
        httpPost("/incubator/incubatorRoomInfo/updateInfo", data).then(res => {
          if (res.code === "1000000000") {
            this.$message.success("修改成功");
            this.roomSetModal = false;
            Object.assign(
              this.$data.checkRoomInfo,
              this.$options.data().checkRoomInfo
            );
            Object.assign(
              this.$data.leaseFormSet,
              this.$options.data().leaseFormSet
            );
          }
        });
      }
    },
    /**
     * 编辑孵化器
     */
    editIncubator(row) {
      httpGet(`/incubator/incubatorInfo/queryById/${row.id}`).then(res => {
        if (res.code === "1000000000") {
          this.addAllForm = res.result;
          if (
            this.addAllForm.titleCompanyName &&
            !this.addAllForm.titleCompanyId
          ) {
            this.addAllForm.titleCompanyId = this.addAllForm.titleCompanyName;
          }
          this.addAllPage = true;
          this.editAllId = row.id;
        }
      });
    },
    /**
     * 删除孵化器
     */
    deleteIncubator(row) {
      this.$confirm("此操作将永久删除该孵化器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDelete(`/incubator/incubatorInfo/deleteById/${row.id}`).then(
            res => {
              if (res.code === "1000000000") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.initTable(this.table.currentPage);
              } else {
                this.$message.error("删除失败");
              }
            }
          );
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.alone /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
  position: relative;
}
.alone /deep/ .el-scrollbar {
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
  padding: 0 25px 0 25px;
  .el-checkbox {
    margin-right: auto;
  }
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
  padding: 0 25px;
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
    border: 1px solid #f0f3fe;
  }
  .already {
    background-color: #276ce3;
    color: #fff;
  }
  .roomChecked {
    border-color: #276ce3;
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
.roomHover.not:hover {
  .hoverChange {
    display: flex;
  }
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
  .hoverChange {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;
    display: none;
  }
  .number {
    font-size: 14px;
  }
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
.roomSet {
  box-sizing: border-box;
  width: 100%;
  padding: 12px 24px;
  .roomInfo {
    width: 100%;
    background-color: #f7f8fa;
    padding: 24px;
    box-sizing: border-box;
    .infoItem {
      width: 100%;
      margin-bottom: 8px;
      color: #323233;
      display: flex;
      .infoItemLabel {
        width: 100px;
        text-align: right;
      }
    }
  }
  .roomform {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
  }
  .formFooter {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
  }
}
.addAllPage {
  position: absolute;
  top: 20px;
  bottom: 15px;
  left: 20px;
  right: 20px;
  background-color: #fff;
  z-index: 100;
  .pageTitle {
    padding: 10px 0;
    font-size: 16px;
    color: #323233;
    font-weight: bold;
    border-bottom: 2px solid #dcdee0;
    margin-bottom: 24px;
  }
  .pageFooter {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
  }
  .pageMain {
    box-sizing: border-box;
    width: 100%;
    padding-right: 200px;
  }
  .pageNavigation {
    position: fixed;
    right: 136px;
    top: 150px;
    background-color: aqua;
    height: 50px;
    width: 100px;
  }
  .itemTitle {
    padding: 10px 0;
    font-size: 16px;
    color: #323233;
    font-weight: bold;
    margin-bottom: 24px;
  }
  .buildingBox {
    display: flex;
    border: none;
    margin-bottom: 24px;
    .buildingList {
      flex: 1;
    }
    .buildingLabel {
      width: 100px;
      cursor: pointer;
      color: #276ce3;
    }
  }
}
.floorRoomBox {
  background: #f7f8fa;
  margin-bottom: 24px;
  width: 100%;
  padding: 24px;
  .floorBox {
    display: flex;
    .floorLabel {
      width: 80px;
      text-align: center;
      font-weight: bold;
    }
    .floorContent {
      flex: 1;
      .floorContentGroup {
        padding-right: 200px;
        position: relative;
        .addOneRoom {
          position: absolute;
          left: 840px;
          top: 10px;
          cursor: pointer;
          color: #276ce3;
        }
      }
    }
    .delOneFloor {
      font-weight: 400;
      cursor: pointer;
      color: #276ce3;
      margin-top: 8px;
    }
  }
}
.tableForm {
  margin-bottom: 24px;
  .item {
    display: flex;
    .column + .column {
      margin-left: -1px;
    }
    .column {
      background-color: #fff;
      .label {
        padding: 10px 17px;
        width: 150px;
        height: 40px;
        border: 1px solid #ebedf0;
      }
      .content {
        margin-top: -1px;
        height: 40px;
        width: 150px;
        border: 1px solid #ebedf0;
      }
    }
  }
}
.content /deep/ .el-input {
  width: 100%;
}
.content /deep/ .el-input .el-input__inner {
  border: none;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.floorRoomBoxFooter {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  .addFloor {
    cursor: pointer;
    color: #276ce3;
  }
}
.addAllroomSetModal {
  padding: 24px;
  box-sizing: border-box;
  .addAllroomSetModalFooter {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
  }
}
</style>
