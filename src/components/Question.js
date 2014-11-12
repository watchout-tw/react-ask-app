"use strict";
var React = require("react/addons");
var QuestionActionCreators = require("../actions/QuestionActionCreators");
var Button = require("./Button");
var moment = require("moment");

module.exports = React.createClass({
  displayName: "Question",

  getInitialState () {
    return {
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

  _handleSignClick (event) {
    var {question} = this.state;
    var {signatures} = question;
    signatures.push('facebook:123123');
    question.signatures = signatures;
    this.setState({
      question: question,
      hideSignButton: true
    });
  },

  render () {
    return this._render(this.props, this.state);
  },

  _render (props, state) {
    var {index} = props;
    var {question} = state;
    var {title, content, asker, createdAt, signatures} = question;

    if ('facebook:123123' in signatures) {
      this.setState({hideSignButton: true});
    }

    var formatedDate = new moment(createdAt).fromNow();
    var signButton = (state.hideSignButton)? (<Button className='signed' name='已連署' icon='fa-bullhorn' />) : ( <Button className='sign' name='連署' icon='fa-bullhorn' _handleClick={this._handleSignClick} />);
    var formatedContent = (state.hideContent)? '': <div className='q_content'>
        <p className='q_text'>{content}</p>
        <div className='q_postmeta'>{'提問人：someid / 提問時間：' + formatedDate }</div>
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
