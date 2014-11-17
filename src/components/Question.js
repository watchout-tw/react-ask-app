/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var {Link} = require("react-router");
var QuestionActionCreators = require("../actions/QuestionActionCreators");
var AppActionCreators = require("../actions/AppActionCreators");
var UserStore = require("../stores/UserStore");
var PolicyStore = require("../stores/PolicyStore");
var QuestionStore = require("../stores/QuestionStore");
var Button = require("./Button");
var moment = require("moment");

module.exports = React.createClass({
  displayName: "Question",

  getInitialState () {
    var {cid, pid } = this.props;
    var {policy} = PolicyStore.get({
        cid: cid,
        index: pid
      });
    return {
      loggedIn: this.props.loggedIn,
      count: this.props.question.signatures.length,
      policy: policy,
      hideSignButton: false,
      hideContent: !this.props.selected
    };
  },

  shouldComponentUpdate (nextProps, nextState) {
    return (JSON.stringify(nextState) !== JSON.stringify(this.state));
  },

  componentDidMount () {
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillReceiveProps (nextProps) {
    var {selected, question} = nextProps;
    this.setState({
      hideContent: !selected,
    });
  },

  componentWillUnmount () {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render () {
    return this._render(this.props, this.state);
  },

  _onChange () {
    var {cid, pid, qid} = this.props;
    var question = QuestionStore.get({
      cid: cid,
      pid: pid,
      qid: qid
    });
    this.setState({ count: question.signatures.length });
  },

  _handleSignClick (event) {
    if (!this.state.loggedIn) {
      AppActionCreators.notify('請先登入，才能連署');
      return;
    }
    var {cid, pid, qid} = this.props;
    var user = UserStore.get();
    QuestionActionCreators.signQuestion({
      cid: cid,
      pid: pid,
      id: qid,
      signer: user
    });
    this.setState({
      hideSignButton: true
    });
  },

  _handleShare () {
    var {cid, pid, qid, question} = this.props;
    var user = UserStore.get();
    var name = (user.name)? user.name : '我';

    if (name[name.length-1].match(/[a-zA-Z]/)) {
      name += ' ';
    }

    if(FB) {
      var link = location.origin + '/candidates/' + cid + '/policies/' + pid + '?qid=' + qid;
      FB.ui({
        method: 'feed',
        name: question.title,
        link: link,
        picture: 'http://2014final.wethepeople.tw/assets/images/fb_img.jpg',
        caption: name + '在市長給問嗎！最後一役',
        description: question.content
      });
    }
  },

  _render (props, state) {
    var {index, question} = props;
    var {count} = state;
    var {title, content, author, createdAt, signatures} = question;
    var user = UserStore.get();

    var signButton = (state.hideSignButton)? (<Button className='signed' name='已連署' icon='fa-bullhorn' />) : ( <Button className='sign' name='連署' icon='fa-bullhorn' _handleClick={this._handleSignClick} />);
    var signClass = 'q_function_unsigned';

    signatures.map((s) => {
      if (user.id === s) {
        signButton = <Button className='signed' name='已連署' icon='fa-bullhorn' />;
        signClass = 'q_function_signed';
      }
    });

    if (!props.status) {
      signButton = '';
    }

    var formatedDate = new moment(createdAt).fromNow();

    var formatedContent = (state.hideContent)? '': <div className='q_content'>
        <p className='q_text'>{content}</p>
        <div className='q_postmeta'>
        <img src={author.avatar} className='q_author_img' />
          <div className='q_author_meta'>{'提問人：' + author.name }</div>
          <div className='q_time_meta'>{'提問時間：' + formatedDate }</div>
        </div>
        <div className='q_action'>
          {signButton}{ ' '}
          <Button className='facebook' name='分享' icon='fa-facebook' _handleClick={this._handleShare}/>
        </div>
      </div>;

    var itemClass = (state.hideContent)? 'q_item md-whiteframe-z1' : 'q_item md-whiteframe-z1 q_item_active';
    var titleClass = (state.hideContent)? 'q_title l_inline' : 'q_title l_inline q_title_active';
    var toggleIcon = (state.hideContent)? 'fa fa-angle-double-down': 'fa fa-angle-double-up';

    console.log(state.policy);
    return <div className={itemClass}>
      <div className={titleClass} onClick={props._handleClick}>
        <div className='q_order l_inline'>{index + 1}</div>
        <div className='q_vote l_inline'>{count}</div>
        {title}
        <div className='q_function l_inline'>
          {'　'}<span><i className={toggleIcon}></i></span>
        </div>
        <span className={"q_function_sign " + signClass } >
          <i className="fa fa-bullhorn"></i>
        </span>
      </div>
      {formatedContent}
    </div>;

  }
});
