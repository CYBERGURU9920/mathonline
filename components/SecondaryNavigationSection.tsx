"use client";

import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./card_responsive";

interface SecondaryNavigationSectionProps {
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

// This component now ONLY renders the DESKTOP sidebar navigation.
// Mobile tabs are handled in MainContentSection.
export const SecondaryNavigationSection = ({
  activeSubject,
  onSubjectChange,
}: SecondaryNavigationSectionProps) => {
  const navItems = [
    {
      id: 1,
      title: "Physics PYQs",
      icon: "/subject-icons.svg",
      subject: "Physics",
    },
    {
      id: 2,
      title: "Chemistry PYQs",
      icon: "/subject-icons-1.svg",
      subject: "Chemistry",
    },
    {
      id: 3,
      title: "Mathematics PYQs",
      icon: "/subject-icons-2.svg",
      subject: "Mathematics",
    },
  ];

  return (
    // This nav is hidden on mobile (hidden) and shown as a flex column on desktop (md:flex)
    <nav className="hidden md:flex flex-col w-[287px] h-full items-start bg-white dark:bg-darkbg dark:text-white border-r border-solid border-[#e5e7eb] dark:border-[#23272f]">
      {/* Desktop Header section */}
      <header className="flex flex-col w-full items-start px-0 py-6 bg-white dark:bg-darkbg dark:text-white">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-center gap-4 w-full">
            <img className="w-6 h-6" alt="JEE Main Logo" src="/exam-logo.png" />
            <h1 className="font-bold text-[#101319] dark:text-white text-xl leading-6">
              JEE Main
            </h1>
          </div>
          <div className="flex items-center justify-center gap-1 w-full">
            <p className="flex-1 text-center font-body-xs-12 text-[#505d79] dark:text-[#b0b8c4] text-[length:var(--body-xs-12-font-size)] tracking-[var(--body-xs-12-letter-spacing)] leading-[var(--body-xs-12-line-height)]">
              2025 - 2009 | 173 Papers | 15825 Qs
            </p>
          </div>
        </div>
      </header>

      {/* Desktop Navigation items container */}
      <div className="flex flex-col items-start gap-4 pt-4 pb-4 px-4 w-full bg-white dark:bg-darkbg">
        {navItems.map((item) => (
          <Card
            key={item.id}
            className={`flex h-12 items-center w-full rounded-xl overflow-hidden border-0 cursor-pointer transition-colors duration-150
              ${
                item.subject === activeSubject
                  ? "bg-[#1d2933] dark:bg-[#222E3F] text-white"
                  : "bg-white dark:bg-darkbg text-[#101319] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
              }
            `}
            onClick={() => onSubjectChange(item.subject)}
          >
            <CardContent className="flex items-center gap-4 md:pt-6  w-full bg-transparent relative">
              <img className="w-8 h-8" alt={`${item.title} icon`} src={item.icon} />
              <div
                className={`flex-1 flex justify-center items-center font-label-sm-14 text-[length:var(--label-sm-13-font-size)] tracking-[var(--label-sm-14-letter-spacing)] leading-[var(--label-sm-14-line-height)] whitespace-nowrap
                  ${
                    item.subject === activeSubject
                      ? "text-white"
                      : "text-inherit"
                  }`}
              >
                {item.title}
              </div>
              {/* Arrow absolutely positioned to always be 16px from the right */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                <ChevronRightIcon className={`w-5 h-5 ${item.subject === activeSubject ? "text-white/50" : "text-gray-400 dark:text-gray-600"}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </nav>
  );
};