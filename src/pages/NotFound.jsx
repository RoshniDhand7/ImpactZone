import React from 'react';
import { Button } from 'primereact/button';
import NotFoundSvg from '../assets/svg/404.svg';
import logo from '../assets/images/logo.png';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className="surface-ground flex align-items-center justify-content-center p-5 min-h-full">
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, rgba(48, 141, 247, 0.4) 10%, rgba(48, 217, 247, 0) 30%)',
          }}
        >
          <div
            className="w-full surface-card px-5 sm:px-8 flex flex-column align-items-center"
            style={{ borderRadius: '53px' }}
          >
            <img src={logo} alt="logo" className="mb-5 w-6rem flex-shrink-0" />
            <h1 className="text-900 font-bold text-5xl mb-2">Page Not Found</h1>
            <div className="text-600 mb-5">
              You do not have the necessary permisions.
            </div>

            <img src={NotFoundSvg} alt="Error" className="mb-5" width="150%" />
            <Button
              icon="pi pi-arrow-left "
              className="p-button-info"
              label="Go to Dashboard"
              onClick={() => history.replace('/')}
              text
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(NotFound, comparisonFn);
