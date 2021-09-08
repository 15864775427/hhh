const Login = () => import("../views/login/login.vue");
const Index = () => import("../views/index/index.vue");
const Department = () => import("../views/system/department/department.vue");
const User = () => import("../views/system/user/user.vue");
const Role = () => import("../views/system/role/role.vue");
const Parameter = () => import("../views/system/parameter/parameter.vue");
const Dicttype = () => import("../views/system/dicttype/dicttype.vue");
const Dictvalue = () => import("../views/system/dictvalue/dictvalue.vue");
const Menu = () => import("../views/system/menu/menu.vue");
const Log = () => import("../views/system/log/log.vue");
const Onlineuser = () => import("../views/system/onlineuser/onlineuser.vue");
const Loginlog = () => import("../views/system/loginlog/loginlog.vue");
const PublicityInformationRelease = () =>
  import(
    "../views/merchants/publicityInformationRelease/publicityInformationRelease.vue"
  );
const TargetEnterprise = () =>
  import("../views/merchants/targetEnterprise/targetEnterprise.vue");
const EnterpriseEnter = () =>
  import("../views/merchants/enterpriseEnter/enterpriseEnter.vue");
const SpaceDisplay = () =>
  import("../views/merchants/spaceDisplay/spaceDisplay.vue");
const Economic = () =>
  import("../views/businessadministration/economic/economic.vue");
const Enterprise = () =>
  import("../views/businessadministration/enterprise/enterprise.vue");

const Guidance = () =>
  import("../views/businessadministration/guidance/guidance.vue");
const Administrative = () =>
  import("../views/businessadministration/administrative/administrative.vue");

const Qualification = () =>
  import("../views/businessadministration/qualification/qualification.vue");

const MedicalConsultation = () =>
  import("../views/merchants/medicalConsultation/medicalConsultation.vue");
const IncubatorManage = () =>
  import("../views/businessadministration/incubatorManage/incubatorManage.vue");
const EnterpriseService = () =>
  import(
    "../views/businessadministration/enterpriseService/enterpriseService.vue"
  );
const PolicyServices = () =>
  import("../views/businessadministration/policyServices/policyServices.vue");
const EngineerMessage = () =>
  import("../views/engineerAdmin/engineerMessage/engineerMessage.vue");
const ConferenceRoomManagement = () =>
  import(
    "../views/administration/conferenceRoomManagement/conferenceRoomManagement.vue"
  );
const MaterialLendingManagement = () =>
  import(
    "../views/administration/materialLendingManagement/materialLendingManagement.vue"
  );
const ProjectContract = () =>
  import("../views/engineerAdmin/projectContract/projectContract.vue");
const SlabEngineering = () =>
  import("../views/engineerAdmin/slabEngineering/slabEngineering.vue");
const SafetyConstruction = () =>
  import("../views/engineerAdmin/safetyConstruction/safetyConstruction.vue");
const Analysis = () =>
  import("../views/businessadministration/analysis/analysis.vue");
const News = () =>
  import("../views/news/news.vue");
const ActualPopulation = () =>
  import("../views/comprehensive/actualPopulation/actualPopulation.vue");
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Index",
    component: Index,
    // redirect: "/system/department",
    children: [
      {
        path: "/news",
        name: "News",
        component: News
      },
      {
        path: "/system/department",
        name: "Department",
        component: Department
      },
      {
        path: "/system/user",
        name: "User",
        component: User
      },
      {
        path: "/system/role",
        name: "Role",
        component: Role
      },
      {
        path: "/system/parameter",
        name: "Parameter",
        component: Parameter
      },
      {
        path: "/system/dicttype",
        name: "Dicttype",
        component: Dicttype
      },
      {
        path: "/system/dictvalue",
        name: "Dictvalue",
        component: Dictvalue
      },
      {
        path: "/system/menu",
        name: "Menu",
        component: Menu
      },
      {
        path: "/system/log",
        name: "Log",
        component: Log
      },
      {
        path: "/system/dictvalue",
        name: "Dictvalue",
        component: Dictvalue
      },
      {
        path: "/system/dicttype",
        name: "Dicttype",
        component: Dicttype
      },
      {
        path: "/system/onlineuser",
        name: "Onlineuser",
        component: Onlineuser
      },
      {
        path: "/system/loginlog",
        name: "Loginlog",
        component: Loginlog
      },
      {
        path: "/merchants/publicityInformationRelease",
        name: "PublicityInformationRelease",
        component: PublicityInformationRelease
      },
      {
        path: "/merchants/targetEnterprise",
        name: "TargetEnterprise",
        component: TargetEnterprise
      },
      {
        path: "/merchants/enterpriseEnter",
        name: "EnterpriseEnter",
        component: EnterpriseEnter
      },
      {
        path: "/merchants/spaceDisplay",
        name: "SpaceDisplay",
        component: SpaceDisplay
      },
      {
        path: "/businessadministration/economic",
        name: "Economic",
        component: Economic
      },
      {
        path: "/merchants/medicalConsultation",
        name: "MedicalConsultation",
        component: MedicalConsultation
      },
      {
        path: "/businessadministration/enterprise",
        name: "Enterprise",
        component: Enterprise
      },
      {
        path: "/businessadministration/incubatorManage",
        name: "IncubatorManage",
        component: IncubatorManage
      },
      {
        path: "/businessadministration/guidance",
        name: "Guidance",
        component: Guidance
      },
      {
        path: "/businessadministration/administrative",
        name: "Administrative",
        component: Administrative
      },
      {
        path: "/businessadministration/qualification",
        name: "Qualification",
        component: Qualification
      },
      {
        path: "/businessadministration/nnterpriseService",
        name: "EnterpriseService",
        component: EnterpriseService
      },
      {
        path: "/businessadministration/analysis",
        name: "Analysis",
        component: Analysis
      },
      {
        path: "/engineerAdmin/engineerMessage",
        name: "EngineerMessage",
        component: EngineerMessage
      },
      {
        path: "/administration/conferenceRoomManagement",
        name: "ConferenceRoomManagement",
        component: ConferenceRoomManagement
      },
      {
        path: "/administration/materialLendingManagement",
        name: "MaterialLendingManagement",
        component: MaterialLendingManagement
      },
      {
        path: "/policyServices/policyServices",
        name: "PolicyServices",
        component: PolicyServices
      },
      {
        path: "/engineerAdmin/projectContract",
        name: "ProjectContract",
        component: ProjectContract
      },
      {
        path: "/engineerAdmin/slabEngineering",
        name: "SlabEngineering",
        component: SlabEngineering
      },
      {
        path: "/engineerAdmin/safetyConstruction",
        name: "SafetyConstruction",
        component: SafetyConstruction
      },
      {
        path: "/comprehensive/actualPopulation",
        name: "ActualPopulation",
        component: ActualPopulation
      }
    ]
  }
];
export default routes;
