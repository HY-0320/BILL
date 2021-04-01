import axios from 'axios';


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = "/api"


// 用户注册
export const userRegister = params => {
  return axios.post("/user/register", params).then(res => res.data)
}
// 用户登录
export const userLogin = params => {
  return axios.post("/user/login", params).then(res => res.data)
}
//获取用户信息
export const getUser = params => {
  return axios.get("/user", params).then(res => res.data)
}
//修改用户信息
export const changeUser = params => {
  return axios.put("/user", params).then(res => res.data)
}
//记账
export const notes = params => {
  return axios.post("/bill", params).then(res => res.data)
}
//添加记账品类/category/
export const addCategory = params => {
  return axios.post("category", params).then(res => res.data)
}
//获取支出账目品类列表
export const getExpenses = params => {
  return axios.get("/category/expenses", params).then(res => res.data)
}
//获取收入账目品类列表
export const getIncomes = params => {
  return axios.get("category/incomes", params).then(res => res.data)
}
//获取全部记账
export const getAll = params => {
  return axios.get("/bill", params).then(res => res.data)
}
//获取用户某日账单，参数为某天，为空代表是今天
export const getAllBillByDay = params => {
  return axios.get("/bill/day?time=" + params).then(res => res.data)
}
// 删除账单
export const deleteBill = params => {
  return axios.delete("/bill/" + params).then(res => res.data)
}
// 获取用户第一条记录的月份
export const getFirstTime = params => {
  return axios.get("/bill/firstTime").then(res => res.data)
}
// 获取用户某月的总账单
export const getBillListByMonth = params => {
  return axios.get("/bill/sum/time/month?time=" + params).then(res => res.data)
}