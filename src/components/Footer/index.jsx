import { Row, Col } from 'antd'
import { LinkedinOutlined, MediumOutlined, EnvironmentOutlined, PhoneOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import './index.scss'
import imgBg from '@/static/svg/toTop.svg'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Http from "@/utils/http";

export default function Footer() {
    const [info, setInfo] = useState([])
    const [info2, setInfo2] = useState({})

    const toPage = (address, routerName) => {
        if(address.indexOf('http')!==-1){
            window.open(address);
            return
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        navigate('/' + address);
        window.location.reload()

    }
    const navigate = useNavigate()
    useEffect(() => {
        getNextM();
        getInfo();
    }, []);

    const getNextM = async () => {
        let res = await Http.to.items('menu_new').readByQuery({
            sort: ['id'],
        });
        setInfo(res.data);

    }
    const getInfo = async () => {
        let res = await Http.to.items('Basic_information').readByQuery({
            sort: ['id'],
        });
        setInfo2(res.data);
    }
    return (
        <div className='com_footer'>
            <div className='to_top' onClick={
                () => window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })}>
                <VerticalAlignTopOutlined

                    style={{ fontSize: '20px', color: '#fff' }} />
            </div>
            <div className='pc'>
                <div className="top">
                    <div className='content'>
                        <Row>

                            {info?.nextmenu?.map((item, index) => {
                                if (item?.status === 'hide') return

                                return (
                                    <Col key={index} xs={24} sm={12} md={6}>
                                        <div key={index} className='items' >
                                            <span className='title' onClick={() => { toPage(item.link) }} >{item.menu}</span>
                                            {item.nextmenu.map((item2, index2) => {
                                                if (item2?.status === 'hide') return

                                                return (
                                                    <span onClick={(e) => { toPage(item2.link) }} key={index2} className='item'>{item2.menu}</span>

                                                )
                                            })}

                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>


                    </div>
                    <div className="link">
                        <Row>
                            {info2?.Social_Graphs?.map((item, index) => {
                                return (
                                    <Col key={index} xs={24} sm={12} md={6} ><div onClick={() => { window.open(item.website, "_blank"); }} dangerouslySetInnerHTML={{ __html: item?.Icon2 }}></div></Col>
                                )
                            })}


                        </Row>
                    </div>
                </div>
                <div className="bottom">
                    <Row justify={'space-between'}>
                        <Col xs={24} sm={6}><span className='item' dangerouslySetInnerHTML={{__html:info2?.Basic_information}}></span></Col>
                        <Col xs={24} sm={12}>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <span className='item' dangerouslySetInnerHTML={{__html:info2?.Copyright}}></span><a onClick={
                                        () => window.scrollTo({
                                            top: 0,
                                            behavior: "smooth"
                                        })} className='svg' style={{ backgroundImage: `url(${imgBg})`, display: 'inline-block' }}></a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='ph'>
                {info?.nextmenu?.map((item, index) => {
                    return (
                        <div key={index} className='link' onClick={() => toPage(item?.link)}>{item?.menu}</div>

                    )
                })}

                <ul style={{ listStyle: 'none' }} className="share">
                    {info2?.Social_Graphs?.map((item, index) => {
                        return (
                            <li key={index}><a href={item.website} className=" iconfont"><div dangerouslySetInnerHTML={{ __html: item?.Icon2 }}></div></a></li>

                        )
                    })}

                </ul>
                <div className="footer__b g-flex">
                    <p><span className='item' dangerouslySetInnerHTML={{__html:info2?.Basic_information}}></span></p>
                    <p className="g-flex"><span className='item' dangerouslySetInnerHTML={{__html:info2?.Copyright}}></span><a id="top" className="icon-fanhuidingbu iconfont"></a></p>
                </div>
            </div>
        </div>
    )
}