import React, { useState, useEffect } from 'react'
import imgBg from '@/static/img/ah_bg1.jpg'
import TopInfo from '@/components/TopInfo'
import { Menu, Row, Col } from 'antd'
import imgitem1 from '@/static/img/ah_item1.jpg'
import imgitem2 from '@/static/img/ah_item2.jpg'
import imgitem6 from '@/static/img/ah_item6.jpg'
import imgitem7 from '@/static/img/ah_item7.jpg'
import imgText from '@/static/img/ah_text1.jpg'
import imgPerson from '@/static/img/ah_person1.jpg'

import CardProducts from '@/components/CardProducts'
import { useNavigate } from "react-router-dom";
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import './index.scss'
export default function AboutHome() {
    const [imgSelect, setImgSelect] = useState(0);
    const [leadershipList, setLeadershipList] = useState([]);
    const [news, setnews] = useState('');
    const [infoBase, setInfoBase] = useState({});

    const navigate = useNavigate()


    const toPage = (address, routerName) => {
        if(address.indexOf('http')!==-1){
            window.open(address);
            return
        }
        navigate('/' + address);
    }
    useEffect(() => {
        getInfo();
        getInfoBase();
    }, []);
    const getInfoBase = async () => {
        let res = await Http.to.items('aboutpage').readByQuery({
            sort: ['id'],
        });
        setInfoBase(res.data);
    }
    const getInfo = async () => {
        let res = await Http.to.items("Leadership").readByQuery({
            sort: ['sort'],
            filter: {
                Recommend
                    :
                    true, status
                    :
                    "published"
            }
        });
        let res2 = await Http.to.items('New').readByQuery({
            sort: ['sort', 'date_updated'],
            filter: {
                type
                    :
                    "Exhibition", status: "published"
            }
        });
        setnews(res2.data?.[res2.data.length - 1])
        setLeadershipList(res.data)
    }
    const toPage2 = (address, info) => {
        if(address.indexOf('http')!==-1){
            window.open(address);
            return
        }
        navigate('/' + address + '/' + info);
    }
    const timeSet = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num
    }
    return (
        <div className='about_home'>
            <TopInfo imgBg={imgBg} title={'About'} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <div className='content'>
                <Row justify={"center"} className='card_two'>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={() => { toPage(infoBase?.comlink, 'about') }} img={imgitem1} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={infoBase?.comtit} titleIn={infoBase?.comtit} info={[infoBase?.comoverview]} ></CardProducts>
                        </div>
                    </Col>
                    <Col sm={24} xl={12} >
                        <div className='card_item'>
                            <CardProducts link={() => { toPage(infoBase?.collink, 'about') }} img={imgitem2} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={infoBase?.coltil} titleIn={infoBase?.coltil} info={[infoBase?.coloverview]}></CardProducts>
                        </div>
                    </Col>
                </Row>
                {/* <div className='leadership'>
                    <Row justify={"center"}>
                        <Col sm={24} xl={12} >
                            <div className='human_img'>
                                {leadershipList.length !== 0 && <img src={ConstValue.url + "assets/" + leadershipList[imgSelect]?.Img} alt="" />}
                                <div className='name namefff'>
                                    <img src={imgText} alt="" />
                                </div>
                            </div>
                        </Col>
                        <Col sm={24} xl={12} >
                            <div className='info'>
                                <div className="text">
                                    <div className='leadership_type'>{infoBase?.leadtit}</div>
                                    <div className='leadership_name'><div className='person_svg'></div>{leadershipList[imgSelect]?.Name}</div>
                                    <div className='leadership_work'>{leadershipList[imgSelect]?.Position}</div>
                                    <div className='leadership_info' dangerouslySetInnerHTML={{ __html: leadershipList[imgSelect]?.Introduce?.replace(/\n/g, "<br/>") }}></div>
                                    <span className='readmore' onClick={() => { toPage(infoBase?.leadlink, leadershipList[imgSelect]?.id); window.scrollTo(0, 0); }}>READ MORE<span></span></span>

                                </div>
                                <div className="select_img">
                                    {leadershipList.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={imgSelect === index ? 'select_img activty' : 'select_img'}
                                                onClick={() => {
                                                    setImgSelect(index);

                                                }}
                                            >
                                                <img src={ConstValue.url + "assets/" + item?.Thumbnail} alt="" />
                                            </div>

                                        )
                                    })}

                                    <div className='img' onClick={() => { toPage(infoBase?.leadlink, 'about'); window.scrollTo(0, 0); }}></div>
                                </div>
                            </div>
                        </Col>
                    </Row>


                </div> */}
                <div style={{ width: '100vw' }}>
                    <Row justify={"center"}>
                        <Col sm={24} xl={12} className='about_card_newsquality'  >
                            <Row>

                                <Col xs={24} lg={12} xl={12} className='card_about_News'>
                                    <div className='card_item card_newsnew' >
                                        {news && (
                                            <div className='news' >
                                                <div className='news_title'>News</div>
                                              {/*}  <div className='time'>{[`${timeSet((new Date(news?.date_updated)).getMonth() + 1)}-${timeSet((new Date(news?.date_updated)).getDate())}`, ',', (new Date(news?.date_updated)).getFullYear()]}</div>*/}
                                                <div className='news_info'>{news
                                                    .Title
                                                }</div>
                                                <span
                                                    className='readmore'
                                                    onClick={() => {
                                                        if (news.outlink) {
                                                            const link = news.outlink.startsWith('http') ? news.outlink : `/#/${news.outlink}`;
                                                            window.open(link);
                                                        } else {
                                                            toPage2('newsInfo', news.id + '/' + news.type);
                                                        }
                                                        window.scrollTo(0, 0);
                                                    }}
                                                >
                                                    READ MORE <span></span>
                                                </span>
                                            </div>
                                        )}

                                    </div>
                                </Col>
                                <Col sm={24} xl={12} className='card_about_quality' >
                                    <div className='card_item'>
                                        <CardProducts link={() => { toPage(infoBase?.qualink, 'about'); window.scrollTo(0, 0); }} img={imgitem7} styleSelf={{ color: '#fff', objectfit: 'cover' }} titleout={infoBase?.quatit} titleIn={infoBase?.quatit} info={[infoBase?.quaoverview]}></CardProducts>
                                    </div>
                                </Col>
                            </Row>
                        </Col>


                    </Row>
                </div>

                <div className='earth'>
                    <Row justify={"center"} className='card_two'>
                        <Col sm={24} xl={12} >
                            <div className='card_item_bottom'>
                                <div className='responsibility_title'>
                                    {infoBase?.restit}
                                </div>
                                <div className='responsibility_info'>
                                    {infoBase?.resoverview}
                                    <span className='readmore' onClick={() => { toPage(infoBase?.reslink, 'about'); window.scrollTo(0, 0); }}>READ MORE<span> </span></span>
                                </div>


                            </div>
                        </Col>
                        <Col sm={24} xl={12} >
                            <div className='card_item_bottom'>
                                <div className='contact_title'>
                                    {infoBase?.contit}
                                </div>
                                <div className='contact_info'>
                                    <span dangerouslySetInnerHTML={{ __html: infoBase?.conoverview }}></span>

                                    <span className='readmore' onClick={() => { toPage(infoBase?.conlink, 'about'); window.scrollTo(0, 0); }}>READ MORE<span></span></span>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
