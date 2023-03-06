import { useState, useEffect } from "react";
import { CheckCircleIcon} from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Steps = () => {
  const [steps, setSteps] = useState([
    {label: "Application Information", state: 2},
    {label: "Recommendation Form", state: 2},
    {label: "Schedule Interview", state: 1},
    {label: "Complete Interview", state: 0},
    {label: "Recommendation Letter", state: 0}
  ]);
  const [openStep, setOpenStep] = useState(null);

  const toggleStepState = (index) => {
    const newState = [...steps];
    const numStates = 3;
    newState[index].state = (newState[index].state + 1) % numStates;
    setSteps(newState);
  };

  const toggleOpenStep = (index) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <ul className="space-y-4 bg-white px-4 py-5 sm:p-6">
      {steps.map((step, index) => (
        <li key={String(step.label)} className = "shadow-md bg-gray p-4 hover:border-blue-500">
          <div className="flex justify-between items-center">
          <button
            onClick={() => toggleOpenStep(index)}
            className="mt-2 flex"
          >
            <ChevronDownIcon
              className={`w-8 h-8 ${
                openStep === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
            <h3 className="justify-left text-lg font-medium">{step.label}</h3>
            {step.state === 1 && (
              <div className="flex items-center">
                <h3>Incomplete</h3>
                <ExclamationTriangleIcon className="w-6 h-6" />
              </div>
            )}
            {step.state === 2 && (
              <div className="flex items-center">
                <h3>Complete</h3>
                <CheckCircleIcon className="w-6 h-6 fill-green" />
              </div>
            )}
            {step.state === 0 && (
              <div className="flex items-center">
                <h3>Not Started</h3>
              </div>
            )}
          </div>
          <div
            className={`${
              openStep === index ? "block" : "hidden"} mt-4`}>
            <p>Dropdown content goes here.</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Steps;