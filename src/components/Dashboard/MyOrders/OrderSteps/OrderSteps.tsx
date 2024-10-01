// src/StepBar.js

const StepBar = () => {
  return (
    <div className="max-w-lg mx-auto py-6">
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li className="step step-primary">Pending</li>
        <li className="step step-primary">Processing</li>
        <li className="step">Shipping</li>
        <li className="step">Deleverd</li>
      </ul>
    </div>
  );
};

export default StepBar;
