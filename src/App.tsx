import {HashRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import 'antd/dist/antd.css';
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {withSuspense} from "./components/hoc/withSuspense";
import Settings from "./components/Settings/Settings";
import {UsersPage} from "./components/Users/UsersPage";
import {Login} from "./components/Login/Login";
import {Header} from "./components/Header/Header";

const DialogLazy = React.lazy(() => import('./pages/Dialog/DialogsPage'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPageLazy = React.lazy(() => import('./pages/Chat/ChatPage'))
const DialogUser = React.lazy(() => import('./pages/Dialog/DialogUser'))

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

const SuspendedDialogPage = withSuspense(DialogLazy)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPageLazy)
const SuspendedDialogUser = withSuspense(DialogUser)

class App extends Component<MapPropsType & DispatchPropsType> {
    handleAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.error("Some error")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.handleAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.handleAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                    <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to="/dialogs">Messages</Link></Menu.Item>
                                    <Menu.Item key="4"><Link to="/chat">Chat</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users">
                                    <Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to="/profile"/>}/>
                                <Route exact path='/chat-alfa' render={() => <Redirect to="/profile"/>}/>
                                <Route exact path='/dialogs' render={() => <SuspendedDialogPage/>}/>
                                <Route path='/dialogs/:userid?' render={() => <SuspendedDialogUser/>}/>
                                <Route path='/profile/:userid?' render={() => <SuspendedProfile/>}/>
                                <Route path='/users' render={() => <UsersPage pageTitle={"Users"}/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='/settings' render={() => <Settings/>}/>
                                <Route path='/chat' render={() => <SuspendedChatPage/>}/>
                                <Route path='*' render={() => (<div>
                                    404 NOT FOUND
                                </div>)}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Vlad Yuskovich 2021</Footer>
            </Layout>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp: React.FC = () => {
    return <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
}

export default MainApp

// =====================================================================================================================

type DispatchPropsType = {
    initializeApp: () => void
}
type MapPropsType = ReturnType<typeof mapStateToProps>