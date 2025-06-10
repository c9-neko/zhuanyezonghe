/*
 * @Description: 收货地址
 */
const carsouel = require('../models/carousel');
var multiparty = require("multiparty");
var fs = require('fs')
module.exports = {
  /**
   * 获取列表
   */
  getList: async (req, res, next) => {
    let result = await carsouel.getList();
    res.send({
      code: '001',
      data: result
    })
  },
  addImg: async (req, res, next) => {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './public/images' });
    form.parse(req, function(err, fields, files) {
        if (err) {
          res.send({
            code: '002',
            msg: '上传失败',
            data: err
          })
          return
        } else {
          const oldPath = files.file[0].path
          const newPath = `./public/images/${files.file[0].originalFilename}`
          fs.rename(oldPath, newPath, function(err) { // 重命名文件
            if(err){
              res.send({
                code: '002',
                msg: '上传失败',
                data: err
              })
              return
            } else {
              carsouel.addImg(newPath.replace(/^\.\//, ''), files.file[0].originalFilename) 
                .then(ress => {
                  if (ress.affectedRows === 1) {
                    res.send({
                      code: '001',
                      msg: '上传成功',
                      data: {
                        id: ress.insertId,
                        intro: files.file[0].originalFilename,
                        imgPath: newPath.replace(/^\.\//, '')
                      }
                    })
                    return;
                  } else {
                    res.send({
                      code: '002',
                      msg: '上传失败'
                    })
                    return
                  }
                })
            }
          });
        }
    });
  },
  deleteImg: async (req, res, next)=> {
    const { id } = req.body
    let result = await carsouel.deleteImg(id)
    if (result.affectedRows === 1) {
      res.send({
        code: '001',
        msg: '删除成功'
      })
      return;
    } else {
      res.send({
        code: '002',
        msg: '删除失败'
      })
      return
    }
  }
}