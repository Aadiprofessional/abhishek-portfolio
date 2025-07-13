import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Matthis has a creative outlook in design. We can always count on him to deliver unique, interesting, and surprising designs for our brand.",
      name: "Joe Krug",
      role: "Founder @Finsweet",
      img: "https://i.pravatar.cc/40?img=1",
    },
    {
      text: "Matthis successfully created a trendy, modern, and dynamic website for the start-up Kumulus...",
      name: "Vanessa Gallerne",
      role: "Project Manager @CCPAGROUP",
      img: "https://i.pravatar.cc/40?img=2",
    },
    {
      text: "Matthis is an amazing professional. Very fast and talented. His best quality is being very creative!",
      name: "Eve Kayser",
      role: "Enterprise projects @Finsweet",
      img: "https://i.pravatar.cc/40?img=3",
    },
    {
      text: "Matthis was instrumental in helping us define and refine the branding direction and user interface...",
      name: "Jonas Beisswenger",
      role: "Co-founder Langdock.com",
      img: "https://i.pravatar.cc/40?img=4",
    },
    {
      text: "Matthis is a fantastic designer... patient, understanding, friendly, and professional.",
      name: "Rohan Ganachari",
      role: "Digital Operations Manager @Finsweet",
      img: "https://i.pravatar.cc/40?img=5",
    },
  ];

  return (
    <section className="bg-black text-white px-6 md:px-16 py-24 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between gap-12 relative">
        {/* Left Quote */}
        <div className="md:w-1/2">
          <p className="text-4xl md:text-5xl font-semibold leading-snug">
            It only serves to show what sort of person a man must be who can't even get testimonials.
            No, if a man brings references, it proves nothing. If he can't, it proves a great deal.
          </p>
          <p className="mt-6 text-lg text-gray-400">— Joseph Pulitzer</p>

          {/* Marquee Belt */}
    <div className="mt-56 w-3xl overflow-hidden relative h-56">
  <motion.div
    className="absolute flex items-center gap-10 text-[4vw] font-bold whitespace-nowrap"
    initial={{ x: 0 }}
    animate={{ x: '-50%' }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    {Array(20).fill(0).map((_, i) => (
      <div key={i} className="flex items-center gap-12">
        <span>TESTIMONIALS</span>
        <div className="w-40 h-40 rounded-xl bg-neutral-800 border border-white/10 flex items-center justify-center text-xs text-gray-500">
          VIDEO
        </div>
      </div>
    ))}
  </motion.div>
</div>


        </div>

        {/* Right Testimonials */}
        <div className="md:w-1/2 space-y-10">
          {testimonials.map((item, index) => (
            <div key={index} className="border-b border-gray-700 pb-6 space-y-3">
              <p className="text-base text-white/90">{item.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
                <img
  src={item.img}
  alt={item.name}
  className="w-10 h-10 rounded-md object-cover grayscale border border-white/50"
/>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
