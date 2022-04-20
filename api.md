# #api接口表

## 1.登录相关

method：post

路径：/api/login

| 参数名 | 参数说明 | 数据类型 |
| ------ | -------- | -------- |
| name   | 账号     | string   |
| pwd    | 密码     | string   |
| type   | 用户类型 | string   |

## 2.获取用户个人信息

method:post,

url:/api/user_info

| 参数名 | 参数说明 | 数据类型 |
| ------ | -------- | -------- |
| id     | 账号     | string   |