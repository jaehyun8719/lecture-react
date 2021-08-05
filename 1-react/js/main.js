import store from "./js/Store.js";
import { formatRelativeDate } from "./js/helpers.js";

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
      keywordList: [],
      historyList: [],
    };
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    const historyList = store.getHistoryList();

    this.setState({
      keywordList,
      historyList
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('TODO: handleSubmit', this.state.searchKeyWord);

    this.search(this.state.searchKeyWord);
  }

  search(searchKeyWord) {
    const searchResult = store.search(searchKeyWord);
    const historyList = store.getHistoryList();

    this.setState({
      searchKeyWord,
      searchResult,
      historyList,
      submitted: true,
    });
  }

  handleReset() {
    this.setState(
      () => {
      return {
        searchKeyWord: "",
        searchResult: [],
        submitted: false,
      }
    },
      () => {
      console.log('TODO: handleReset', this.state.searchKeyWord);
    })
  }

  handleClickRemoveHistory(event, keyword) {
    // 버블 이벤트 전파 차단
    event.stopPropagation();
    store.removeHistory(keyword);
    const historyList = store.getHistoryList()
    this.setState({
      historyList
    });
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

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map((item, index) => {
          return (
            <li key={item.id} onClick={() => this.search(item.keyword)}>
              <span className="number">{index + 1}</span>
              <span>{item.keyword}</span>
            </li>
          )
        })}
      </ul>
    )

    const historyList = (
      <ul className="list">
        {this.state.historyList.map((item, index) => {
          return (
            <li key={item.id} onClick={() => this.search(item.keyword)}>
              <span>{item.keyword}</span>
              <span className="date">{formatRelativeDate(item.date)}</span>
              <button className="btn-remove" onClick={event => this.handleClickRemoveHistory(event, item.keyword)} ></button>
            </li>
          );
        })}
      </ul>
    )

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
        {this.state.selectTab === TabType.KEYWORD && keywordList}
        {this.state.selectTab === TabType.HISTORY && historyList}
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