"use client";

import React, { useState } from 'react';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { gridItems } from '@/data';
import axios from 'axios';

const Grid = () => {
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleQuerySubmit = async (query: string) => {
    console.log('Sending request...');
    const response = await axios.post(
      'https://portfolio-bot-02-production.up.railway.app/chat',
      { question: query },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    if (response.data && response.data.answer) {
      setChatResponse(response.data.answer);
    } else {
      setChatResponse('No answer found. Please try again.');
    }
  };

  return (
    <section id="about">
      <BentoGrid>
        {gridItems
        
        .map(
          ({ id, title, description, className, img, imgClassName, titleClassName, spareImg }) => (
            <BentoGridItem
              id={id}
              key={id}
              title={
                /*
                id === 2 ? (
                  <div className="chat-box-container p-4 rounded-lg shadow-md">
                    <div className="chat-box-header text-lg font-semibold text-white mb-3">
                      Ask AI about me!
                    </div>

                    <textarea
                      value={chatQuery}
                      onChange={(e) => setChatQuery(e.target.value)}
                      placeholder="What is her skillset?"
                      className="text-sm font-medium inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#10132E] px-5 py-2 text-white backdrop-blur-3xl gap-2"
                      style={{ height: '50px' }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleQuerySubmit(chatQuery);
                        }
                      }}
                    />

                    <div
                      className="flex flex-col pt-2 text-sm font-medium w-full h-40 cursor-pointer justify-start items-start rounded-lg bg-[#10132E] px-5 py-3 text-white backdrop-blur-3xl gap-2 overflow-y-auto"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(255, 255, 255, 0.5) transparent",
                      }}
                    >
                      {chatResponse && (
                        <div className="chat-response text-white">{chatResponse}</div>
                      )}
                    </div>
                  </div>
                ) : (
                  title
                )
                */
                title
              }
              description={description}
              className={className}
              img={img}
              imgClassName={imgClassName}
              titleClassName={titleClassName}
              spareImg={spareImg}
            />
          )
        )}
      </BentoGrid>
    </section>
  );
};

export default Grid;
