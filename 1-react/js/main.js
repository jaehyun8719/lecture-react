import store from "./js/Store.js";

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
}

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyWord: "",
      searchResult: [],
      submitted: false,
      selectTab: TabType.KEYWORD,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('TODO: handleSubmit', this.state.searchKeyWord);

    this.search(this.state.searchKeyWord);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    this.setState({ searchResult });
  }

  handleReset() {
    this.setState(
      () => {
      return {
        searchKeyWord: "",
        submitted: false,
      }
    },
      () => {
      console.log('TODO: handleReset', this.state.searchKeyWord);
    })
  }

  handleChangeInput(event) {
    const searchKeyWord = event.target.value;

    if (searchKeyWord.length <= 0 && this.state.submitted) {
     return this.handleReset();
    }

    this.setState({
      searchKeyWord,
      submitted: true,
    });
  }

  render() {
    const searchForm = (
      <form
        onSubmit={event => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={this.state.searchKeyWord}
          onChange={event => this.handleChangeInput(event)}
        />
        {this.state.searchKeyWord.length > 0 && (
          <button type="reset" className="btn-reset"></button>
        )}
      </form>
    );

    const searchResult = (
      this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map(item => {
            return (
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.Name} />
                <p>{item.name}</p>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="empty-box">검색 결과가 없습니다.</div>
      )
    );

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map(tabType => {
            return (
              <li
                className={this.state.selectTab === tabType ? "active" : ""}
                key={tabType}
                onClick={() => this.setState({ selectTab: tabType })}
              >
                {TabLabel[tabType]}
              </li>
            )
          })}
        </ul>
        {this.state.selectTab === TabType.KEYWORD && <>TODO: 추천 검색어</>}
        {this.state.selectTab === TabType.HISTORY && <>TODO: 최근 검색어</>}
      </>
    );

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector("#app"));