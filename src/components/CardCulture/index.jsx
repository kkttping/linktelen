import React from 'react'
import './index.scss'
export default function CardCulture(props) {
  const { styleSelf, img, title, infoList } = props;
  return (
    <div className='com_card_culture' style={{ color: styleSelf?.color ?? '#000' }}>
      <div className='img'>
        <img src={img} alt="" />
      </div>
      <div className='infomation'>
        <div className='name'><span >{title}</span></div>
        <div className='info'>{infoList?.map((item,index) => {
          return <span key={index}>{item}</span>
        })}</div>
      </div>


      <div className='bg_hover'>
      </div>
    </div>
  )
}
