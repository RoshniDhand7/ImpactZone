import React from 'react';

export default function FormLayout({ children, ...props }) {
  return (
    <form className="grid grid-nogutter" {...props}>
      {children}
    </form>
  );
}
