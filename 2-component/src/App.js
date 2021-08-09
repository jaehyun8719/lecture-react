import React from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResult from './components/searchResult';
import Store from './js/Store.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
    };
  }

  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.handleReset();
    }

    this.setState({ searchKeyword });
  }

  search(searchKeyword) {
    const searchResult = Store.search(searchKeyword);

    this.setState({
      searchResult,
      submitted: true,
    })
  }

  handleReset() {
    this.setState({
      searchKeyword: "",
      submitted: false,
      searchResult: [],
    })
  }

  render() {
    const { searchKeyword, submitted, searchResult} = this.state;

    return (
      <>
        <Header title="검색" />
        <div className="container">
          <SearchForm
            value={this.state.searchKeyword}
            onChange={(value) => this.handleChangeInput(value)}
            onSubmit={() => this.search(searchKeyword)}
            onReset={() => this.handleReset()}
          />
          <div className="content">
            {submitted && <SearchResult data={searchResult} />}
          </div>
        </div>
      </>
    );
  }
}