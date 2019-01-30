// import axios from "axios";
import { axios } from "./baseConfig"; //这个现在有问题，返回不了 rep
let apiPath = "http://118.24.61.194:9501/api/";
// 登录
export function login(req, cb, errCb) {
  return axios({
    method: "post",
    url: apiPath + "user/login",
    data: req
  })
    .then((rep) => cb(rep))
    .catch((error) => errCb(error))
}

// 退出
export function singout(req, cb, errCb) {
  return axios({
    method:"delete",
    url: apiPath + "admin/singout",
    data:req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))}

//获取首页的订单和新增粉丝的数量
export function getFansOrders(req,cb,errCb) {
  return axios({
    method: "get",
    url: apiPath + "admin/getFansOrders",
    params:req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))}

 //获取最近7天的fans,order数据 
export function getLast7DayData(req,cb,errCb) {
  return axios({
    method:"get",
    url: apiPath + "admin/getLast7DayData",
    params:req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))
}

//获取全部粉丝
export function getFansList(req,cb,errCb) {
  return axios({
    method:"get",
    url: apiPath + "admin/getFansList",
    params:req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))
}

//获取全部粉丝
export function getMaterialList(req,cb,errCb) {
  return axios({
    method:"get",
    url: apiPath + "admin/getMaterialList",
    params:req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))
}

//添加问题及答案
export function questions(req,cb,errCb) {
  return axios({
    method:"post",
    url: apiPath + "admin/postQuestions",
    params:req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))
}

//是否已经设置了打卡天数
export function isExistsDakaDay(req,cb,errCb) {
  return axios({
    method:"get",
    url: apiPath + "admin/isExistsDakaDay",
    params:req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))
}

//打卡设置
export function dakaSet(req,cb,errCb) {
  return axios({
    method:"post",
    url: apiPath + "admin/dakaSet",
    data: req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))
}

//获取打卡设置列表
export function getDakaList(req,cb,errCb) {
  return axios({
    method:"get",
    url: apiPath + "admin/getDakaList",
    params: req
  }).then((rep) => cb(rep)).catch((error) => errCb(error))
}

