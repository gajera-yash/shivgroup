import { FiCheck } from 'react-icons/fi';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const checklistItems = [
  'Engineer Lasting Value',
  'Construct With Purpose',
  'Engineer Lasting Value',
  'Deliver With Integrity',
];

const sliderItems = [
  {
    type: 'image',
    image: '/shivgroup/images/project/project-1.jpg',
    alt: 'Construction worker working on site',
  },
  {
    type: 'lightStat',
    value: '400+',
    title: 'COMPLETED PROJECTS',
    description:
      'All Projects delivered with precision, quality, and consistent 100% of clients satisfaction',
  },
  {
    type: 'image',
    image: '/shivgroup/images/project/project-2.jpg',
    alt: 'Construction machinery and team at work',
  },
  {
    type: 'darkStat',
    value: '₹1.5B+',
    title: 'PROJECT VALUE DELIVERED',
    description:
      'Total value of construction projects successfully completed, delivered, and trusted by clients worldwide',
  },
  {
    type: 'image',
    image: '/shivgroup/images/project/project-3.jpg',
    alt: 'Road infrastructure construction project',
  },
  {
    type: 'lightStat',
    value: '25+',
    title: 'YEARS OF EXPERIENCE',
    description:
      'Decades of dependable execution across infrastructure, construction, and property development projects',
  },
  {
    type: 'image',
    image: '/shivgroup/images/project/project-3.jpg',
    alt: 'Road infrastructure construction project',
  },
  {
    type: 'primaryStat',
    value: '98%',
    title: 'ON-TIME DELIVERY',
    description:
      'Projects executed with strict planning and milestone tracking to maintain reliable delivery timelines',
  },
  {
    type: 'image',
    image: '/shivgroup/images/project/project-3.jpg',
    alt: 'Road infrastructure construction project',
  },
  {
    type: 'lightStat',
    value: '25+',
    title: 'YEARS OF EXPERIENCE',
    description:
      'Decades of dependable execution across infrastructure, construction, and property development projects',
  },
  {
    type: 'image',
    image: '/shivgroup/images/project/project-1.jpg',
    alt: 'Construction project showcase',
  },
  {
    type: 'darkStat',
    value: '100%',
    title: 'CLIENT SATISFACTION',
    description:
      'Our commitment to quality ensures every client is satisfied with the end result of their project',
  },
];

const AboutShowcaseSection = () => {
  return (
    <section className="w-full bg-[#f5f5f5] py-16 md:py-20 overflow-hidden"  style={{
        paddingTop: '100px',
        paddingBottom: '100px',
      }}>
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 lg:px-12 mb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 align-items-center">
          <h2 className="lg:col-span-9 font-heading text-[36px] leading-[1.05] font-bold text-black md:text-[46px] lg:text-[56px]">
            <span className="block lg:whitespace-nowrap">A TRUSTED NAME IN INFRASTRUCTURE,</span>
            <span className="block lg:whitespace-nowrap">CONSTRUCTION, AND PROPERTY.</span>
          </h2>

          <ul className="lg:col-span-3 flex flex-col gap-4 pt-1">
            {checklistItems.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e7e7e7] text-[#111]">
                  <FiCheck className="text-[13px]" />
                </span>
                <span className="text-[18px] font-medium text-[#2f2f2f] md:text-[20px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mt-10">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={900}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          spaceBetween={16}
          slidesPerView="auto"
          className="px-4 md:px-8 lg:px-12"
        >
          {sliderItems.map((item, index) => (
            <SwiperSlide key={`${item.type}-${index}`} className="!w-[290px]">
              {item.type === 'image' ? (
                <div className="h-[320px] w-full overflow-hidden bg-white">
                  <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ) : (
                <div
                  className={`flex h-[320px] w-full flex-col justify-between p-7 md:p-8 ${
                    item.type === 'darkStat'
                      ? 'bg-[#121212] text-white'
                      : item.type === 'primaryStat'
                        ? 'bg-primary text-white'
                        : 'bg-[#e6e5db] text-[#111111] '
                  }`}
                >
                  <div>
                    <p className="font-heading font-bold text-[56px] leading-none">{item.value}</p>
                    <p className="!mt-3 font-heading font-semibold text-[24px] leading-none">{item.title}</p>
                  </div>
                  <p
                    className={`max-w-[95%] text-[15px] leading-[1.55] ${
                      item.type === 'darkStat' || item.type === 'primaryStat'
                        ? 'text-white/90'
                        : 'text-[#3d3d3d]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AboutShowcaseSection;