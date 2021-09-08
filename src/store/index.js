import Vue from "vue";
import Vuex from "vuex";
import { httpGet } from "@/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // page列表
    tabList: [],
    // 用户类型
    userType: "01", // 01管委会园区端 02企业端
    activeTab: "",
    // 字典类型集合
    dictionaryTypeOptions: [],
    // 职位集合
    positionList: [],
    // 角色类型
    roleTypeList: [],
    // 部门集合
    departmentList: [],
    /**
     * 招商管理
     */
    /// 宣传信息发布
    // 信息类型
    informationTypeList: [],
    //发布状态
    releaseStatus: [],
    /// 目标企业管理
    // 产业类型
    industryType: [],
    // 入驻类型
    settledType: [],
    // 产品进度
    productProgress: [],
    // 是否投产
    whetherProduction: [],
    // 企业类型
    enterpriseType: [],
    //装修状态
    renovationType: [],
    /**租赁状态 */
    tenancyStatus: [],
    /**行业类型 */
    hindustryType: [],
    /**是否上规企业 */
    guishangType: [],
    /**入园状态 */
    inparkStatus: [],
    /**是否已投产 */
    inProduction: [],
    /**场地类型 */
    landType: [],
    /**政策类型 */
    policyType: [],
    /**政策级别 */
    policyRank: [],
    /**政策附件类型 */
    policyFileType: [],
    /**知识产权类型 */
    propertyType: [],
    /**知识产权取得方式 */
    obtainMode: [],
    /**
     * 工程管理
     */
    // 工程类型
    ProjectType: [],
    // 施工进度
    construction: [],

    /**消息发布 */
    newsInfoType: [],
    /**综治管理 */
    //证件类型
    documentType: []
  },
  mutations: {
    ADD_TAB_VIEW(state, tab) {
      const isViewExist = state.tabList.some(item => item.url === tab.url);
      if (!isViewExist) {
        state.tabList.push(tab);
      }
    },
    CLOSE_TAB_VIEW(state, tab) {
      const isViewExist = state.tabList.some(item => item.url === tab.url);
      if (!isViewExist) {
        return;
      }
      let key = -1;
      for (let i in state.tabList) {
        if (state.tabList[i].url === tab.url) {
          key = i;
        }
      }
      state.tabList.splice(key, 1);
    },
    getDictionaryTypeOptions(state, data) {
      state.dictionaryTypeOptions = data;
    },
    getPositionList(state, data) {
      state.positionList = data;
    },
    getInformationTypeList(state, data) {
      state.informationTypeList = data;
    },
    getDepartmentList(state, data) {
      state.departmentList = data;
    },
    getReleaseStatus(state, data) {
      state.releaseStatus = data;
    },
    getIndustryType(state, data) {
      state.industryType = data;
    },
    getSettledType(state, data) {
      state.settledType = data;
    },
    getProductProgress(state, data) {
      state.productProgress = data;
    },
    getWhetherProduction(state, data) {
      state.whetherProduction = data;
    },
    getEnterpriseType(state, data) {
      state.enterpriseType = data;
    },
    getRenovationType(state, data) {
      state.renovationType = data;
    },
    getTenancyStatus(state, data) {
      state.tenancyStatus = data;
    },
    getInparkStatus(state, data) {
      state.inparkStatus = data;
    },
    getHindustryType(state, data) {
      state.hindustryType = data;
    },
    getGuishangType(state, data) {
      state.guishangType = data;
    },
    getInProduction(state, data) {
      state.inProduction = data;
    },
    getLandType(state, data) {
      state.landType = data;
    },
    getPolicyType(state, data) {
      state.policyType = data;
    },
    getPolicyRank(state, data) {
      state.policyRank = data;
    },
    getPolicyFileType(state, data) {
      state.policyFileType = data;
    },
    getProjectType(state, data) {
      state.ProjectType = data;
    },
    getPropertyType(state, data) {
      state.propertyType = data;
    },
    getObtainMode(state, data) {
      state.obtainMode = data;
    },
    getConstruCtione(state, data) {
      state.construction = data;
    },
    getNewsInfoType(state, data) {
      state.newsInfoType = data;
    },
    getDocumentType(state, data) {
      state.documentType = data;
    }
  },
  actions: {
    getDictionaryTypeOptions({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryAllDictTypes").then(res => {
            if (res.code === "1000000000") {
              commit("getDictionaryTypeOptions", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.dictionaryTypeOptions.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryAllDictTypes").then(res => {
              if (res.code === "1000000000") {
                commit("getDictionaryTypeOptions", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getPositionList({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/post").then(res => {
            if (res.code === "1000000000") {
              commit("getPositionList", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/post").then(res => {
              if (res.code === "1000000000") {
                commit("getPositionList", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getInformationTypeList({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet(
            "/system/dict/queryDictInfosBydictCode/information_type"
          ).then(res => {
            if (res.code === "1000000000") {
              commit("getInformationTypeList", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/information_type"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getInformationTypeList", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getDepartmentList({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/ucenter/dept/queryDepartmentTree").then(res => {
            if (res.code === "1000000000") {
              let list = multiarr(res.result);
              commit("getDepartmentList", list);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/ucenter/dept/queryDepartmentTree").then(res => {
              if (res.code === "1000000000") {
                let list = multiarr(res.result);
                commit("getDepartmentList", list);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getReleaseStatus({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/post_status").then(
            res => {
              if (res.code === "1000000000") {
                commit("getReleaseStatus", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/post_status").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getReleaseStatus", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getIndustryType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/industry_type").then(
            res => {
              if (res.code === "1000000000") {
                commit("getIndustryType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/industry_type").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getIndustryType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getSettledType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/intype").then(res => {
            if (res.code === "1000000000") {
              commit("getSettledType", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/intype").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getSettledType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getProductProgress({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet(
            "/system/dict/queryDictInfosBydictCode/product_schedule"
          ).then(res => {
            if (res.code === "1000000000") {
              commit("getProductProgress", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/product_schedule"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getProductProgress", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getWhetherProduction({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/in_production").then(
            res => {
              if (res.code === "1000000000") {
                commit("getWhetherProduction", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/in_production").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getWhetherProduction", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getEnterpriseType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/economic_type").then(
            res => {
              if (res.code === "1000000000") {
                commit("getEnterpriseType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/economic_type").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getEnterpriseType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getRenovationType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/housing_status").then(
            res => {
              if (res.code === "1000000000") {
                commit("getRenovationType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/housing_status"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getRenovationType", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getTenancyStatus({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/rental_status").then(
            res => {
              if (res.code === "1000000000") {
                commit("getTenancyStatus", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/rental_status").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getTenancyStatus", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getInparkStatus({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/inpark_type").then(
            res => {
              if (res.code === "1000000000") {
                commit("getInparkStatus", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/inpark_type").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getInparkStatus", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getHindustryType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/hangye_types").then(
            res => {
              if (res.code === "1000000000") {
                commit("getHindustryType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/hangye_types").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getHindustryType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getGuishangType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/guishang_types").then(
            res => {
              if (res.code === "1000000000") {
                commit("getGuishangType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/guishang_types"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getGuishangType", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getInProduction({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/in_production").then(
            res => {
              if (res.code === "1000000000") {
                commit("getInProduction", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/in_production").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getInProduction", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getLandType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/land_types").then(
            res => {
              if (res.code === "1000000000") {
                commit("getLandType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/land_types").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getLandType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getPolicyType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/policy_type").then(
            res => {
              if (res.code === "1000000000") {
                commit("getPolicyType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/policy_type").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getPolicyType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getPolicyRank({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/policy_rank").then(
            res => {
              if (res.code === "1000000000") {
                commit("getPolicyRank", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/policy_rank").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getPolicyRank", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getPolicyFileType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet(
            "/system/dict/queryDictInfosBydictCode/policy_file_type"
          ).then(res => {
            if (res.code === "1000000000") {
              commit("getPolicyFileType", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/policy_file_type"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getPolicyFileType", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getProjectType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet(
            "/system/dict/queryDictInfosBydictCode/engineering_type"
          ).then(res => {
            if (res.code === "1000000000") {
              commit("getProjectType", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/engineering_type"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getProjectType", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getPropertyType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/zhishi_type").then(
            res => {
              if (res.code === "1000000000") {
                commit("getPropertyType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/zhishi_type").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getPropertyType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getObtainMode({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/qude_type").then(
            res => {
              if (res.code === "1000000000") {
                commit("getObtainMode", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/qude_type").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getObtainMode", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getConstruCtione({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet(
            "/system/dict/queryDictInfosBydictCode/construction_progress"
          ).then(res => {
            if (res.code === "1000000000") {
              commit("getConstruCtione", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/construction_progress"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getConstruCtione", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getNewsInfoType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/news_info_type").then(
            res => {
              if (res.code === "1000000000") {
                commit("getNewsInfoType", res.result);
                resolve();
              } else {
                reject();
              }
            }
          );
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet(
              "/system/dict/queryDictInfosBydictCode/news_info_type"
            ).then(res => {
              if (res.code === "1000000000") {
                commit("getNewsInfoType", res.result);
                resolve();
              } else {
                reject();
              }
            });
          });
        } else {
          return Promise.resolve();
        }
      }
    },
    getDocumentType({ commit, state }, data) {
      if (data) {
        return new Promise((resolve, reject) => {
          httpGet("/system/dict/queryDictInfosBydictCode/id_type").then(res => {
            if (res.code === "1000000000") {
              commit("getDocumentType", res.result);
              resolve();
            } else {
              reject();
            }
          });
        });
      } else {
        if (state.positionList.length === 0) {
          return new Promise((resolve, reject) => {
            httpGet("/system/dict/queryDictInfosBydictCode/id_type").then(
              res => {
                if (res.code === "1000000000") {
                  commit("getDocumentType", res.result);
                  resolve();
                } else {
                  reject();
                }
              }
            );
          });
        } else {
          return Promise.resolve();
        }
      }
    }
  },
  modules: {}
});
function multiarr(obj) {
  let arr = [];
  for (let i = 0; i < obj.length; i++) {
    arr.push({ value: obj[i].code, name: obj[i].name });
    if (obj[i].childDepts.length > 0) {
      arr = arr.concat(multiarr(obj[i].childDepts));
    }
  }
  return arr;
}
