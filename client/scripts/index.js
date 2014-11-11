/** @jsx React.DOM */
"use strict";
require("../styles/doc.css");
require("../styles/font-awesome.min.css");
require("../styles/style.css");
var React = require('react/addons');

var {App} = require('../../src');

var questions = {
    questions: [ {
      title: "【垃圾減量】您如何減少夜市、攤販之塑膠袋、免洗餐具等一次性產品的使用?",
      description: "台北市平均一年製造超過六十萬公噸之垃圾，其中，夜市、攤販所使用之塑膠袋、免洗餐具、飲料杯等一次性產品是很大的垃圾來源。如此不但得耗費大量資源處理、焚燒垃圾，所產生之污染更是嚴重影響市民健康。 想請問市長候選人，你們會如何減少台北市垃圾量?有什麼具體方法降低這些一次性產品的使用?",
      createdAt: 1414735802224,
      candidateList: [{
        candidateId: 6,
        candidateName: '連勝文',
        candidateImage: 'http://taipei.wethepeople.tw/images/candidates_avatar/-JFuCKMKOH_eCspPxRe1.jpg'
        }],
      count: 231
    },
    {
      title: "台灣是全世界唯一一個在校園午餐中大量\"餵食\"學童基改飼料級黃豆食品的國家，請問您當選後，願意推動\"基改食品退出校園\"嗎？",
      description: "飼料油事件引發人民憤而抵制。而飼料級黃豆製品充斥市面大量供人食用，已是台灣的世界級醜聞，全世界僅有台灣將農藥殘留嚴重的基改黃豆當成常民食品大量吃下肚，每餐出現在孩子的校園午餐，讓我們下一代比基因改造食品實驗室裡的白老鼠處境更悲慘。十數年來，已有許多科學研究指出，長期食用基改食品與許多疾病，如癌症、過敏、不孕、肝腎病變等發生有密切相關。以歐盟為例，對於基改食品禁止種植、輸入和標示等規範相當嚴格，基改黃豆和玉米連當作飼料都引發民眾物議，更絕對不可能做成午餐大量餵食給孩子們吃。\n\n一群來自北中南各地家長為了孩子在校的飲食健康，發起「你推校園搞非基，家長選票投給你」的串連行動，請問市長參選人，能否為了下一代囝仔的健康，承諾上任後儘速推動基因改造食品全面退出校園，規範校園午餐禁用基改食品，讓師生們避免基改食品的風險與危害？",
      createdAt: 1414735802224,
      candidateList: [ {
        candidateId: 6,
        candidateName: '連勝文',
        candidateImage: 'http://taipei.wethepeople.tw/images/candidates_avatar/-JFuCKMKOH_eCspPxRe1.jpg'
        },
        {
        candidateId: 2,
        candidateName: '柯文哲',
        candidateImage: 'http://taipei.wethepeople.tw/images/candidates_avatar/-JFuCJcAoUNFQY9NEHZ4.jpg'
        }],
      count: 422
    }
    ]
  };

React.renderComponent(
  <App />,
  document.getElementById("react-root")
);
