'use client'; // if you're using Next.js 13+
import {AnimatedBackground} from 'animated-backgrounds';
import {AnimatedText} from 'animated-backgrounds'
import { useState, useEffect } from 'react';
import { motion} from "framer-motion";
import '../calc.css';
import { useRef } from 'react';

export default function Calculator() {
  const [currentValue, setCurrentValue] = useState<string>('0');
  const [inputValue, setInputValue] = useState<string>('');
  const [operation, setOperation] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagePositions, setImagePositions] = useState<{ top: number; right: number }[]>([]);
  const [imagesVisible, setImagesVisible] = useState(false);

  const handleNumberClick = (num: string) => {
    setInputValue((prev) => prev + num); // append the clicked number to the input
  };

  const handleOperation = (op: string) => {
    
    const inputBase10 = parseInt(inputValue || '0', 7);
    const currentBase10 = parseInt(currentValue, 7)

    let newValue: number;

    if (operation){
        
        switch (op) {
            case 'add':
                newValue = currentBase10 + inputBase10
                break;
            case 'subtract':
                newValue = currentBase10 - inputBase10
                break;
            case 'multiply':
                newValue = currentBase10 * inputBase10
                break;
            case 'divide':  
                newValue = currentBase10 / inputBase10
                break;
            default:
                newValue = currentBase10;
        }
    }
    else {
        newValue = inputBase10;
    }

    setCurrentValue(newValue.toString(7));
    setInputValue('');
    setOperation(op);
  };

  const handleEquals = () => {
    if (!operation) {
    return;
  }

  const inputBase10 = parseInt(inputValue || '0', 7);
  const currentBase10 = parseInt(currentValue, 7);

  let newValue: number;

  switch (operation) {
    case 'add':
      newValue = currentBase10 + inputBase10;
      break;
    case 'subtract':
      newValue = currentBase10 - inputBase10;
      break;
    case 'multiply':
      newValue = currentBase10 * inputBase10;
      break;
    case 'divide':
      if (inputBase10 === 0) {
        setCurrentValue("Cannot divide by zero")
        return;
      }
      newValue = currentBase10 / inputBase10;
      break;
    default:
      newValue = currentBase10;
  }

    const newValueBase7 = newValue.toString(7);
    setCurrentValue(newValueBase7); // update the current value
    setOperation(null); // clear the operation
    setInputValue(''); // clear the input
  }

  const handleClear = () => {
    setCurrentValue('0');
    setInputValue('');
    setOperation(null);
  }

  const getOperationSymbol = (op: string) => {
    switch (op) {
        case 'add':
        return '+';
        case 'subtract':
        return '-';
        case 'multiply':
        return '×';
        case 'divide':
        return '÷';
        default:
        return '';
        }
    };

    const images = [
        '/usagitransp.png',
        '/hachiware.png',
        '/chiikawa.png'
    ]

    useEffect(() => {
    if (containerRef.current) {
      const containerBounds = containerRef.current.getBoundingClientRect();
      const newPositions = images.map(() => ({
        top: Math.random() * containerBounds.height-100,
        right: Math.random() * containerBounds.width-100,
      }));
      setImagePositions(newPositions);
      
      setImagesVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className='flex w-screen h-screen justify-center select-none'>
        {images.map((src: string, index: number) => (
        <motion.img
            key={index}
            initial={{ opacity: 0}}
            animate={{
            rotateY: [0, 360], opacity: imagesVisible ? 1 : 0, rotate: [0, 360]
            }}
            drag
            dragConstraints={containerRef}
            whileTap={{
            //   scale: 1.1,
            }}
            transition={{
            rotate: {
                duration: Math.random() * 10,
                ease: "linear",
                repeat: Infinity,
            },
            rotateY: {
                duration: Math.random() * 3,
                ease: "linear",
                repeat: Infinity,
            },
            opacity: {duration: 0.5},
            whileTap: {
                type: "spring",
                stiffness: 100,
            },
            }}
            src={src}
            style={{ 
                width: 250, 
                position: 'absolute', 
                top: imagePositions[index]?.top || 0, 
                right: imagePositions[index]?.right || 0, 
                zIndex: 2
            }}
        />
        ))}
        <div className='flexbox justify-items-center align-middle p-20 select-none'>

            <AnimatedBackground animationName='geometricShapes' blendMode='normal'/>
            <AnimatedBackground animationName='geometricShapes' blendMode='lighten' style={{opacity: .05}}/>
            <motion.h1 
            drag dragConstraints={{left: -100, right: 100, top: -50, bottom: 0}} dragElastic={0.5}
            className='font-comic-relief font-bold text-5xl mb-15 text-center text-shadow-2xs/10 text-shadow-white '>
                <AnimatedText
                    text="this is a base 7 calculator!"
                    effect='rainbow'
                    config={{
                    speed: 1000,
                    loop: true,
                    delay: 0,
                    color: '#FFFFFFFF'
            }}
                />
                <p className='text-3xl opacity-10'>btw u can drag me</p>
            </motion.h1>
            <motion.div
            className="calculator font-comic-relief"
            whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{
                scale:1.1,
            }}
            transition={{
            type: "spring",
            stiffness: 100,
            }}
            >
            <div className="display">
                <div className="result">
                {currentValue} {operation ? getOperationSymbol(operation) : ''}
                </div>
                <div className="current-value">{inputValue || currentValue}</div>
            </div>
            <div className="keypad">
                <button onClick={() => handleNumberClick('0')}>0</button>
                <button onClick={() => handleNumberClick('1')}>1</button>
                <button onClick={() => handleNumberClick('2')}>2</button>

                <button className='operators' onClick={() => handleOperation('add')}>+</button>

                <button onClick={() => handleNumberClick('3')}>3</button>
                <button onClick={() => handleNumberClick('4')}>4</button>
                <button onClick={() => handleNumberClick('5')}>5</button>
                <button className='operators' onClick={() => handleOperation('subtract')}>-</button>
                <div></div>
                <button onClick={() => handleNumberClick('6')}>6</button>
                <div></div>
                <button className='operators' onClick={() => handleOperation('multiply')}>×</button>
                <button className='operators' onClick={() => handleOperation('divide')}>÷</button>
                <button className='operators' onClick={handleClear}>C</button>
                <div></div>
                <button className='operators' onClick={handleEquals}>=</button>
            </div>
            </motion.div>
        </div>
    </div>
  );
}
