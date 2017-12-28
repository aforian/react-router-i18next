import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import i18n from './components/i18n';
import { translate, I18n, Trans } from 'react-i18next';

const About = ({match, translates}) => (
  <div>
    <h1>{translates('pageName.about')}</h1>
    <ul>
      {
        Array.prototype.map.call(
          translates('count',{ returnObjects: true }),
          (count,id) => (<li key={id}>第{count}格</li>))
      }
    </ul>
  </div>
)

const Contact = ({match, translates}) => (
  <div>
    <h1>{translates('pageName.contact')}</h1>
    <p>
      <span>{translates('currency')}</span>
      {translates('cost')}
    </p>
  </div>
)

const Home = ({match, translates}) => (
  <div>
    <h1>{translates('pageName.home')}</h1>
    <h3>{translates('blessing')}</h3>
    <h3>現在語系:  {translates('appLanguage')}</h3>
  </div>
)

class SubRoutes extends Component {
  componentWillMount() {
    this.props.match.params.id
      ? this.props.changeLanguage(this.props.match.params.id)
      : this.props.changeLanguage("zh-TW");
  }
  componentWillReceiveProps(newProps){
    if(newProps.match.params.id !== this.props.match.params.id) {
      console.log(newProps.match.params.id);
      this.props.changeLanguage(newProps.match.params.id);
    }
  }
  componentDidMount() {
    console.log(this.props.match.params.id)
  }
  componentWillUnmount(){
    console.log("zh-TW");
    this.props.changeLanguage("zh-TW");
  }
  render(){
    const {match, translates, ...props} = this.props;
    return (
      <I18n ns="translates">
        {
          (t, { i18n }) => (
            <div className="container">
              <Switch>
                <Route path={`${this.props.match.url}/about`} render={(match) =>(
                  <About match={match} translates={translates}/>
                )} />
                <Route path={`${this.props.match.url}/contact`} render={(match) =>(
                  <Contact match={match} translates={translates}/>
                )} />
                <Route exact path={this.props.match.url} render={(match) =>(
                  <Home match={match} translates={translates}/>
                )} />
              </Switch>
            </div>
          )
        }
      </I18n>
    )
  }
};

const WithSubRoutes = withRouter(SubRoutes);

class Routes extends Component {
  render(){
    const {match, translates, changeLanguage, ...props} = this.props;
    return (
       <Switch>

        <Route exact path="/" render={(match) =>(
          <Home match={match} translates={translates}/>
          )} />
        <Route path="/about" render={(match) =>(
          <About match={match} translates={translates}/>
          )} /> />
        <Route path="/contact" render={(match) =>(
          <Contact match={match} translates={translates}/>
          )} />

        <Route path="/:id(en|jp)(/*)?" render={({match}) => (
          <SubRoutes
            match={match}
            translates={translates}
            changeLanguage={changeLanguage}
          />
        )}/>
      </Switch>
    )
  }
}

const WithRoutes = withRouter(Routes);

const WithLink = ({rootRoute, pathname, Child, ...props}) => {
  return rootRoute !== ""
    ? (<Link to={`/${rootRoute}${pathname}`}> {Child}</Link>)
    : (<Link to={pathname}>{Child}</Link>)
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lang: "zh-TW",
      rootRoute: "",
    }
  }
  changeLanguage = (lang) => {
    const rootRoute = lang === 'zh-TW'
      ? '' : lang;

    this.setState({
      lang,
      rootRoute
    });
    i18n.changeLanguage(lang);

    // console.log('language:'+lang)
  }
  render() {
    const { t } = this.props;
    return (
      <Router>
        <div id="app" className="App">
          <header className="App-header">
            <div className="App-brand">
              <img className="App-logo" src={logo} alt="logo"/>
              <h1 className="App-title"> { t('appName') }</h1>
            </div>
            <nav id="nav">
              <ul>
                <li>語系選擇:</li>
                <li className={this.state.lang === 'zh-TW' ? 'active': ''}>
                  <Link to="/">zh-TW</Link>
                </li>
                <li className={this.state.lang === 'en' ? 'active': ''}>
                   <Link to="/en">en</Link>
                </li>
                <li className={this.state.lang === 'jp' ? 'active': ''}>
                   <Link to="/jp">jp</Link>
                </li>
              </ul>
            </nav>
          </header>
          <ul className="menu">
            <li>
              <WithLink
                rootRoute={this.state.rootRoute}
                pathname='/' Child="Home"/>
            </li>
            <li>
              <WithLink
                rootRoute={this.state.rootRoute}
                pathname='/about' Child="About"/>
            </li>
            <li>
              <WithLink
                rootRoute={this.state.rootRoute}
                pathname='/contact' Child="Contact"/>
            </li>
          </ul>

          <div className="container">
            <WithRoutes translates={t} changeLanguage={this.changeLanguage} />
          </div>
        </div>
      </Router>
    )
  }
}

export default translate()(App);