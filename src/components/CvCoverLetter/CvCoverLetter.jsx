import { Button } from "antd";
import { useEffect, useState } from "react";
import PersonalProfile from "./PersonalProfile/PersonalProfile";
import Skill from "./Skill/Skill";
import "./CvCoverLetter.css";
import Steps from "./Steps/Steps";
import Interest from "./Interests/Interest";
import Reference from "./Reference/Reference";
import Education from "./Eductaion/Education";
import emailIcon from "../../assets/image 2.png"
import Experenice from "./Experenice/Experenice";
import { getApiWithAuth } from "../../utils/api";
import { API_URL } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

const CvCoverLetter = () => {
  const location = useLocation(); // React Router's location object
  const initialStep = new URLSearchParams(location.search).get("step") || 1;
  const [current, setCurrent] = useState(parseInt(initialStep));
  const [downloadBtn, setDownloadBtn] = useState(false);


  const getUserData = async () => {
    const response = await getApiWithAuth(API_URL.GETUSER2);

    if (response.data.status === 200) {

      if (response.data.data.cv_completed === true) {
        setDownloadBtn(true);
      }
    }
  }
  useEffect(() => {
    getUserData();
    // Update URL parameter when current step changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("step", current);
    window.history.replaceState(null, "", `${location.pathname}?${searchParams}`);
  }, [current, location]);
  const sendToEmail = async () => {
    console.log("i am clicked")
    const res = await getApiWithAuth(API_URL.SENDCV)
    console.log("send to email", res)
  }
  return (
    <>
      <div class="h-[100%] w-[100%] bg-white mt-3">
        <div
          class="h-[100px] ml-9"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 class="font-bold text-[24px] text-[#474749] ">CV/Cover Letter</h1>
            <p class="text-[#737373] text-[12px] mt-1">
              Lorem ipsum is a placeholder text commonly used to demonstrate.
            </p>
          </div>
          {downloadBtn && (<span
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => {
              sendToEmail()

            }}
          >
            <img src={emailIcon} style={{ marginRight: '1rem' }} />
            <span style={{ marginRight: '2.5rem' }}> Send to Email</span>

          </span>)}
        </div>

        <div className="cv-Data">
          <div className="ml-2">
            <Steps current={current} setCurrent={setCurrent} />
          </div>
          {current === 1 ? (
            <PersonalProfile setCurrent={setCurrent} current={current} />
          ) : current === 2 ? (
            <Education setCurrent={setCurrent} current={current} />
          ) : current === 3 ? (
            <Experenice setCurrent={setCurrent} current={current} />
          ) : current === 4 ? (
            <Skill setCurrent={setCurrent} current={current} />
          ) : current === 5 ? (
            <Interest setCurrent={setCurrent} current={current} />
          ) : current === 6 ? (
            <Reference setCurrent={setCurrent} current={current} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default CvCoverLetter;

