import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";
import {Navbar} from "../Navbar/Navbar";
import classes from "./Header.module.css"

export const Header: React.FC = (props) => {
    const {Header} = Layout;
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const _logout = () => {
        dispatch(logout())
    }

    return (
        <Header>
            <Row>
                <Col span={18}>
                    <Menu>
                        <Menu.Item key="1"><Link to="/settings">Settings</Link></Menu.Item>
                        {/*<Navbar />*/}
                    </Menu>
                </Col>
                {isAuth
                    ? <> <Col span={1}>
                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Col>
                        <Col span={5}>
                        <Button onClick={_logout}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button onClick={_logout}><Link to={'/login'}>Login</Link></Button>
                    </Col>
                }

            </Row>
        </Header>
    )
}