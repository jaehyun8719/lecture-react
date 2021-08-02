class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyWord: "",
    };
  }

  handleChangeInput(event) {
    // this.state.searchKeyWord = event.target.value;
    // this.forceUpdate();

    this.setState({
      searchKeyWord: event.target.value,
    })
  }

  render() {
    // let resetButton = null;
    //
    // if (this.state.searchKeyWord.length > 0) {
    //   resetButton = <button type="reset" className="btn-reset"></button>
    // }

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form>식
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              autoFocus
              value={this.state.searchKeyWord}
              onChange={event => this.handleChangeInput(event)}
            />
            {this.state.searchKeyWord.length > 0 ? (
              <button type="reset" className="btn-reset"></button>
            ) : null}
          </form>
        </div>
      </>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector("#app"));