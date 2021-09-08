// 年龄校验
var validateAge = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (!/(^[1-9]\d*$)/.test(value)) {
      callback(new Error("请输入正整数"));
    } else {
      callback();
    }
  }
};
const check = {
  address: [{ required: true, message: "请填写住址", trigger: "blur" }],
  age: [{ validator: validateAge, trigger: "change" }],
  birthday: [{ required: true, message: "请填写出生年日期", trigger: "blur" }],
  name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
  phonenumber: [{ required: true, message: "请填写手机号", trigger: "blur" }],
  post: [{ required: true, message: "请填写职位", trigger: "blur" }],
  sex: [{ required: true, message: "请填写性别", trigger: "blur" }],
  userName: [{ required: true, message: "请填写用户名", trigger: "blur" }]
};
export default check;
