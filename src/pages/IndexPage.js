/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var CandidateStore = require("../stores/CandidateStore");
var CandidateActionCreators = require("../actions/CandidateActionCreators");

module.exports = React.createClass({
  displayName: "IndexPage",

  getInitialState () {
    return {
      candidates: CandidateStore.getAll()
    };
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {candidates} = state;
    var result = candidates.map((c) => {
      return <Link key={c.id} to="policies" params={{candidateId: c.id}}>
        <div className='index_button'>開始發問</div>
      </Link>
      ;
    });
    return <div id="content">
    <div className="page_wrapper index_section">
    <div className="wrapper">
            <div className="index_content md-whiteframe-z1">
            <div className="index_subsection">
                <div className="index_maintitle">
                   <h1>李前市長給問嗎？</h1>
                </div>
            </div>
            <div className="index_subsection">
                <div className="index_title">
                  <h2>92 歲高齡 VS. 92 年次首投族</h2>
                </div>
                <p>台北市長選舉在即，你/妳準備好要投給誰了嗎？沃草特別為大家邀請到「前」台北市長，也是前總統李登輝先生來接受網友們的提問挑戰！這是李登輝先生首次接受網路提問以及直播的邀約。兩個小時的問答，讓你/妳了解台北城發展的歷史脈絡以及李登輝先生經營城市的理念，也讓我們看看高齡九十一歲的李前總統如何應對新世代網友的提問挑戰！</p>
            </div>
            <div className="index_subsection">
                <div className="index_title">
                <h2>活動說明</h2>
                <h3 className="index_maintitle_sub">只有三天，把握發問機會！</h3>
                </div>
                <p>即日起，針對五大主題：「城市發展、市政經營、國家前途思維、領導能力、世代正義」，在網站上提出你的問題，直播節目中，將依照連署數多寡，來讓李登輝先生現場回答鄉民的挑戰！</p>
                <ul>
                  <li>提問時間：即日起～ 11/24 08:00</li>
                  <li>直播時間：11/26 19:00</li>
                  <li>直播連結：（即將公告）</li>
                </ul>
            </div>
            <div className="index_subsection">
                <div className="index_title">提問規範</div>
                <p>下列事項為本網站提問規範，若經網友檢舉並經管理員確認明顯符合者，將不經警告逕行刪文：</p>
                <ul>
                    <li>請勿發表廣告、商業宣傳或競選文案</li>
                    <li>請勿留下任何自己或他人之電話、聯絡方式等私人資訊</li>
                    <li>請勿發表涉及人身攻擊、謾罵、惡意攻訐與恐嚇等之言論</li>
                    <li>請勿詢問無關公共權益與社會議題之私人問題</li>
                    <li>請勿進行洗版與重複發問</li>
                    <li>請勿使用有關性別、民族、族群或國籍等歧視性用語</li>
                    <li><b>本次活動內容設定於市政討論、國家前途、理念等公眾或普遍議題。為使活動順利進行，請勿針對特定候選人的政見或私人狀態進行提問</b></li>
                </ul>
            </div>
            <div className="index_subsection">
                <div className="index_title">考前惡補</div>
                <p>一個好的提問至關重要！沒有頭緒？請看我們為你準備的<Link to="qa">發問指南</Link>。</p>
            </div>
        </div>
        <div className="l_center">
                {result}
        </div>

    </div>
    </div>

</div>
  }
});
