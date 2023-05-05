import React from "react";
import "./Steps.css";

const Steps = ({ current }) => {
  return (
    <>
      <div className="steps">
        <div className="step-item" key={1}>
          <div
            className={
              current >= 1
                ? "step-icon-style step-icon-style-active"
                : "step-icon-style step-icon-style-nonActive"
            }
          >
            <span
              className={
                current >= 1
                  ? "step-icon-text step-icon-text-active"
                  : "step-icon-text step-icon-text-nonActive"
              }
            >
              01
            </span>
          </div>
          <div
            className={
              current >= 1
                ? "step-item-content step-item-content-active"
                : "step-item-content step-item-content-nonActive"
            }
          >
            Personal Profile
          </div>
        </div>

        {[
          "Education",
          "Work Experience",
          "Skill's",
          "Interests",
          "Reference",
        ].map((item, index) => {
          return (
            <div className="step-item" key={index + 2}>
              <div
                className={
                  current >= index + 2
                    ? "step-item-line  step-item-line-active"
                    : "step-item-line  step-item-line-nonActive"
                }
              />
              <div
                className={
                  current >= index + 2
                    ? "step-icon-style step-icon-style-active"
                    : "step-icon-style step-icon-style-nonActive"
                }
              >
                <span
                  className={
                    current >= index + 2
                      ? "step-icon-text step-icon-text-active"
                      : "step-icon-text step-icon-text-nonActive"
                  }
                >
                  {`0${index + 2}`}
                </span>
              </div>
              <div
                className={
                  current >= index + 2
                    ? "step-item-content step-item-content-active"
                    : "step-item-content step-item-content-nonActive"
                }
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Steps;