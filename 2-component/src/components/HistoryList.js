import React from 'react';
import List from "./List.js";
import store from "../js/Store";

export default class HistoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      historyList: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const historyList = store.getHistoryList();
    this.setState({
      historyList,
    });
  }

  handleClickRemoveHistory(keyword) {
    store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    return (
      <List
        data={this.state.historyList}
        onClick={this.props.onClick}
        hasDate
        onRemove={(keyword) => this.handleClickRemoveHistory(keyword)}
      />
    );
  }
}