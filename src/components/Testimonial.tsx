import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import React, { HTMLAttributes, useEffect } from 'react'
import { twMerge } from 'tailwind-merge';
import useTextRevealAnimation from '@/hooks/useTextRevealAnimation';
import {motion, usePresence } from 'motion/react';

const Testimonial = (props: {
    quote: string;
    name: string;
    role: string;
    company: string;
    imagePositionY: number;
    image: string | StaticImport;
    className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const {quote,name,role,company,imagePositionY,image, className, ...rest} = props
  const {scope: quoteScope, entranceAnimation: quoteEntranceAnimation, exitAnimation: quoteExitAnimation} = useTextRevealAnimation()
  const {scope: citeScope, entranceAnimation: citeEntranceAnimation, exitAnimation: citeExitAnimation} = useTextRevealAnimation()
  const [isPresent,safeToRemove] = usePresence()

  useEffect(()=>{
    if(isPresent){
      quoteEntranceAnimation().then(()=>{
        citeEntranceAnimation()
      })
    }else{
      quoteExitAnimation().then(()=>{
        safeToRemove()
      })
    }
  },[isPresent,quoteEntranceAnimation,quoteExitAnimation,citeEntranceAnimation,citeExitAnimation,safeToRemove])
  return (
    <div key={name}>
              <div className={twMerge("grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center", className)} {...rest}>
                <div className="aspect-square md:aspect-[9/16] md:col-span-2 relative">
                  <motion.div 
                  initial={{
                    width:"100%"
                  }}
                  animate={{width: 0}}
                  exit={{
                    width: "100%"
                  }}
                  transition={{
                    duration: 0.5
                  }}
                  className='absolute h-full bg-stone-900'></motion.div>
                  <Image src={image} alt={name} className="size-full object-cover" style={{objectPosition: `50% ${imagePositionY*100}%`}} />
                </div>
                <blockquote className="md:col-span-3">
                  <div ref={quoteScope} className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0">
                    <span>&ldquo;</span>
                    {quote}
                    <span>&rdquo;</span>
                  </div>
                  <cite ref={citeScope} className="mt-4 md:mt-8 md:text-lg lg:text-xl not-italic block">
                    {name}, {role} at {company}
                  </cite>
                </blockquote>
              </div>
            </div>
  )
}

export default Testimonial