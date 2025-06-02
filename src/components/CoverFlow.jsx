import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const images = [
  'https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0fGVufDB8fDB8fHww',
  
];

const CoverFlow = () => {
  const containerRef = useRef(null);
  const proxyRef = useRef(null);
  const animationRef = useRef(null);
  const draggableRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const proxy = proxyRef.current;
    const items = gsap.utils.toArray('.coverflow-item');

    const spacing = 300;
    const wrap = gsap.utils.wrap(-spacing * items.length, 0);

    gsap.set(items, {
      x: (i) => i * spacing,
    });

    const update = () => {
      const x = gsap.getProperty(proxy, 'x');
      items.forEach((item, i) => {
        const position = wrap(x + i * spacing);
        gsap.set(item, {
          x: position,
          scale: 1 - Math.abs(position / spacing) * 0.2,
          zIndex: -Math.abs(Math.round(position / spacing)),
        });
      });
    };

    animationRef.current = gsap.to({}, {
      duration: 0.1,
      onUpdate: update,
    });

    draggableRef.current = Draggable.create(proxy, {
      type: 'x',
      inertia: true,
      onDrag: update,
      onThrowUpdate: update,
    })[0];

    return () => {
      animationRef.current.kill();
      draggableRef.current.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='w-full h-[400px] overflow-hidden bg-black flex justify-center items-center relative'
      
    >
      <div
        ref={proxyRef}
        className='absolute hidden'
        
      ></div>
      {images.map((src, index) => (
        <div
          key={index}
          className="coverflow-item absolute w-[200px] h-[300px] rounded-xl bg-[https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D]"
          
        ></div>
      ))}
    </div>
  );
};

export default CoverFlow;
