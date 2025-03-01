"use client";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";
import { FC, useEffect, useRef } from "react";


const Intro: FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const {scope,entranceAnimation} = useTextRevealAnimation()
  // const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    once: true,
  });

  useEffect(()=>{
    if(inView){
      entranceAnimation()
    }
  },[inView,entranceAnimation])

  // useEffect(() => {
  //   new SplitType(scope.current.querySelector("h2"), {
  //     types: "lines,words",
  //     tagName: "span",
  //   });
  // }, [scope]);

  // useEffect(() => {
  //   if (inView) {
  //     animate(
  //       scope.current.querySelectorAll(".word"),
  //       { transform: "translateY(0%)" },
  //       { duration: 0.5, delay: stagger(0.2) }
  //     );
  //   }
  // }, [inView,animate,scope]);
  return (
    <section  ref={sectionRef} className="section mt-12 md:mt-16 lg:mt-20" id="intro" >
      <div className="container">
        <h2 ref={scope} className="text-4xl md:text-7xl lg:text-8xl lg:w-[80%]">
          Building beautiful website with clean code and thoughtful design to
          help your business grow and stand out online
        </h2>
      </div>
    </section>
  );
};

export default Intro;
