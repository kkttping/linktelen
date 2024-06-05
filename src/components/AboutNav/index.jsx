import { Menu, Row, Col } from 'antd'
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Http from "@/utils/http";

import './index.scss'
export default function AboutNav() {
    const [nav, setNav] = useState('');
    const navigate = useNavigate();
    const [info, setInfo] = useState([])

    useEffect(() => {
        let infoArr = window.location.hash.split('/');
        if (infoArr.length === 0) return;
        setNav(infoArr[infoArr.length - 1])
        getNextM();
    }, [])
    const menuonClick = (index) => {
        toPage(index.key)
        setNav(index.key)
    }
    const getNextM = async () => {
        let res = await Http.to.items('menu_new').readByQuery({
            sort: ['id'],
        });
        let info = res.data;
        info?.nextmenu?.forEach((item) => {
            if (item.title === 'About') {
                setInfo(item.nextmenu);
            }
        })

        console.log(res.data);
    }
    const toPage = (address) => {
        if(address.indexOf('http')!==-1){
            window.open(address);
            return
        }
        navigate('/' + address);
    }
    return (

        <div className='about_nav'>

            <div className='select'>
                <Row justify={'center'}>
                    <Col xs={24} md={22} xl={16} xxl={12}>
                        <Menu
                            onClick={(e) => {
                                if (!e.key.includes('http')) {
                                    menuonClick(e);
                                } else {
                                    window.open(e.key);
                                }
                            }}
                            mode="horizontal"
                            selectedKeys={[nav]}
                        >
                            {info?.map((item) => {
                                if(item?.status==='hide')return
                                return (
                                    <Menu.Item key={item?.link} >
                                        <span>{item?.menu}</span>
                                    </Menu.Item>
                                )
                            })}

                            
                        </Menu>
                    </Col>
                </Row>

            </div>
        </div>
    )
}
