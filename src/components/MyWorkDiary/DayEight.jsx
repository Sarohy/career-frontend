import React, { useState, useEffect } from "react";
import { Input, Button, DatePicker, Row, Col, Radio, message } from "antd";
import { postApiWithoutAuth } from "../../utils/api"; // Assuming you have a helper for API calls
import { API_URL } from "../../utils/constants"; // Assuming API_URL is defined
import moment from "moment"; // To handle date format

const DayEight = () => {
  // Load saved data from localStorage or set initial values
  const savedFormData = JSON.parse(
    localStorage.getItem("dayEightFormData")
  ) || {
    date: null,
    jobDemands: "",
    workImportance: "",
    enjoyablePart: "",
    worstPart: "",
    technologyChange: "",
    specificSkills: ["", "", ""],
    tradeUnion: null,
    industrialProblem: null,
    industrialProblemExplanation: "",
    trainingOpportunities: "",
    promotionEase: "",
    careerOpportunities: "",
    recommendedTraining: "",
  };

  const [formData, setFormData] = useState(savedFormData);
  const [loading, setLoading] = useState(false);

  // Handle date change
  const handleDateChange = (date, dateString) => {
    setFormData({ ...formData, date: dateString });
  };

  // Handle input changes for both text and job fields
  const handleInputChange = (e, field, index = null) => {
    const value = e.target.value;
    if (index !== null) {
      const updatedSkills = [...formData.specificSkills];
      updatedSkills[index] = value;
      setFormData({ ...formData, specificSkills: updatedSkills });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // Handle radio button change
  const handleRadioChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    const questionsAndAnswers = [
      {
        question: "The demands of the job",
        answer: formData.jobDemands,
      },
      {
        question: "What is important to them in their work?",
        answer: formData.workImportance,
      },
      {
        question: "What is the most enjoyable part of their job?",
        answer: formData.enjoyablePart,
      },
      {
        question: "What is the worst part of their work?",
        answer: formData.worstPart,
      },
      {
        question:
          "How has technology changed their job over the last five years?",
        answer: formData.technologyChange,
      },
      ...formData.specificSkills.map((skill, index) => ({
        question: `Specific Skill ${index + 1}`,
        answer: skill,
      })),
      {
        question: "Are the employees in a trade union?",
        answer: formData.tradeUnion,
      },
      {
        question: "Has there ever been an industrial relations problem?",
        answer: formData.industrialProblem,
      },
      {
        question: "If yes, why? (Explain the industrial relations problem)",
        answer: formData.industrialProblemExplanation,
      },
      {
        question: "Are there opportunities for in-house training?",
        answer: formData.trainingOpportunities,
      },
      {
        question: "Can you get promotion easily?",
        answer: formData.promotionEase,
      },
      {
        question:
          "Can you identify possible career opportunities in this organisation?",
        answer: formData.careerOpportunities,
      },
      {
        question:
          "What formal training or further education would you recommend?",
        answer: formData.recommendedTraining,
      },
    ];

    if (questionsAndAnswers.some((q) => !q.answer)) {
      message.error("All fields must be filled out.");
      setLoading(false);
      return;
    }

    const payload = [
      {
        day: "Day 8", // Send Day 8 in the payload
        date: formData.date,
        questionsAndAnswers: questionsAndAnswers,
      },
    ];

    try {
      const apiUrl = API_URL.WORK_DIARY; // Assuming your API URL is in this constant
      await postApiWithoutAuth(apiUrl, payload);
      message.success("Data submitted successfully!");
    } catch (error) {
      message.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    const initialFormData = {
      date: null,
      jobDemands: "",
      workImportance: "",
      enjoyablePart: "",
      worstPart: "",
      technologyChange: "",
      specificSkills: ["", "", ""],
      tradeUnion: null,
      industrialProblem: null,
      industrialProblemExplanation: "",
      trainingOpportunities: "",
      promotionEase: "",
      careerOpportunities: "",
      recommendedTraining: "",
    };
    setFormData(initialFormData);
    localStorage.setItem("dayEightFormData", JSON.stringify(initialFormData)); // Reset localStorage
  };

  // Save form data to localStorage when formData changes
  useEffect(() => {
    localStorage.setItem("dayEightFormData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h2 className="font-bold text-lg">Day 8 - The Interview</h2>
      <Row gutter={[16, 16]}>
        {/* Date */}
        <Col span={24}>
          <label style={{ fontWeight: "bold" }}>Date:</label>
          <DatePicker
            style={{ width: "100%", marginTop: "8px" }}
            onChange={handleDateChange}
            value={formData.date ? moment(formData.date) : null}
          />
        </Col>

        {/* Job Demands */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            The demands of the job:
          </label>
          <Input.TextArea
            rows={3}
            value={formData.jobDemands}
            onChange={(e) => handleInputChange(e, "jobDemands")}
            placeholder="Describe the demands of the job"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Work Importance */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            What is important to them in their work?
          </label>
          <Input.TextArea
            rows={3}
            value={formData.workImportance}
            onChange={(e) => handleInputChange(e, "workImportance")}
            placeholder="Describe what is important to them in their work"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Enjoyable Part */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            What is the most enjoyable part of their job?
          </label>
          <Input.TextArea
            rows={3}
            value={formData.enjoyablePart}
            onChange={(e) => handleInputChange(e, "enjoyablePart")}
            placeholder="Describe the most enjoyable part of their job"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Worst Part */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            What is the worst part of their work?
          </label>
          <Input.TextArea
            rows={3}
            value={formData.worstPart}
            onChange={(e) => handleInputChange(e, "worstPart")}
            placeholder="Describe the worst part of their work"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Technology Change */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            How has technology changed their job over the last five years?
          </label>
          <Input.TextArea
            rows={3}
            value={formData.technologyChange}
            onChange={(e) => handleInputChange(e, "technologyChange")}
            placeholder="Describe how technology has changed their job"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Specific Skills */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            What job-specific skills do they have?
          </label>
          <div style={{ marginTop: "8px" }}>
            {formData.specificSkills.map((skill, index) => (
              <div key={index} style={{ marginBottom: "8px" }}>
                <label>Skill {index + 1}:</label>
                <Input
                  value={skill}
                  onChange={(e) =>
                    handleInputChange(e, "specificSkills", index)
                  }
                  placeholder={`Enter skill ${index + 1}`}
                  style={{ marginTop: "4px" }}
                />
              </div>
            ))}
          </div>
        </Col>

        {/* Trade Union */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            Are the employees in a trade union?
          </label>
          <Radio.Group
            onChange={(e) => handleRadioChange(e, "tradeUnion")}
            value={formData.tradeUnion}
            style={{ marginTop: "8px" }}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Col>

        {/* Industrial Relations Problem */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            Has there ever been an industrial relations problem?
          </label>
          <Radio.Group
            onChange={(e) => handleRadioChange(e, "industrialProblem")}
            value={formData.industrialProblem}
            style={{ marginTop: "8px" }}
          >
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Col>

        {/* Industrial Problem Explanation */}
        {formData.industrialProblem === "Yes" && (
          <Col span={24}>
            <label style={{ fontWeight: "bold", marginTop: "16px" }}>
              If yes, why?
            </label>
            <Input.TextArea
              rows={3}
              value={formData.industrialProblemExplanation}
              onChange={(e) =>
                handleInputChange(e, "industrialProblemExplanation")
              }
              placeholder="Explain the industrial relations problem"
              style={{ marginTop: "8px" }}
            />
          </Col>
        )}

        {/* Training Opportunities */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            Are there opportunities for in-house training?
          </label>
          <Input.TextArea
            rows={2}
            value={formData.trainingOpportunities}
            onChange={(e) => handleInputChange(e, "trainingOpportunities")}
            placeholder="Describe the opportunities for in-house training"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Promotion Ease */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            Can you get promotion easily?
          </label>
          <Input.TextArea
            rows={2}
            value={formData.promotionEase}
            onChange={(e) => handleInputChange(e, "promotionEase")}
            placeholder="Describe if promotion is easily attainable"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Career Opportunities */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            Can you identify possible career opportunities in this organisation?
          </label>
          <Input.TextArea
            rows={3}
            value={formData.careerOpportunities}
            onChange={(e) => handleInputChange(e, "careerOpportunities")}
            placeholder="Describe possible career opportunities in the organisation"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Recommended Training */}
        <Col span={24}>
          <label style={{ fontWeight: "bold", marginTop: "16px" }}>
            What formal training or further education would you recommend?
          </label>
          <Input.TextArea
            rows={3}
            value={formData.recommendedTraining}
            onChange={(e) => handleInputChange(e, "recommendedTraining")}
            placeholder="Describe recommended training or further education"
            style={{ marginTop: "8px" }}
          />
        </Col>

        {/* Submit Button */}
        <Col span={24} style={{ textAlign: "right", marginTop: "16px" }}>
          <Button
            className="border-blue-500"
            onClick={handleSubmit}
            loading={loading}
            style={{ marginRight: "8px" }}
          >
            Submit
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Col>
      </Row>
    </div>
  );
};

export default DayEight;
