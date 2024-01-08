import React from 'react';

export default function StatsCard({
  title,
  color,
  icon,
  heading,
  col = 'col',
}) {
  return (
    <div className={`lg:${col} col-12 sm:col-6 p-2`}>
      <div className={`hightlightcard p-3 ${color} `}>
        <div className="flex flex-column justify-content-between">
          <div className="flex justify-content-between    ">
            <div className="text-white"> {title}</div>
            <div
              className="p-2 border-circle bg-white text-center"
              style={{ width: '45px ', height: '45px' }}
            >
              <img
                className="mt-1"
                style={{ width: '22px', height: '22px' }}
                src={icon}
                alt=""
              />
            </div>
          </div>
          <div className="mt-4 text-5xl font-bold">
            <div className="border-circle text-white ">{heading}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
