import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { changeUsername, loadRepos } from './actions';
import { makeSelectUsername, makeSelectRepos, makeSelectLoading, makeSelectError } from './selectors';

class Dashboard extends React.PureComponent {
  
  render() {
    console.log("render ", this.props);
    return (
      <div>
        <h1>helooo world</h1>
        <form onSubmit={this.props.onSubmitForm}>
          <label htmlFor="username">
            <input
              id="username"
              type="text"
              placeholder="mxstbr"
              value={this.props.username}
              onChange={this.props.onChangeUsername}
            />
          </label>
        </form>
      </div>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
