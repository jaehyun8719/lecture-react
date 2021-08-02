class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyWord: "Hello",
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
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              autoFocus
              value={this.state.searchKeyWord}
              onChange={event => this.handleChangeInput(event)}
            />
            <button type="reset" className="btn-reset"></button>
          </form>
        </div>
      </>
    )
  }

}

ReactDOM.render(<App/>, document.querySelector("#app"));