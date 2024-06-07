import { Menu, Row, Col } from "antd";
import TopInfo from "@/components/TopInfo";
import imgBg from "@/static/img/c1_bg1.jpg";
import imgitem1 from "@/static/img/c1_item1.jpg";
import imgitem2 from "@/static/img/c1_item2.jpg";
import CardProducts from "@/components/CardProducts";
import CardOpportunities from "@/components/CardOpportunities";
import React, { useEffect, useState } from "react";
import Http from "@/utils/http";
import ConstValue from "@/utils/value";
import { useNavigate } from "react-router-dom";

import "./index.scss";
export default function Career() {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [infoBase, setInfoBase] = useState({});

  const toPage = (address, routerName) => {
    if (address.indexOf("http") !== -1) {
      window.open(address);
      return;
    }
    if (address === "") return;
    navigate("/" + address);
  };
  useEffect(() => {
    getInfo();
    getInfoBase();
  }, []);
  const getInfoBase = async () => {
    let res = await Http.to.items("careerpage").readByQuery({
      sort: ["id"],
    });
    setInfoBase(res.data);
  };
  const getInfo = async () => {
    let res = await Http.to.items("recruit").readByQuery({
      sort: ["-sort", "-date_updated"],
      filter: { status: "published" },
    });
    setInfo(res.data);
  };
  return (
    <div className="career">
      <TopInfo
        imgBg={imgBg}
        title={"Career"}
        info1={"LINK TO THE UNKNOWN"}
        info2={" "}
      />
      <div className="content">
        <Row justify={"center"} className="careertable">
          <Col sm={24} xl={12}>
            <div className="card_item">
              <CardProducts
                link={() => {
                  toPage(infoBase?.leftlink, "career");
                }}
                img={imgitem1}
                styleSelf={{ color: "#fff", objectfit: "cover" }}
                titleout={infoBase?.lefttit}
                titleIn={infoBase?.lefttit}
                info={[infoBase?.leftoverview]}
              ></CardProducts>
            </div>
          </Col>
          <Col sm={24} xl={12}>
            <div className="card_item">
              <CardProducts
                link={() => {
                  toPage(infoBase?.rightlink, "career");
                }}
                img={imgitem2}
                styleSelf={{ color: "#fff", objectfit: "cover" }}
                titleout={infoBase?.righttit}
                titleIn={infoBase?.righttit}
                info={[infoBase?.rightoverview]}
              ></CardProducts>
            </div>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col>
            <div className="title_name">{infoBase?.lasttit}</div>
          </Col>
        </Row>
        <Row justify={"center"} className="creertable">
          {info.map((item, index) => {
            return (
              <Col key={index} lg={11} md={24}>
                <div className="opportunities_item">
                  <CardOpportunities data={item} />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
