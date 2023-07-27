import Divide from "../../../../../../assets/icons/box.png";

export const paymentOptions = [
  {
    name: "Incremental Pay",
    fields: [
      {
        name: "1-5 Clients",
        type: "number",
        width: "5rem",
        dollarsign: true,
      },
      {
        name: "6-10 Clients",
        type: "number",
        width: "5rem",
        dollarsign: true,
      },
      {
        name: "11-15 Clients",
        type: "number",
        width: "5rem",
        dollarsign: true,
      },
      {
        name: "16-20 Clients",
        type: "number",
        width: "5rem",
        dollarsign: true,
      },
      {
        name: "21-25 Clients",
        type: "number",
        width: "5rem",
        dollarsign: true,
      },
      {
        name: "26+ Clients",
        type: "number",
        width: "5rem",
        dollarsign: true,
      },
      {
        name: "No Registration Pay",
        type: "number",
        width: "5rem",
        dollarsign: true,
      },
      {
        name: "Count Unpaid Services",
        type: "checkbox",
        width: "4rem",
        dollarsign: true,
      },
    ],
  },
  {
    name: "Pay Per Class",
    fields: [
      {
        name: "Pay Per Class",
        type: "number",
        dollarsign: true,
      },
      {
        name: "No Registration Pay",
        type: "number",
        dollarsign: true,
      },
    ],
  },
  {
    name: "Pay Per Client",
    fields: [
      {
        name: "Base Rate",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "Per Client",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "For each client over",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "Add",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "For each client over",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "Add",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "For each client over",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "Add",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "No Registration Pay",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "Max Pay",
        type: "number",
        width: "3rem",
        dollarsign: false,
      },
      {
        name: "Count Unpaid Services",
        type: "checkbox",
      },
    ],
  },
  {
    name: "% Rate",
    fields: [
      {
        name: "% Rate",
        type: "number",
        dollarsign: false,
      },
      {
        name: "No Registration Pay",
        type: "number",
        dollarsign: false,
      },
    ],
  },
];
