"use client"

import React, { useState } from 'react';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { gridItems } from '@/data';
import axios from 'axios';



const Grid = () => {
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleQuerySubmit = async (query: string) => {
    // Sending the request in the same way as the working script
    console.log('Sending request...');
    
    const response = await axios.post('https://portfolio-bot-02-production.up.railway.app/chat', 
      { question: query }, // Send data with 'question' key
      {
        headers: {
          'Content-Type': 'application/json', // Correct header for sending JSON data
        },
      }
    );
  
    // Log the response data for debugging purposes
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
  
    // Check if the response contains an answer
    if (response.data && response.data.answer) {
      setChatResponse(response.data.answer); // Display the answer from the backend
    } else {
      setChatResponse('No answer found. Please try again.'); // Default message if no answer is found
    }
  };
  
  
  return (
    <section id="about">
      <BentoGrid>
        {gridItems.map(({ id, title, description, className, img, imgClassName, titleClassName, spareImg }) => (
          <BentoGridItem
          id={id}
          key={id}
          title={
            id === 2 ? (
              <div className="chat-box-container p-4 rounded-lg shadow-md">
                {/* Chat Header - Text in White */}
                <div className="chat-box-header text-lg font-semibold text-white mb-3">
                  Ask AI about me!
                </div>
            
                {/* Chat Input Area - User Query */}
                <textarea
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  placeholder="What is her skillset?"
                  className="text-sm font-medium inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#10132E] px-5 py-2 text-white backdrop-blur-3xl gap-2"
                  style={{ height: '50px' }} // Adjusted height
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Prevents new line
                      handleQuerySubmit(chatQuery);
                    }
                  }}
                />
            
                {/* Response Box with Smaller Font, Fixed Height */}
                <div
                className="flex flex-col pt-2 text-sm font-medium w-full h-40 cursor-pointer justify-start items-start rounded-lg bg-[#10132E] px-5 py-3 text-white backdrop-blur-3xl gap-2 overflow-y-auto"
                style={{
                  scrollbarWidth: "thin", // For Firefox
                  scrollbarColor: "rgba(255, 255, 255, 0.5) transparent",
                }}
              >
                {chatResponse && <div className="chat-response text-white">{chatResponse}</div>}
              </div>


              </div>
            ) 
             
            : (
              title
            )
          }
          description={description}
          className={className}
          img={img}
          imgClassName={imgClassName}
          titleClassName={titleClassName}
          spareImg={spareImg}
        />
        
        
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
