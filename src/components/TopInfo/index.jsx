import React, { useState, useEffect } from 'react'
import Texty from 'rc-texty';
import { Row, Col } from 'antd'
import './index.scss'
import Http from "@/utils/http";

export default function TopInfo(props) {
	const { imgBg, title, info1, info2, styleSelf } = props;

	const [info, setInfo] = useState({})
	const [imgBG, setImgBG] = useState('')

	useEffect(() => {
		getNextM()
	}, [title]);
	const getNextM = async () => {

		let res = await Http.to.items('menu_new').readByQuery({
			sort: ['id'],
		});
		let showdata = {};
		res.data?.nextmenu.forEach((item) => {
			if (item.title === title) {
				showdata = item;
			}
			item?.nextmenu.forEach((item2) => {
				if (item2.title === title) {
					showdata = item2;
				}
			})
		})
		console.log(showdata);
		showdata?.img?.split('"')?.forEach((item)=>{
			console.log(item);
			console.log(item);
			console.log(item);
			console.log(item);

			if(item?.indexOf('http')!==-1||item?.indexOf('assets')!==-1){
				setImgBG(item);
				

			}
		})
		setInfo(showdata);
		console.log(res.data);
		console.log(title);

	}
	return (
		<div className='top_info'>
			<Row>
				<Col span={24}>
					<div className="img_main"
						style={{
							backgroundColor: styleSelf?.bgColor ?? '',
							backgroundAttachment: styleSelf?.bgColor ? 'scroll' : 'fixed',
							backgroundImage: `url(${imgBG})`,

						}}
					>
						<span className='titel'>
							<Texty interval={150} delay={500}>
								{
									info?.titletop
										? info.titletop.replace(/\s/g, (match) => {
											return String.fromCharCode(160);
										})
										: ''
								}
							</Texty>
						</span>
						<span>
							<Texty type="swing">{info?.info1}</Texty>
						</span>
						<span>
							<Texty type="swing">{info?.info2}</Texty>
						</span>
						<div className='bottom_direction'></div>
					</div>
				</Col>
			</Row>
		</div>
	)
}