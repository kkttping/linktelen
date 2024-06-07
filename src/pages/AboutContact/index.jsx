import React, { useEffect, useState, useRef } from "react";
import TopInfo from "@/components/TopInfo";
import imgBg from "@/static/img/ah_bg2.jpg";
import NavLink from "@/components/NavLink";
import AboutNav from "@/components/AboutNav";
import CardPersonInfo from "@/components/CardPersonInfo";
import { Button, message, Form, Input, Spin, Row, Col } from "antd";
// import BMap  from 'BMap';
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";

import "./index.scss";
let microsoftMap = window.Microsoft;
export default function AboutContact() {
  const [mapList, setMapList] = useState([]);
  const [linkList, setLinkList] = useState([]);
  const [loadFlag, setloadFlag] = useState(false);
  const [info, setInfo] = useState({});
  const [showText, setShowText] = useState();
  const [isHow, setIsShow] = useState(false);
  const [scale1, setScale] = useState(1);
  const [isphone, setIsphone] = useState(false);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const toPage = (address, routerName) => {
    if (address.indexOf("http") !== -1) {
      window.open(address);
      return;
    }
    navigate("/" + address);
  };
  const [selectMap, setSelectMap] = useState(0);

  const onFinish = async (values) => {
    setloadFlag(true);
    messageApi.open({
      key: "updatable",
      type: "loading",
      content: "Loading...",
    });
    try {
      let res = await Http.to.items("message").createOne({
        ...values,
      });
      setloadFlag(false);

      if (res) {
        formRef.current?.resetFields();
        messageApi.open({
          key: "updatable",
          type: "success",
          content: "success!",
          duration: 2,
        });
      }
    } catch (e) {
      setloadFlag(false);

      messageApi.open({
        key: "updatable",
        type: "error",
        content: "error",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {};
  const mapRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    // var map = new BMap.Map("mapCurrent"); // 创建Map实例
    // map.centerAndZoom(new BMap.Point(103.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    // map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    // map.setCurrentCity(""); // 设置地图显示的城市 此项是必须设置的
    // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    // console.log(map);
    // let script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDVTk78W-PvhqUC08l6MBqUHTjJXSGcP4g&libraries=places&language=en-US';
    // document.getElementById('root').appendChild(script);
    // script.onload = () => {
    //     googleMap = window.google && window.google.maps;
    //     if (googleMap == undefined) return
    //     let mapProp = {
    //         center: new googleMap.LatLng(0, 0),
    //         zoom: 14,
    //         mapTypeId: googleMap.MapTypeId.ROADMAP,
    //     };
    //     mapRef.current = new googleMap.Map(document.getElementById("mapCurrent"), mapProp);
    // }
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.bing.com/api/maps/mapcontrol?key=Alq8m5uHndfHyzsWSTgXv1EAX9xc8wQACj9kS0r_5-xWnUdWAZjQ7q4SSEwCAgEo";
    document.getElementById("root").appendChild(script);
    script.onload = () => {
      let time = setInterval(() => {
        try {
          loadMapScenario();
          clearInterval(time);
        } catch (err) {}
      }, 1000);
    };
  }, [mapList]);
  function loadMapScenario(
    lat = mapList[selectMap]?.Positioning?.coordinates[1],
    lng = mapList[selectMap]?.Positioning?.coordinates[0],
  ) {
    let map = new window.Microsoft.Maps.Map(
      document.getElementById("mapCurrent"),
      {
        center: new window.Microsoft.Maps.Location(lat, lng),
        zoom: 15,
      },
    );
    map.entities.clear();
    var pushpin = new window.Microsoft.Maps.Pushpin(map.getCenter(), null);
    map.entities.push(pushpin);
  }
  useEffect(() => {
    getMapInfo();
    getInfo();
    getNextM();
    var screenWidth = window.innerWidth;

    if (screenWidth <= 1600) {
      setScale(((screenWidth / 1920) * 1.2 + 0.05) * 0.8);
    } else {
      setScale(0.95);
    }
    if (screenWidth <= 640) {
      setIsphone(true);
    } else {
      setIsphone(false);
    }
    function handleScreenWidthChange() {
      var screenWidth = window.innerWidth;
      console.log("屏幕宽度已变为：" + screenWidth);
      if (screenWidth <= 1600) {
        setScale(((screenWidth / 1920) * 1.2 + 0.05) * 0.8);
      } else {
        setScale(0.95);
      }
      if (screenWidth <= 640) {
        setIsphone(true);
      } else {
        setIsphone(false);
      }
      // 在这里可以执行其他的逻辑处理
    }

    // 监听屏幕宽度变化事件
    window.addEventListener("resize", handleScreenWidthChange);
  }, []);

  useEffect(() => {
    if (mapList.length === 0) return;
    // mapRef.current?.setCenter(new microsoftMap.LatLng(mapList[selectMap]?.Positioning?.coordinates[1], mapList[selectMap]?.Positioning?.coordinates[0]))
    try {
      loadMapScenario(
        mapList[selectMap]?.Positioning?.coordinates[1],
        mapList[selectMap]?.Positioning?.coordinates[0],
      );
    } catch (err) {}
  }, [selectMap]);
  const getMapInfo = async () => {
    let res = await Http.to.items("office").readByQuery({
      sort: ["sort"],
      filter: { status: "published" },
    });
    let a = [
      {
        Office: 4546385621,
        Address: 44638521,
        Phone: 45246381,
        Email: 45246381,
      },
      {
        Office: 454534321,
        Address: 445343521,
        Phone: 452453431,
        Email: 452453431,
      },
      {
        Office: 4545343451,
        Address: 4453434521,
        Phone: 4524534345,
        Email: 4524534345,
      },
    ];
    console.log(a);
    setMapList(res.data);
    // res.data.forEach((item, index) => {
    //     if (index === 0) {
    //         mapRef.current?.setCenter(new microsoftMap.LatLng(item?.Positioning?.coordinates[1], item?.Positioning?.coordinates[0]))
    //     }
    //     if (microsoftMap === undefined) return
    //     new microsoftMap.Marker({
    //         position: {
    //             lat: item?.Positioning?.coordinates[1]
    //             , lng: item?.Positioning?.coordinates[0]
    //         },
    //         map: mapRef.current,
    //         title: ''

    //     });
    // })
  };
  const getNextM = async () => {
    let res = await Http.to.items("menu_new").readByQuery({
      sort: ["id"],
    });
    let showdata = {};
    res.data?.nextmenu.forEach((item) => {
      if (item.title === "Contact") {
        showdata = item;
      }
      item?.nextmenu.forEach((item2) => {
        if (item2.title === "Contact") {
          showdata = item2;
        }
      });
    });
    setInfo(showdata);
  };
  const searchKeyWords = (key, arr) => {
    // if (arr.length === 0){  setIsShow(false);return}else{
    //     setIsShow(true)

    // }
    // let a = { "Office": 1, 'text_top': "7dassssasddddddddddddddddddddddssssafa" }
    // return a
    if (arr.length === 0) return;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]?.Office?.indexOf(key) !== -1) {
        return arr[i];
      }
    }
  };
  const qien = () => {
    if (!showText) return;
    let arr = showText.split("\n");
    console.log(arr);
    return arr.map((item) => {
      return <p>{item}</p>;
    });
  };
  const getInfo = async () => {
    let res = await Http.to.items("Marketing_").readByQuery({});
    setLinkList(res.data);
  };
  return (
    <div className="about_contact">
      {/* <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVTk78W-PvhqUC08l6MBqUHTjJXSGcP4g&libraries=places&language=en-US"></script> */}
      {contextHolder}
      <div className="top_backg">
        <div className="img"></div>
        <div className="img_box">
          <div className="title" style={{ opacity: isphone ? "0" : "1" }}>
            <div className="tit">{info?.titletop}</div>
            <div className="info">{info?.info1}</div>
          </div>
          <div
            className="title t_phone"
            style={{ display: isphone ? "block" : "none" }}
          >
            <div className="tit">{info?.titletop}</div>
            <div className="info">{info?.info1}</div>
          </div>
          <div className="box">
            <div
              className="icon_phone"
              style={{ opacity: isphone ? "1" : "0" }}
            >
              {searchKeyWords("USA", mapList)?.Office && (
                <div className="item1">
                  <div
                    className="item_bg"
                    style={{
                      backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("USA", mapList)?.top_icon})`,
                    }}
                  ></div>
                  <div className="item_text">
                    <pre style={{ margin: 0, fontFamily: "inherit" }}>
                      {searchKeyWords("USA", mapList)?.text_top}
                    </pre>
                  </div>
                </div>
              )}
              {searchKeyWords("Singapore", mapList)?.Office && (
                <div className="item1">
                  <div
                    className="item_bg"
                    style={{
                      backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("Singapore", mapList)?.top_icon})`,
                    }}
                  ></div>
                  <div className="item_text">
                    <pre style={{ margin: 0, fontFamily: "inherit" }}>
                      {searchKeyWords("Singapore", mapList)?.text_top}
                    </pre>
                  </div>
                </div>
              )}
              {searchKeyWords("Malaysia", mapList)?.Office && (
                <div className="item1">
                  <div
                    className="item_bg"
                    style={{
                      backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("Malaysia", mapList)?.top_icon})`,
                    }}
                  ></div>
                  <div className="item_text">
                    <pre style={{ margin: 0, fontFamily: "inherit" }}>
                      {searchKeyWords("Malaysia", mapList)?.text_top}
                    </pre>
                  </div>
                </div>
              )}
              {searchKeyWords("China", mapList)?.Office && (
                <div className="item1">
                  <div
                    className="item_bg"
                    style={{
                      backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("China", mapList)?.top_icon})`,
                    }}
                  ></div>
                  <div className="item_text">
                    <pre style={{ margin: 0, fontFamily: "inherit" }}>
                      {searchKeyWords("China", mapList)?.text_top}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            <div
              className="lable_top"
              style={{ transform: isphone ? "scale(0)" : "scale(1)" }}
            >
              <div className={isHow ? "show" : "def"}>
                {qien()}
                {/* {qien(mapList?.[0]?.text_top) ?? <><p>Move to icon</p>
                                    <p>Learn more</p></>} */}
              </div>
              <div className={isHow ? "def" : "show"}>
                <div className="defut">
                  <p>Move to icon</p>
                  <p>Learn more</p>
                </div>
                {/* {qien(mapList?.[0]?.text_top) ?? <><p>Move to icon</p>
                                    <p>Learn more</p></>} */}
              </div>
            </div>
            <div
              className="boder"
              style={{
                transform: `scale(${scale1})`,
                backgroundSize: isphone ? "0%" : "cover",
              }}
            >
              <div className="icon" style={{ opacity: isphone ? "0" : "1" }}>
                {searchKeyWords("USA", mapList)?.Office && (
                  <div
                    className="item1"
                    onMouseLeave={() => {
                      setShowText();
                      setIsShow(false);
                    }}
                    onMouseEnter={() => {
                      setShowText(searchKeyWords("USA", mapList)?.text_top);
                      setIsShow(true);
                    }}
                  >
                    <div
                      className="item_bg"
                      style={{
                        backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("USA", mapList)?.top_icon})`,
                      }}
                    ></div>
                    <div className="item_text">
                      {searchKeyWords("USA", mapList)?.Office}
                    </div>
                  </div>
                )}
                {searchKeyWords("Singapore", mapList)?.Office && (
                  <div
                    className="item2"
                    onMouseLeave={() => {
                      setShowText();
                      setIsShow(false);
                      setIsShow(false);
                    }}
                    onMouseEnter={() => {
                      setShowText(
                        searchKeyWords("Singapore", mapList)?.text_top,
                      );
                      setIsShow(true);
                    }}
                  >
                    <div
                      className="item_bg"
                      style={{
                        backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("Singapore", mapList)?.top_icon})`,
                      }}
                    ></div>
                    <div className="item_text">
                      {searchKeyWords("Singapore", mapList)?.Office}
                    </div>
                  </div>
                )}
                {searchKeyWords("China", mapList)?.Office && (
                  <div
                    className="item3"
                    onMouseLeave={() => {
                      setShowText();
                      setIsShow(false);
                    }}
                    onMouseEnter={() => {
                      setShowText(searchKeyWords("China", mapList)?.text_top);
                      setIsShow(true);
                    }}
                  >
                    <div
                      className="item_bg"
                      style={{
                        backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("China", mapList)?.top_icon})`,
                      }}
                    ></div>
                    <div className="item_text">
                      {searchKeyWords("China", mapList)?.Office}
                    </div>
                  </div>
                )}
                {searchKeyWords("Malaysia", mapList)?.Office && (
                  <div
                    className="item4"
                    onMouseLeave={() => {
                      setShowText();
                      setIsShow(false);
                    }}
                    onMouseEnter={() => {
                      setShowText(
                        searchKeyWords("Malaysia", mapList)?.text_top,
                      );
                      setIsShow(true);
                    }}
                  >
                    <div
                      className="item_bg"
                      style={{
                        backgroundImage: `url(${ConstValue.url + "assets/" + searchKeyWords("Malaysia", mapList)?.top_icon})`,
                      }}
                    ></div>
                    <div className="item_text">
                      {searchKeyWords("Malaysia", mapList)?.Office}{" "}
                    </div>
                  </div>
                )}
              </div>
              <div className="point">
                {searchKeyWords("USA", mapList)?.Office && (
                  <div className="item1">
                    <div className="point1"></div>
                    <div className="area1"></div>
                  </div>
                )}
                {searchKeyWords("China", mapList)?.Office && (
                  <div className="item2">
                    <div className="point2"></div>
                    <div className="area2"></div>
                  </div>
                )}
                {(searchKeyWords("Singapore", mapList)?.Office ||
                  searchKeyWords("Malaysia", mapList)?.Office) && (
                  <div className="item3">
                    {searchKeyWords("Malaysia", mapList)?.Office && (
                      <div className="point3"></div>
                    )}
                    {searchKeyWords("Singapore", mapList)?.Office && (
                      <div className="point4"></div>
                    )}
                    <div className="area3"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <TopInfo imgBg={imgBg} title={'Contact'} styleSelf={{ bgColor: '#000' }} info1={'LINK TO THE UNKNOWN'} info2={' '} /> */}
      <NavLink
        title1={"About"}
        link1={() => {
          toPage("about");
        }}
        title2={"Contact"}
      />
      <AboutNav />
      <div className="content">
        {/* <div className='map' >
                    <div id='mapCurrent' ></div>
                    <div className="link">
                        {mapList.map((item, index) => {
                            return <div className={index === selectMap ? 'act' : ''} key={index} onClick={() => { setSelectMap(index) }}>{item?.Office}</div>
                        })}

                    </div>
                    <div className='content_info'>
                        <div className="title">
                            {mapList[selectMap]?.Company && <div>{mapList[selectMap]?.Company}</div>}
                        </div>
                        {
                            mapList[selectMap]?.Address &&
                            <div className="address">
                                <div className='svg_address'></div>
                                <div style={{ width: '90%' }} >{mapList[selectMap]?.Address}</div>
                            </div>
                        }
                        {
                            mapList[selectMap]?.Phone &&
                            <div className="phone">
                                <div className='svg_phone'></div>
                                <div style={{ width: '90%' }} >{mapList[selectMap]?.Phone}</div>
                            </div>
                        }
                        {
                            mapList[selectMap]?.Email &&
                            <div className="email">
                                <div className='svg_email'></div>
                                <div style={{ width: '90%' }} >{mapList[selectMap]?.Email}</div>
                            </div>
                        }
                    </div>
                </div> */}
        <div className="infomation">
          <Row justify={"center"} align={"middle"}>
            <Col lg={12} xs={24}>
              <div className="message_box">
                <div className="content">
                  <div className="address">
                    <Row justify={"start"} align={"start"}>
                      {mapList?.map((item, index) => {
                        console.log(item);
                        return (
                          <Col xs={24} sm={12} lg={12}>
                            <div className={"info_box "}>
                              {index === 0 && (
                                <div className="title">Contact us</div>
                              )}
                              <div className="office">
                                · {mapList[index]?.Office}
                              </div>

                              <div style={{ marginBottom: "16px" }}>
                                {mapList[index]?.Address}
                              </div>
                              <div>{mapList[index]?.Phone}</div>
                              <div>{mapList[index]?.Email}</div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </div>
                {/* {linkList.map((item, index) => {
                                    if (item?.status === 'published') {
                                        return (
                                            <div key={index} className='person_info'>
                                                <CardPersonInfo
                                                    title={item?.Project}
                                                    name={item?.contacts}
                                                    phone={item?.Phone}
                                                    email={item?.Email}
                                                />
                                            </div>
                                        )
                                    }
                                })} */}
              </div>
            </Col>
            <Col lg={12} xs={24}>
              <div className="input_box">
                <div className="content_title">Leave Your Message</div>
                <div className="form">
                  <Form
                    name="basic"
                    ref={formRef}
                    style={{
                      Width: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Name!!",
                        },
                      ]}
                    >
                      <Input placeholder={"Your Name"} />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          pattern:
                            /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                          message: "Please input your Email!!",
                        },
                      ]}
                    >
                      <Input placeholder="Your Email" />
                    </Form.Item>
                    <Form.Item
                      name="message"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Message!!",
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Your Message" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        {loadFlag ? <Spin></Spin> : "Submit"}
                      </Button>
                      {/* <span className="endtext">您的信息将发送给我们，我们会尽快回复！</span> */}
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
