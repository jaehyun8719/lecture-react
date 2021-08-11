import React from 'react';
import List from "./List.js";
import store from "../js/Store";

export default class keywordList extends List {
  componentDidMount() {
    const data = store.getKeywordList();
    this.setState({
      data,
    });
  }

  renderItem(item, index) {
    return (
      <>
        <span className="number">{index + 1}</span>
        <span>{item.keyword}</span>
      </>
    );
  }
}