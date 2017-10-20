import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import flare from '../../../features/flared/flared'
import emojify from '../../../features/emoji/emoji';
import { debounce } from 'lodash';

class LivePreview extends React.PureComponent {
  constructor (props, context) {
    super(props, context);
    this.state = {
      textToRender: ''
    };
  }

  changeTextToRender = debounce(() => {
    const text = '<p>' + this.props.text.replace(/\n/g, '<br>') + '</p>';

    this.setState({ textToRender: text });
    this.render();
    const node  = ReactDOM.findDOMNode(this);
    flare(node);
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
