import { Accordion, AccordionTab } from "primereact/accordion";

const CustomAccordion = ({ label, extraClass, children }) => {
  return (
    <div className={`customAccordion ${extraClass}`}>
      <Accordion activeIndex={0}>
        <AccordionTab
          header={
            <>
              <div className=" flex align-items-center justify-content-end">
                <span className="actionItems">
                  <i className="pi pi-pencil text-white mx-3"></i>
                  <i className="pi pi-trash text-white"></i>
                </span>
                <h3 className="text-xl font-semibold text-white">{label}</h3>
              </div>
            </>
          }
        >
          <p className="m-0">{children}</p>
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default CustomAccordion;
