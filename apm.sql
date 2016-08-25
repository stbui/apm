/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : apm

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2016-08-25 18:29:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for appajax
-- ----------------------------
DROP TABLE IF EXISTS `appajax`;
CREATE TABLE `appajax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `apiKey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for apperror
-- ----------------------------
DROP TABLE IF EXISTS `apperror`;
CREATE TABLE `apperror` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectRoot` varchar(255) DEFAULT NULL,
  `context` varchar(255) DEFAULT NULL,
  `metaData[script][src]` varchar(255) DEFAULT NULL,
  `metaDate[script][content]` datetime DEFAULT NULL,
  `releaseStage` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `sevrity` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `stacktrace` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `lineNumber` int(11) DEFAULT NULL,
  `columnNumber` int(11) DEFAULT NULL,
  `payloadVersion` varchar(255) DEFAULT NULL,
  `ct` varchar(255) DEFAULT NULL,
  `cb` varchar(255) DEFAULT NULL,
  `apiKey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=164 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for appinfo
-- ----------------------------
DROP TABLE IF EXISTS `appinfo`;
CREATE TABLE `appinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `apiKey` varchar(255) DEFAULT NULL,
  `createTime` varchar(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for apppef
-- ----------------------------
DROP TABLE IF EXISTS `apppef`;
CREATE TABLE `apppef` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `pageloadtime` float(255,0) DEFAULT NULL,
  `total_time` float DEFAULT NULL,
  `ttfb` float(255,0) DEFAULT NULL,
  `connect` float(255,0) DEFAULT NULL,
  `dom` float(255,0) DEFAULT NULL,
  `request` float(255,0) DEFAULT NULL,
  `response` float(255,0) DEFAULT NULL,
  `domReady` float(255,0) DEFAULT NULL,
  `load` float(255,0) DEFAULT NULL,
  `tcp` float(255,0) DEFAULT NULL,
  `dns` float(255,0) DEFAULT NULL,
  `black_waiting_time` float DEFAULT NULL,
  `fist_page_time` float DEFAULT NULL,
  `operation_time` float DEFAULT NULL,
  `last_unload` float(255,0) DEFAULT NULL,
  `redirect` float(255,0) DEFAULT NULL,
  `cb` varchar(255) DEFAULT NULL,
  `ct` varchar(255) DEFAULT NULL,
  `apiKey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=492 DEFAULT CHARSET=gbk;
