import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import DynamicForm from "../../../sections/entries/Colors/DynamicForm";
import DynamicFormFact from "../../../sections/entries/Facts/Form";
import DynamicGallery from "../../../sections/entries/Gallery/Form";
import DynamicFormPrice from "../../../sections/entries/Pricing/DynamicForm";

import FormPackage from "../../../sections/entries/Packages/Form";
import Form from "../../../sections/entries/Sizes/Form";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
  "Create an ad",
  "Create an ad",

  "Create an ad",
];

export default function HorizontalLinearStepper({
  handleClose,
  setTitle,
  title,
  activePackageForm,
  isEdit = false,
  data,
}) {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(activePackageForm ? 1 : 0);
  const [pageId, setPageId] = React.useState(null);
  const [packageId, setPackageId] = React.useState(data?.id || null);
  const [skipped, setSkipped] = React.useState(new Set());
  const formRefs = {
    0: React.useRef(),
    1: React.useRef(),
    2: React.useRef(),
    3: React.useRef(),
    4: React.useRef(),
    5: React.useRef(),
  };

  const isStepOptional = (step) => {
    return step > 1; // Allow skipping steps greater than 1
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if (formRefs[activeStep]?.current) {
      const isValid = await formRefs[activeStep].current.submit();
      if (isValid) {
        if (activeStep < steps.length - 1) {
          let newSkipped = skipped;
          if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
          }
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  React.useEffect(() => {
    if (activeStep === 0) {
      setTitle("Page");
    } else if (activeStep === 1) {
      setTitle("Package");
    } else if (activeStep === 2) {
      setTitle("Faq");
    } else if (activeStep === 3) {
      setTitle("Pricing");
    } else if (activeStep === 5) {
      setTitle("Gallery");
    } else if (activeStep === 4) {
      setTitle("Facts");
    }
  }, [activeStep, setTitle]);

  const faqData = data?.faqs;
  const galleryData = data?.gallery;
  const factsData = data?.facts[0];

  const pricingData = data?.pricings;

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} />
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, px: 4 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <Form
              ref={formRefs[0]}
              handleClose={handleClose}
              title={"location"}
              stepper
              setPageId={setPageId}
            />
          ) : activeStep === 1 ? (
            <FormPackage
              ref={formRefs[1]}
              title="Package"
              stepper
              pageId={pageId}
              data={data}
              isEdit={isEdit}
              setPackageId={setPackageId}
            />
          ) : activeStep === 2 ? (
            <DynamicForm
              ref={formRefs[2]}
              packageId={packageId}
              data={faqData}
              isEdit={isEdit}
            />
          ) : activeStep === 3 ? (
            <DynamicFormPrice
              ref={formRefs[3]}
              packageId={packageId}
              data={pricingData}
              isEdit={isEdit}
            />
          ) : activeStep === 4 ? (
            <DynamicFormFact
              ref={formRefs[4]}
              packageId={packageId}
              data={factsData}
              isEdit={isEdit}
              // handleClose={handleClose}
            />
          ) : (
            <DynamicGallery
              ref={formRefs[5]}
              packageId={packageId}
              data={galleryData}
              isEdit={isEdit}
              handleClose={handleClose}
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, m: 4 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button
                color="inherit"
                onClick={handleSkip}
                sx={{ mr: 1 }}
                className="!bg-primary !text-white"
              >
                Skip
              </Button>
            )}
            <Button onClick={handleNext} className="!bg-primary !text-white">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
