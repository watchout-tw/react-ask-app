/** @jsx React.DOM */
"use strict";
var React = require("react/addons");
var QuestionActionCreators = require("../actions/QuestionActionCreators");
var UserStore = require("../stores/UserStore");
var QuestionStore = require("../stores/QuestionStore");
var Button = require("./Button");
var moment = require("moment");

module.exports = React.createClass({
  displayName: "Question",

  getInitialState () {
    var {cid, pid } = this.props;
    return {
      loggedIn: this.props.loggedIn,
      question: this.props.question,
      hideSignButton: false,
      hideContent: true
    };
  },

  shouldComponentUpdate (nextProps, nextState) {
    return (JSON.stringify(nextState) !== JSON.stringify(this.state));
  },

  componentWillReceiveProps (nextProps) {
    var {selected} = nextProps;
    this.setState({ hideContent: !selected });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _handleSignClick (event) {
    // console.log(this.state.loggedIn);
    if (!this.state.loggedIn) {
      return;
    }
    var {cid, pid} = this.props;
    var {question} = this.state;
    // var user = UserStore.get();
    // QuestionActionCreators.signQuestion({
    //   cid: cid,
    //   pid: pid,
    //   qid: question.id,
    //   signer: user.uid,
    //   signedAt: new Date().getTime()
    // });
    // this.setState({
    //   hideSignButton: true
    // });
  },

  _render (props, state) {
    var {index} = props;
    var {question} = state;
    var {title, content, author, createdAt, signatures} = question;

    var formatedDate = new moment(createdAt).fromNow();
    var signButton = (state.hideSignButton)? (<Button className='signed' name='已連署' icon='fa-bullhorn' />) : ( <Button className='sign' name='連署' icon='fa-bullhorn' _handleClick={this._handleSignClick} />);
    var formatedContent = (state.hideContent)? '': <div className='q_content'>
        <p className='q_text'>{content}</p>
        <div className='q_postmeta'>
          {'提問人：' + author.name }
          <img src={author.avatar} />
          {'/ 提問時間：' + formatedDate }
        </div>
        <div className='q_action'>
          {signButton}{ ' '}
          <Button className='facebook' name='分享' icon='fa-facebook' />
        </div>
      </div>;

    var itemClass = (state.hideContent)? 'q_item md-whiteframe-z1' : 'q_item md-whiteframe-z1 q_item_active';
    var titleClass = (state.hideContent)? 'q_title l_inline' : 'q_title l_inline q_title_active';
    var toggleIcon = (state.hideContent)? 'fa fa-angle-double-down': 'fa fa-angle-double-up';

    return <div className={itemClass}>
      <div className={titleClass} onClick={props._handleClick}>
        <div className='q_order l_inline'>{index + 1}</div>
        <div className='q_vote l_inline'>{signatures.length}</div>
        {title}
        <div className='q_function l_inline'>
          <span><i className={toggleIcon}></i></span>
        </div>
      </div>
      {formatedContent}
    </div>;

  }
});
