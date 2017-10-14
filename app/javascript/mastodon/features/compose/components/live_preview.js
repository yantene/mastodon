import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import emojify from '../../../features/emoji/emoji';
import { debounce } from 'lodash';
const loadScriptOnce = require('load-script-once');

class LivePreview extends React.PureComponent {
  constructor (props, context) {
    super(props, context);
    this.state = {
      textToRender: ''
    };
  }

  changeTextToRender = debounce(() => {
    const text = this.props.text.replace(/\n/g, '<br>');

    this.setState({ textToRender: text });
    this.render();
    const node  = ReactDOM.findDOMNode(this);
    if (MathJax != undefined) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, node]);
    }
  }, 375);

  componentWillUpdate() {
  }

  componentDidUpdate() {
    this.changeTextToRender();
  }

  render () {
    const text = this.state.textToRender;
    return <div dangerouslySetInnerHTML={{ __html: emojify(text)}} />
  }

}

LivePreview.propTypes = {
  text: PropTypes.string.isRequired,
}

export default LivePreview;
