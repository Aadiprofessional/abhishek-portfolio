import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Abhishek's AI solutions have transformed our business operations. His innovative approach to machine learning and deep understanding of technology makes him an exceptional developer.",
      name: "Bill Kong",
      role: "CEO @MatrixAI",
      img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e11d48'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='16' font-weight='bold'%3EBK%3C/text%3E%3C/svg%3E",
    },
    {
      text: "Working with Abhishek on backend development has been incredible. His technical expertise and problem-solving skills are outstanding. He delivers robust, scalable solutions every time.",
      name: "Harshit",
      role: "Backend Developer @Appyard",
      img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2306b6d4'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='16' font-weight='bold'%3EH%3C/text%3E%3C/svg%3E",
    },
    {
      text: "Abhishek consistently exceeds expectations in project delivery. His attention to detail and ability to manage complex AI projects makes him an invaluable team member.",
      name: "Shivendra Mall",
      role: "Project Manager @Appyard",
      img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2384cc16'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='16' font-weight='bold'%3ESM%3C/text%3E%3C/svg%3E",
    },
    {
      text: "As a co-founder, I've worked with many developers, but Abhishek's leadership in AI projects and his innovative thinking sets him apart. He's a true technology visionary.",
      name: "Akshya Akash",
      role: "Co-founder & Project Leader @Stimuler",
      img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23f59e0b'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='16' font-weight='bold'%3EAA%3C/text%3E%3C/svg%3E",
    },
    {
      text: "Abhishek delivered exceptional freelance work for our AI-powered application. His professionalism, technical skills, and timely delivery made our collaboration seamless and successful.",
      name: "Afnan & Sana",
      role: "Freelance Clients",
      img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%238b5cf6'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='white' font-size='14' font-weight='bold'%3EA%2526S%3C/text%3E%3C/svg%3E",
    },
  ];

  return (
    <section className="bg-black text-white px-6 md:px-16 py-24 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between gap-12 relative">
        {/* Left Quote */}
        <div className="md:w-1/2">
          <p className="text-4xl md:text-5xl font-semibold leading-snug">
            Building AI solutions that transform businesses isn't just about code—it's about understanding problems deeply and crafting intelligent systems that make a real difference.
          </p>
          <p className="mt-6 text-lg text-gray-400">— Abhishek Srivastava, AI Developer & Innovator</p>

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
        <img 
          src="/test.gif" 
          alt="Video content" 
          className="w-40 h-40 rounded-xl object-cover border border-white/10"
        />
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
