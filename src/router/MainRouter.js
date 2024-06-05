import React, { useEffect, useState } from "react";
import Http from "@/utils/http";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Products2 from '@/pages/Products2'
import Products3 from '@/pages/Products3'
import Markets from '@/pages/Markets'
import Markets2 from '@/pages/Markets2'
import Markets3 from '@/pages/Markets3'
import AboutHome from '@/pages/AboutHome'
import AboutCompany from '@/pages/AboutCompany'
import AboutCulture from '@/pages/AboutCulture'
import AboutLeadership from '@/pages/AboutLeadership'
import AboutNewsExhibition from '@/pages/AboutNewsExhibition'
import AboutNewsEvents from '@/pages/AboutNewsEvents'
import AboutNewsInfo from '@/pages/AboutNewsInfo'
import More from '@/pages/More'

import AboutQuality from '@/pages/AboutQuality'
import AboutResponsibility from '@/pages/AboutResponsibility'
import AboutContact from '@/pages/AboutContact'
import Career from '@/pages/Career'
import CareerMessage from '@/pages/CareerMessage'
import CareerWorkAtLinktel from '@/pages/CareerWorkAtLinktel'
import CareerOpportunities from '@/pages/CareerOpportunities'
import HomePage from '@/pages/HomePage'
import Search from '@/pages/Search'
import { Modal, Drawer, Radio, Space } from 'antd';
import './index.scss'

export default function () {
	const [open, setOpen] = useState(false);
	const [mOpen, setMOpen] = useState(true);

	const [info, setInfo] = useState({});

	const onClose = () => {
		setOpen(false)
	}
	const handleOk = () => {
		setMOpen(false)
	}
	const handleCancel = () => {
		setMOpen(false)
	}
	useEffect(() => {
		getInfo();
	}, []);
	useEffect(() => {
		getBut();
	}, [info]);
	const getBut = async () => {
		if (window.localStorage.getItem('cook') === 'true') {
			return
		}
		setOpen(true)




		window.localStorage.setItem('cook', false);
		window.localStorage.setItem('cookie', document.cookie);

		document.cookie = "cookieName=cookieValue; path=/; SameSite=Strict";
		let but = await document.getElementById('AcceptButton');
		let link = await document.getElementById('LearnMore');

		if (but === null) return
		but.onclick = () => {
			setOpen(false);
			window.localStorage.setItem('cook', true);
			document.cookie = window.localStorage.getItem('cookie')
		}
		link.onclick = () => {
			setOpen(false);
		}
	}
	const getInfo = async () => {
		let res = await Http.to.items("cookies").readByQuery({
			sort: ['id'],
		});
		setInfo(res.data);
	}

	return (
		<div className="router" >
			<Router>
				<Routes>
					<Route path="/" element={<Navigate replace to="/home" />} />
					<Route path="/news" element={<Navigate replace to="/exhibition" />} />
					<Route path="/investors" element={<Navigate replace to="/" />} />
					<Route path="/socialResponsibility" element={<Navigate replace to="/" />} />

					<Route path='/*' element={<Home />}>
						<Route path='products' element={<Products />}></Route>
						<Route path='products/:id/:itemId?' element={<Products2 />}></Route>

						<Route path='products/:id/:id2/:itemId?/:name' element={<Products3 />}></Route>
						<Route path='markets' element={<Markets />}></Route>
						<Route path='application' element={<Markets2 />}></Route>
						<Route path='application/:id' element={<Markets3 />}></Route>
						<Route path='about' element={<AboutHome />}></Route>
						<Route path='company' element={<AboutCompany />}></Route>
						<Route path='culture' element={<AboutCulture />}></Route>
						<Route path='leadership' element={<AboutLeadership />}></Route>
						<Route path='exhibition' element={<AboutNewsExhibition />}></Route>
						<Route path='events' element={<AboutNewsEvents />}></Route>
						<Route path='newsInfo/:id/:type' element={<AboutNewsInfo />}></Route>
						<Route path='quality' element={<AboutQuality />}></Route>
						<Route path='responsibility' element={<AboutResponsibility />}></Route>
						<Route path='contact' element={<AboutContact />}></Route>
						<Route path='career' element={<Career />}></Route>
						<Route path='message' element={<CareerMessage />}></Route>
						<Route path='workAtLinktel' element={<CareerWorkAtLinktel />}></Route>
						<Route path='opportunities' element={<CareerOpportunities />}></Route>
						<Route path='home' element={<HomePage />}></Route>
						<Route path='search' element={<Search />}></Route>
						<Route path='more' element={<More />}></Route>

					</Route>
				</Routes>
			</Router>
			<Drawer
				title={info?.title}
				placement={'bottom'}
				closable={false}
				onClose={onClose}
				open={info?.status==='published'&&open}
				height={200}
				key={'bottom'}
			>
				<div className="drawer_box" dangerouslySetInnerHTML={{ __html: info?.allow }}></div>
			</Drawer>

		</div>

	)
}