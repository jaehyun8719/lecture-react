class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyWord: "",
      searchResult: [],
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('TODO: handleSubmit', this.state.searchKeyWord);
  }

  handleReset() {
    this.setState(
      () => {
      return { searchKeyWord: "" }
    },
      () => {
      console.log('TODO: handleReset', this.state.searchKeyWord);
    })
  }

  handleChangeInput(event) {
    const searchKeyWord = event.target.value;

    if (searchKeyWord.length === 0) {
     return this.handleReset();
    }

    this.setState({ searchKeyWord });
  }

  render() {
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
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
          <div className="content">
            {this.state.searchResult.length > 0 ? (
              <div>TODO: 검색 결과 목록 표시하기</div>
            ) : (
              <div className="empty-box">검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      </>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector("#app"));