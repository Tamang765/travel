import DynamicForm from "../../../sections/entries/Colors/DynamicForm";
import DynamicGallery from "../../../sections/entries/Gallery/Form";
import DynamicFormPrice from "../../../sections/entries/Pricing/DynamicForm";
import Form from "../../../sections/entries/Sizes/Form";

import FormPackage from "../../../sections/entries/Packages/Form";
const StepperForm = ({
  activeStep,
  formRefs,
  pageId,
  setPageId,
  setPackageId,
  packageId,
  handleClose,
}) => {
  return activeStep === 0 ? (
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
      setPackageId={setPackageId}
    />
  ) : activeStep === 2 ? (
    // <FormFaq
    //   ref={formRefs[2]}
    //   title="Faq"
    //   stepper
    //   option
    //   packageId={packageId}
    // />
    <DynamicForm ref={formRefs[2]} packageId={packageId} />
  ) : activeStep === 3 ? (
    // <FormPricing
    //   ref={formRefs[3]}
    //   title="Pricing"
    //   stepper
    //   packageId={packageId}
    // />
    <DynamicFormPrice ref={formRefs[3]} packageId={packageId} />
  ) : (
    <DynamicGallery ref={formRefs[4]} packageId={packageId} />
  );
};

export default StepperForm;
