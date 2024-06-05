import NavLink from '@/components/NavLink'
import { useParams } from 'react-router-dom';
import imgitem from '@/static/img/m3_bg1.jpg'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";

import './index.scss'
export default function Market3() {
    const getParams = useParams();
    const navigate = useNavigate()
    const toPage = (address, routerName) => {
        if(address.indexOf('http')!==-1){
            window.open(address);
            return
        }
        navigate('/' +address);
    }
    const [info, setInfo] = useState({});

    useEffect(() => {
        getInfo()
    }, [])
    const getInfo = async () => {
        let res = await Http.to.items("Application/"+getParams.id).readByQuery({
            sort: ['id'],
        });
        console.log(res.data);
        setInfo(res.data)
    }
    return (
        <div className='market3'>
            <NavLink  title1={'Application'} link1={()=>{toPage('application')}}  title2={info?.title}/>
            <div className='title'>
                {info?.title}
            </div>
            <div className='info' dangerouslySetInnerHTML={{__html:info?.content}}></div>
        </div>
    )
}
