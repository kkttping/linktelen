import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import TopInfo from '@/components/TopInfo'
import imgBg from '@/static/img/c4_bg1.jpg'
import NavLink from '@/components/NavLink'
import CareerNav from '@/components/CareerNav'
import { Menu, Row, Col } from 'antd'
import CardOpportunities from '@/components/CardOpportunities'
import { useNavigate } from "react-router-dom";

import './index.scss'
export default function CareerOpportunities() {
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        if(address.indexOf('http')!==-1){
            window.open(address);
            return
        }
        navigate('/' +address);
    }
    const [info, setInfo] = useState([]);
    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        // let a=[{
        //     'position':4455
        // },{
        //     'position':4455
        // }]
        // setInfo(a)

        let res = await Http.to.items("recruit").readByQuery({
            sort: ['-sort', '-date_updated'],
            filter: { 'status': 'published', }
        });
        setInfo(res.data)
    }
    return (
        <div className='career_opportunities'>
            <TopInfo imgBg={imgBg} title={"Job opportunities"} info1={'LINK TO THE UNKNOWN'} info2={' '} />
            <NavLink title1={'Career'} link1={()=>{toPage('career')}} title2={"Job opportunities"}/>
            <CareerNav />
            <div className='content'>

                <Row justify={"center"} className='creertable'>
                    {info.map((item, index) => {
                        return (
                            <Col key={index} lg={11} md={24}>
                                <div className='opportunities_item'>
                                    <CardOpportunities data={item} />
                                </div>
                            </Col>
                        )
                    })}

                </Row>
            </div>

        </div>
    )
}
