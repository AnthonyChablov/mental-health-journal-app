import React from "react";
import Container from "../Utils/Container";
import ReactIcons from "../Icons/ReactIcons";

const features = [
  {
    iconType: "veryhappy",
    heading: "Express Yourself",
    description:
      "Write freely and express your thoughts and emotions in a safe space.",
  },
  {
    iconType: "grow",
    heading: "Reflect & Grow",
    description:
      "Gain insights into your emotions, track your progress, and foster personal growth.",
  },
  {
    iconType: "insights",
    heading: "Personal Insights",
    description:
      "Explore meaningful patterns and trends in your journal entries.",
  },
];
const LandingPageContentDisplay = () => {
  return (
    <div id="features">
      <Container>
        <div className="w-11/12 mx-auto flex flex-col items-center justify-center mb-28">
          <h2 className="font-playFairDisplay text-2xl md:text-3xl text-slate-800 mb-6 font-regular">
            What Our App Does for You
          </h2>
          <p className="text-center text-gray-500 w-9/12 mx-auto">
            Our mental health journaling app is designed to empower you on your
            journey to emotional well-being. Here is what you can expect:
          </p>

          <ul className="list-disc mt-16 text-left text-gray-600 flex flex-col md:flex-row space-y-14 md:space-y-0 justify-between w-full">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full lg:w-3/12 space-y-4 justify-start "
              >
                <div className="flex items-center justify-center bg-dark-purple p-4 rounded-full shadow-lg mb-2">
                  <ReactIcons type={feature.iconType} size={32} color="white" />
                </div>
                <h3 className="text-gray-700 font-semibold">
                  {feature.heading}
                </h3>
                <p className="text-center text-gray-500 w-8/12 lg:w-full">
                  {feature.description}
                </p>
              </div>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default LandingPageContentDisplay;
