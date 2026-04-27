const serviceColumns = [
  [
    'Residential Construction',
    'Commercial Construction',
    'Industrial Construction',
    'Renovation & Remodeling',
    'Interior Fit-Out Works',
  ],
  [
    'Electrical Wiring & Installation.',
    'Plumbing & Drainage Systems.',
    'HVAC (Heating, Ventilation).',
    'Firefighting & Safety Systems.',
    'Solar & Energy Solutions.',
  ],
  [
    'Foundation & Structural Work.',
    'Concrete & Masonry Services.',
    'Steel Structure Fabrication.',
    'Road & Highway Works.',
    'Bridge & Infrastructure.',
  ],
  [
    'Plastering, Painting & Decor.',
    'Tiling, Flooring & Ceilings.',
    'Carpentry & Joinery.',
    'Glass & Aluminum Works.',
    'Interior Fixtures & Details.',
  ],
];

const WhatWeBuildSection = () => {
  return (
    <section className="w-full bg-[#fff] px-4 sm:px-6 md:px-12 lg:px-[135px] py-16 md:py-[100px]">
      <div className="mx-auto w-full max-w-[1920px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-heading text-[36px] leading-[1] font-extrabold tracking-[-0.02em] text-black md:text-[42px] lg:text-[70px] uppercase">
            WHAT WE BUILD
          </h2>

          <p className="max-w-[400px] text-[16px] leading-[1.6] font-medium text-[#3f3f3f] md:text-[18px]">
            Shaping dynamic spaces that foster innovation and unlock human potential
          </p>
        </div>

        <div className="mt-[30px] h-[1px] w-full bg-[#dddddd]" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {serviceColumns.map((column, index) => (
            <div
              key={`column-${index}`}
              className={`py-1 md:py-2 ${
                index < serviceColumns.length - 1 ? 'lg:border-r lg:border-[#dddddd] lg:pr-6' : ''
              } ${index > 0 ? 'lg:pl-6' : ''}`}
            >
              <ul className="flex flex-col gap-[14px] build_services_list">
                {column.map((service) => (
                  <li key={service} className="flex items-center gap-2.5">
                    <span className="h-[7px] w-[7px] rounded-full bg-[#ff5a1f]" />
                    <span className="text-[15px] leading-[1.4] font-medium text-[#222222]">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuildSection;
