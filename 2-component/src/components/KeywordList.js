import React from 'react';
import store from "../js/Store";
import List from "./List";

export default class keywordList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywordList: [],
    };
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    this.setState({
      keywordList,
    });
  }

  render() {
    return (
      <List
        data={this.state.keywordList}
        onClick={this.props.onClick}
        renderItem={(item, index) => {
          return (
            <>
              <span className="number">{index + 1}</span>
              <span>{item.keyword}</span>
            </>
          )
        }}
      />
    )
  }
}