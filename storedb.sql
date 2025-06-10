/*
Navicat MySQL Data Transfer

Source Server         : mydb
Source Server Version : 80200
Source Host           : localhost:3306
Source Database       : storedb

Target Server Type    : MYSQL
Target Server Version : 80200
File Encoding         : 65001

Date: 2024-06-15 11:20:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phoneNum` varchar(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('2', '小猪', '13214567845', '广西南宁', '1');
INSERT INTO `address` VALUES ('3', '大黄', '12312312312', '广东佛山', '2');
INSERT INTO `address` VALUES ('4', '小筑', '13215673457', '浙江杭州', '6');
INSERT INTO `address` VALUES ('5', '张鑫', '14315634578', '湖北武汉', '5');
INSERT INTO `address` VALUES ('6', '李华', '15312563478', '四川成都', '3');
INSERT INTO `address` VALUES ('7', '小宇', '18142614032', '广东佛山', '2');
INSERT INTO `address` VALUES ('8', '明涛', '18142614032', '广西桂林', '7');
INSERT INTO `address` VALUES ('9', '竹溪', '18163839381', '浙江温州', '7');
INSERT INTO `address` VALUES ('10', '希蒙', '13214254678', '广东广州', '4');
INSERT INTO `address` VALUES ('11', '哈温', '13214231567', '广东广州', '9');
INSERT INTO `address` VALUES ('12', '李新', '13214562345', '浙江杭州', '8');

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel` (
  `carousel_id` int NOT NULL AUTO_INCREMENT,
  `imgPath` char(50) NOT NULL,
  `describes` char(50) NOT NULL,
  PRIMARY KEY (`carousel_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES ('8', 'public/images/ban1.jpg', 'ban1.jpg');
INSERT INTO `carousel` VALUES ('9', 'public/images/ba1.jpg', 'ba1.jpg');
INSERT INTO `carousel` VALUES ('10', 'public/images/ban2.jpg', 'ban2.jpg');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` char(20) NOT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '零食');
INSERT INTO `category` VALUES ('2', '美妆');
INSERT INTO `category` VALUES ('3', '酒水');
INSERT INTO `category` VALUES ('4', '生活用品');
INSERT INTO `category` VALUES ('5', '服装');
INSERT INTO `category` VALUES ('6', '书籍');
INSERT INTO `category` VALUES ('7', '充电器');
INSERT INTO `category` VALUES ('8', '充电宝');

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `collect_time` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_collect_user_id` (`user_id`) USING BTREE,
  KEY `FK_collect_id` (`product_id`) USING BTREE,
  CONSTRAINT `FK_collect_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_collect_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES ('1', '4', '1', '1717988524506');
INSERT INTO `collect` VALUES ('2', '4', '116', '1717990132717');
INSERT INTO `collect` VALUES ('3', '4', '118', '1717990141808');
INSERT INTO `collect` VALUES ('4', '4', '123', '1717990666024');
INSERT INTO `collect` VALUES ('5', '4', '129', '1717990677066');
INSERT INTO `collect` VALUES ('6', '4', '121', '1717990688771');
INSERT INTO `collect` VALUES ('7', '4', '119', '1717990700770');
INSERT INTO `collect` VALUES ('8', '4', '122', '1717990723914');
INSERT INTO `collect` VALUES ('9', '9', '1', '1718417395832');
INSERT INTO `collect` VALUES ('10', '9', '122', '1718417405367');
INSERT INTO `collect` VALUES ('11', '9', '129', '1718417410711');
INSERT INTO `collect` VALUES ('12', '9', '123', '1718419839580');
INSERT INTO `collect` VALUES ('13', '9', '121', '1718419847514');

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `content` varchar(500) NOT NULL,
  `createTime` datetime NOT NULL,
  `answer` varchar(500) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `answerTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES ('1', '保质期', '都是近期生产的？', '2024-05-01 19:20:09', '近期的', '1', '2024-05-02 19:20:09');
INSERT INTO `messages` VALUES ('2', '新品', '有新品吗', '2024-03-29 22:49:31', '有新品会通知', '1', '2024-03-29 23:20:09');
INSERT INTO `messages` VALUES ('3', '打折', '什么时候会有打折时间？', '2024-04-08 10:44:24', '敬请期待618', '7', '2024-04-08 11:44:24');
INSERT INTO `messages` VALUES ('4', '零食', '很好吃，优惠', '2024-06-10 11:36:22', '感谢评价', '4', '2024-06-10 12:36:22');
INSERT INTO `messages` VALUES ('5', '服务', '服务很好，很到位', '2024-06-10 11:36:43', '这是应该的', '4', '2024-06-10 12:36:43');
INSERT INTO `messages` VALUES ('6', '零食', '很好吃', '2024-06-10 11:29:41', '感谢你的评价', '4', '2024-06-10 12:29:41');
INSERT INTO `messages` VALUES ('7', '零食', '便宜优惠', '2024-06-10 11:29:52', '没错', '4', '2024-06-10 12:29:52');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_num` int NOT NULL,
  `product_price` double NOT NULL,
  `order_time` bigint NOT NULL,
  `status` varchar(4) NOT NULL COMMENT '1:未发货， 2：已发货， 3：客户申请退款， 4：订单关闭， 5：交易完成',
  `addressId` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_order_user_id` (`user_id`) USING BTREE,
  KEY `FK_order_id` (`product_id`) USING BTREE,
  CONSTRAINT `FK_order_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_order_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '41717989663636', '4', '115', '1', '59.9', '1717989663636', '2', '10');
INSERT INTO `orders` VALUES ('2', '91718417450732', '9', '129', '1', '220', '1718417450732', '1', '11');
INSERT INTO `orders` VALUES ('3', '81718419092062', '8', '1', '2', '79.9', '1718419092062', '1', '12');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` char(100) NOT NULL,
  `category_id` int NOT NULL,
  `product_title` char(30) NOT NULL,
  `product_intro` text NOT NULL,
  `product_picture` char(200) DEFAULT NULL,
  `product_price` double NOT NULL,
  `product_selling_price` double NOT NULL,
  `product_num` int NOT NULL,
  `product_sales` int NOT NULL,
  PRIMARY KEY (`product_id`) USING BTREE,
  KEY `FK_product_category` (`category_id`) USING BTREE,
  CONSTRAINT `FK_product_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '麦提莎麦丽素', '1', '麦芽脆夹心原味巧克力球520g桶网红小零食品糖果', '澳洲原产丝滑香脆，0反式脂肪酸 轻巧无负担', 'public/images/德芙麦丽素.jpg', '209.9', '79.9', '1000', '0');
INSERT INTO `product` VALUES ('115', '百诺麦丽素', '1', '百诺麦丽素桶装520g麦粒酥脆夹心纯牛奶黑巧克力', '西非进口可可豆 精炼去酸 家庭装', 'public/images/百诺麦丽素.jpg', '69.9', '59.9', '1000', '0');
INSERT INTO `product` VALUES ('116', '轩妈家蛋黄酥', '1', '轩妈家蛋黄酥6枚 红豆味雪媚娘糕点', '连续两年荣获2项国际美食大奖', 'public/images/蛋黄酥.jpg', '45', '39', '1000', '0');
INSERT INTO `product` VALUES ('117', '三味奇蛋黄酥', '1', '三味奇蛋黄酥', '三味奇蛋黄酥', 'public/images/蛋黄酥2.jpg', '45', '30', '10000', '0');
INSERT INTO `product` VALUES ('118', 'DOVE黑巧克力', '1', 'DOVE黑巧克力', 'DOVE黑巧克力', 'public/images/德芙巧克力.jpg', '45', '20', '500', '0');
INSERT INTO `product` VALUES ('119', '阿尔卑斯棒棒糖', '1', '童年棒棒糖', '棒棒糖', 'public/images/棒棒糖.jpg', '20', '9.9', '100', '0');
INSERT INTO `product` VALUES ('120', '曲奇', '1', '三味奇曲奇', '撞浆曲奇', 'public/images/饼干.jpg', '20', '8', '50', '0');
INSERT INTO `product` VALUES ('121', 'MAC/魅可限定套装礼盒', '2', 'MAC/魅可限定口红唇膏高光眼影面部彩妆套装礼盒', '【抢先加购】双十二前2点享伸缩唇刷+试色卡', 'public/images/MAC套装.jpg', '795', '795', '1000', '0');
INSERT INTO `product` VALUES ('122', 'BB霜', '2', 'BB霜遮瑕膏', '欧莱雅', 'public/images/BB霜.jpg', '299', '245', '1000', '0');
INSERT INTO `product` VALUES ('123', 'MAC唇釉', '2', 'MAC抢先购唇釉', '棒棒糖唇釉', 'public/images/口红7.jpg', '300', '200', '500', '0');
INSERT INTO `product` VALUES ('124', 'YSL口红', '2', 'YSL口红', '口红', 'public/images/口红1.jpg', '400', '355', '100', '0');
INSERT INTO `product` VALUES ('125', '阿玛尼套盒', '2', '阿玛尼化妆套盒', '阿玛尼气垫+唇釉', 'public/images/口红9.jpg', '6000', '2000', '100000', '0');
INSERT INTO `product` VALUES ('126', '口红套盒', '4', '口红', '套盒', 'public/images/口红4.jpg', '20000', '2000', '200', '0');
INSERT INTO `product` VALUES ('127', 'KIKO口红', '2', 'KIKO口红', '持妆一整天', 'public/images/口红8.jpg', '300', '100', '20000', '0');
INSERT INTO `product` VALUES ('128', '白鸭绒宽松羽绒服', '5', 'Vero Moda2020春夏新款双面穿白鸭绒宽松羽绒服', '双面可穿，70%白鸭绒，宽松中长款', 'public/images/woman.jpg', '1299', '1169', '2000', '0');
INSERT INTO `product` VALUES ('129', '半臂蕾丝上衣', '5', '梅子熟了.汉 原创设计交领系带改良半臂蕾丝上衣国风下裙女秋冬', '海量新品 潮流穿搭 玩趣互动', 'public/images/女.jpg', '239', '220', '1000', '0');
INSERT INTO `product` VALUES ('130', 'ONLY女装', '5', 'ONLY女装', 'ONLY品牌', 'public/images/上装1.jpg', '200', '122.59', '1000', '0');
INSERT INTO `product` VALUES ('131', '斯凯奇女上衣', '5', '斯凯奇女衣', '斯凯奇', 'public/images/女装4.jpg', '300', '179', '10000', '0');
INSERT INTO `product` VALUES ('132', 'HOTWIND女装', '5', '女装', 'HOTWIND', 'public/images/女装5.jpg', '200', '108.8', '1000', '0');
INSERT INTO `product` VALUES ('133', '个性古着毛毛外套女秋冬', '5', '东日是个卷毛 个性古着毛毛外套女秋冬新款', '女秋冬新款宽松V领复古港味上衣', 'public/images/上衣.jpg', '199', '119', '1000', '0');
INSERT INTO `product` VALUES ('134', '大翻领羊羔毛外套女冬', '5', '短款小个子羊剪绒颗粒绒毛绒棉衣毛茸茸上衣', '小个子羊剪绒颗粒绒毛绒棉衣毛茸茸上衣', 'public/images/上衣女.jpg', '159', '155', '1000', '0');

-- ----------------------------
-- Table structure for product_picture
-- ----------------------------
DROP TABLE IF EXISTS `product_picture`;
CREATE TABLE `product_picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_picture` char(200) DEFAULT NULL,
  `intro` text,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_product_id` (`product_id`) USING BTREE,
  CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product_picture
-- ----------------------------
INSERT INTO `product_picture` VALUES ('3', '116', 'public/images/蛋黄酥.jpg', null);
INSERT INTO `product_picture` VALUES ('11', '115', 'public/images/百诺麦丽素.jpg', null);
INSERT INTO `product_picture` VALUES ('12', '1', 'public/images/德芙麦丽素.jpg', null);
INSERT INTO `product_picture` VALUES ('18', '117', 'public/images/蛋黄酥2.jpg', null);
INSERT INTO `product_picture` VALUES ('19', '118', 'public/images/德芙巧克力.jpg', null);
INSERT INTO `product_picture` VALUES ('20', '119', 'public/images/棒棒糖.jpg', null);
INSERT INTO `product_picture` VALUES ('21', '120', 'public/images/饼干.jpg', null);
INSERT INTO `product_picture` VALUES ('22', '121', 'public/images/MAC套装.jpg', null);
INSERT INTO `product_picture` VALUES ('23', '122', 'public/images/BB霜.jpg', null);
INSERT INTO `product_picture` VALUES ('24', '123', 'public/images/口红7.jpg', null);
INSERT INTO `product_picture` VALUES ('25', '124', 'public/images/口红1.jpg', null);
INSERT INTO `product_picture` VALUES ('26', '125', 'public/images/口红9.jpg', null);
INSERT INTO `product_picture` VALUES ('27', '126', 'public/images/口红4.jpg', null);
INSERT INTO `product_picture` VALUES ('28', '127', 'public/images/口红8.jpg', null);
INSERT INTO `product_picture` VALUES ('29', '128', 'public/images/woman.jpg', null);
INSERT INTO `product_picture` VALUES ('30', '129', 'public/images/女.jpg', null);
INSERT INTO `product_picture` VALUES ('31', '130', 'public/images/上装1.jpg', null);
INSERT INTO `product_picture` VALUES ('32', '131', 'public/images/女装4.jpg', null);
INSERT INTO `product_picture` VALUES ('33', '132', 'public/images/女装5.jpg', null);
INSERT INTO `product_picture` VALUES ('34', '133', 'public/images/上衣.jpg', null);
INSERT INTO `product_picture` VALUES ('35', '134', 'public/images/上衣女.jpg', null);

-- ----------------------------
-- Table structure for shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `num` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_user_id` (`user_id`) USING BTREE,
  KEY `FK_shoppingCart_id` (`product_id`) USING BTREE,
  CONSTRAINT `FK_shoppingCart_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of shoppingcart
-- ----------------------------
INSERT INTO `shoppingcart` VALUES ('1', '4', '1', '1');
INSERT INTO `shoppingcart` VALUES ('3', '4', '116', '1');
INSERT INTO `shoppingcart` VALUES ('4', '4', '118', '1');
INSERT INTO `shoppingcart` VALUES ('6', '9', '1', '1');
INSERT INTO `shoppingcart` VALUES ('8', '9', '122', '1');
INSERT INTO `shoppingcart` VALUES ('10', '8', '1', '1');
INSERT INTO `shoppingcart` VALUES ('11', '8', '115', '1');
INSERT INTO `shoppingcart` VALUES ('12', '9', '120', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `userName` char(40) NOT NULL,
  `password` char(40) NOT NULL,
  `userPhoneNumber` char(11) DEFAULT NULL,
  `roleType` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `userName` (`userName`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('4', 'user2', 'q123456', '13214325167', 'user', 'etahgd@qq.com');
INSERT INTO `users` VALUES ('5', 'admin', 'q123456', '12123123132', 'admin', 'hyingy@qq.com');
INSERT INTO `users` VALUES ('6', 'user4', 'q123456', '18731209050', 'user', 'mingzhu@qq.com');
INSERT INTO `users` VALUES ('7', 'user5', 'a123456', '17564335678', 'user', 'xioazhu@qq.com');
INSERT INTO `users` VALUES ('8', 'user1', 'q123456', '14312314324', 'user', 'xiangyu@qq.com');
INSERT INTO `users` VALUES ('9', 'user7', 'q123456', '13214231567', 'user', 'weilai@qq.com');
