/*
 * @Description: 我的收藏模块路由
 */
var express = require('express');
var messageRouter = express.Router();
const messageController = require('../../controllers/messageController')

messageRouter
  .post('/message/addMessage', messageController.addMessage)
  .post('/message/getSelfList', messageController.getSelfList)
  .post('/message/delete', messageController._delete)
  .post('/message/answer', messageController.answer)
  .post('/message/update', messageController.update)
  .post('/message/getAdminList', messageController.getAdminList)

module.exports = messageRouter;