import { Menu, Row, Col } from 'antd'
import CardProducts from '@/components/CardProducts'
import { useNavigate } from "react-router-dom";
import imgitem1 from '@/static/img/item1.png'
import imgitem2 from '@/static/img/item3.png'
import imgitem3 from '@/static/img/item4.png'
import imgBg from '@/static/img/bg_1.jpg'
import TopInfo from '@/components/TopInfo'
import React, { useEffect, useState } from 'react'
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import './index.scss'
export default function Products() {
	const navigate = useNavigate()

	const toProducts2 = (id) => {
		navigate('/products/' + id)
	}
	const [info, setInfo] = useState([]);
	const [infoM, setInfoM] = useState([]);
	const [size, setSize] = useState(24);


	useEffect(() => {
		getInfo();
		getNextM()
	}, []);

	const getInfo = async () => {
		let res = await Http.to.items("CLASSIFICATION").readByQuery({
			sort: ['id'],
			filter:{status:"published"}
		});
		setInfo(res.data)
	}
	const getNextM = async () => {
        let res = await Http.to.items('menu_new').readByQuery({
            sort: ['id'],
        });
		let data=[];
		res?.data?.nextmenu?.forEach(element => {
			if(element?.title==="Products"){
				data=element
			}
		});
		console.log(data);
		let temp=0;
		data?.nextmenu.forEach((item)=>{
			if(item?.status !== 'hide'){
				temp++
			}
		})
		setSize(24/temp)
        setInfoM(data?.nextmenu);

    }
	const imgList = { '0': imgitem1, '1': imgitem2, '2': imgitem3, }

	return (
		<div className='products'>
			<TopInfo
				imgBg={imgBg}
				title={'Products'}
				info1={'LINK TO THE UNKNOWN'}
				info2={' '}
			/>
			<Row justify={"center"}>

				{info.map((item, index) => {
					if (infoM?.[index]?.status === 'hide') return

					return (
						<Col key={index} xl={12} xxl={size} >
							<div className='card_item'>
								<CardProducts
									link={() => toProducts2(item?.id)}
									img={imgList[index]}
									info={[item?.text]}
									titleIn={item?.name}
									titleout={item?.name}
								/>
							</div>
						</Col>
					)
				})}


			</Row></div>
	)
}
