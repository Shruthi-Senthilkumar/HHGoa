import React from "react";
import Image from "next/image";
import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

export function FrameArtifact() {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}
      </style>
      <div className="relative aspect-[3/4.5] w-full max-w-sm rounded-[1.5rem] border-[1px] border-black/10 bg-[#f5f5f0] shadow-[0_0_40px_rgba(255,205,0,0.2)] hover:shadow-[0_0_60px_rgba(230,0,103,0.3)] overflow-hidden group animate-float transition-all duration-700 hover:-translate-y-4 ring-1 ring-white/30">
      
      {/* Frame Content */}
      <div className="relative h-full w-full p-6 flex flex-col justify-between text-black">
        
        {/* Top Header */}
        <div className="flex justify-between items-start border-b border-black/10 pb-4">
          <Heading level="h3" size="xl" className="uppercase font-black leading-tight !text-black tracking-wide">
            Hackerhouse<br />Goa
          </Heading>
          <Text mono size="sm" className="font-semibold !text-black/70">
            HH26-X6T7
          </Text>
        </div>

        {/* Center Circular Profile Image */}
        <div className="flex-1 flex items-center justify-center py-6 border-b border-black/10">
          <div className="w-48 h-48 rounded-full overflow-hidden border-[2px] border-[#e6ebdf] bg-[#e6ebdf] relative">
             <Image 
               src="/profile.jpg" 
               alt="Builder Profile" 
               fill 
               className="object-cover" 
               sizes="(max-width: 768px) 192px, 192px"
             />
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="pt-4 flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <Heading level="h2" className="text-3xl font-black uppercase !text-black leading-none tracking-[0.15em] mb-3">
                NAME
              </Heading>
              <Text mono size="sm" className="uppercase tracking-[0.4em] font-semibold !text-black/60">
                ROLE
              </Text>
            </div>
            {/* Mock QR Code */}
            <div className="w-16 h-16 bg-white p-1 border border-black/10 flex-shrink-0">
               {/* Just a simple SVG representing a QR code for mockup */}
               <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                 <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm8-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                 <path d="M12 3h2v2h-2zm0 4h2v2h-2zm-2-2h2v2h-2zm2 8h2v2h-2zm-2-2h2v2h-2zm0 6h2v2h-2zm-2-2h2v2h-2zm-2-2h2v2h-2z" />
               </svg>
            </div>
          </div>

          <div className="flex justify-between items-end">
             <div className="flex flex-col">
               <Text mono size="xs" className="text-[0.65rem] font-bold !text-black/80 uppercase">
                 BATCH
               </Text>
               <Text mono size="xs" className="text-[0.65rem] font-bold !text-black/80 uppercase">
                 BUILT IN GOA
               </Text>
             </div>
             {/* Mock Barcode */}
             <div className="h-10 w-48 overflow-hidden bg-black/5 opacity-80 flex gap-0.5 px-1 py-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="h-full bg-black" style={{ width: Math.random() > 0.5 ? '2px' : '4px', opacity: Math.random() > 0.3 ? 1 : 0 }} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
