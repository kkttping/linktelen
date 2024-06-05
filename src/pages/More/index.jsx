import React, { useEffect, useState } from 'react'
import NavLink from '@/components/NavLink'
import { useParams } from 'react-router-dom';
import imgitem from '@/static/img/an_item3.jpg'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import './index.scss'
export default function More() {
    const [info, setInfo] = useState({});

    const getInfo = async () => {
        let res = await Http.to.items("cookies").readByQuery({
            sort: ['id'],
        });
        setInfo(res.data);
        console.log(res.data);
    }
    useEffect(() => {
        getInfo()
    }, [])
    return (
        <div className='more'>

            {info?.readmore && (

                <div
                    className='contactfull'
                    dangerouslySetInnerHTML={{ __html: (info?.readmore) }}
                />
            )}

        </div>

    )
}
