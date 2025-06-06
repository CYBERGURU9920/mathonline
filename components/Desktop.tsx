"use client";

import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { MainContentSection } from "./MainContentSection";
import { SecondaryNavigationSection } from "./SecondaryNavigationSection";

// This component orchestrates the overall layout
export const Desktop = () => {
  const [activeSubject, setActiveSubject] = useState("Physics");

  return (
    // Base container - flex-col for mobile stacking, md:flex-row for desktop side-by-side
    <div className="bg-white dark:bg-darkbg dark:text-white flex flex-col md:flex-row justify-center w-full min-h-screen">
      {/* Max width container - Adjust flex direction based on screen size */}
      <div className="bg-white dark:bg-darkbg dark:text-white w-full max-w-[1360px] relative flex flex-col md:flex-row h-screen">
        
        {/* Secondary Navigation */}
        <SecondaryNavigationSection
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
        />

        {/* Main Content Area */}
        <MainContentSection
          activeSubject={activeSubject}
          onSubjectChange={setActiveSubject}
        />
      </div>
    </div>
  );
};