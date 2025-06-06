"use client";

import { ArrowUpDownIcon, ChevronDownIcon, ArrowLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./card_responsive";
import { Separator } from "./ui/separator";
import { chaptersData } from "@/app/data/chapters";
import { ChapterData } from "@/app/types";


interface MainContentSectionProps {
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

const getTrend = (chapter: ChapterData) => {
  const year2025 = chapter.yearWiseQuestionCount["2025"] || 0;
  const year2024 = chapter.yearWiseQuestionCount["2024"] || 0;
  if (year2025 > year2024) return "up";
  if (year2025 < year2024) return "down";
  return "none";
};

const subjectDetails = [
  {
    title: "Physics PYQs",
    shortTitle: "Phy",
    icon: "/subject-icons.svg",
    subject: "Physics",
  },
  {
    title: "Chemistry PYQs",
    shortTitle: "Chem",
    icon: "/subject-icons-1.svg",
    subject: "Chemistry",
  },
  {
    title: "Mathematics PYQs",
    shortTitle: "Math",
    icon: "/subject-icons-2.svg",
    subject: "Mathematics",
  },
];

const getSubjectIcon = (subject: string): string => {
  return subjectDetails.find(s => s.subject === subject)?.icon || "/default-icon.svg";
};

export const MainContentSection = ({ activeSubject, onSubjectChange }: MainContentSectionProps) => {
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [notStartedOnly, setNotStartedOnly] = useState<boolean>(false);
  const [weakFilterActive, setWeakFilterActive] = useState<boolean>(false);

  const classDropdownRef = useRef<HTMLDivElement>(null);
  const unitDropdownRef = useRef<HTMLDivElement>(null);

  const [showMobileClassDropdown, setShowMobileClassDropdown] = useState(false);
  const [showMobileUnitDropdown, setShowMobileUnitDropdown] = useState(false);

  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" ? document.body.classList.contains("dark") : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleToggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    setSelectedClass(null);
    setSelectedUnit(null);
    setNotStartedOnly(false);
    setWeakFilterActive(false);
    setShowClassDropdown(false);
    setShowUnitDropdown(false);
    setShowMobileClassDropdown(false);
    setShowMobileUnitDropdown(false);
  }, [activeSubject]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        classDropdownRef.current && !classDropdownRef.current.contains(event.target as Node) &&
        unitDropdownRef.current && !unitDropdownRef.current.contains(event.target as Node)
      ) {
        setShowClassDropdown(false);
        setShowUnitDropdown(false);
        setShowMobileClassDropdown(false);
        setShowMobileUnitDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const classOptions = Array.from(
    new Set(chaptersData.filter(ch => ch.subject === activeSubject).map(ch => ch.class))
  );
  const unitOptions = Array.from(
    new Set(chaptersData.filter(ch => ch.subject === activeSubject).map(ch => ch.unit))
  );

  const filteredChapters = chaptersData.filter(
    ch =>
      ch.subject === activeSubject &&
      (!selectedClass || ch.class === selectedClass) &&
      (!selectedUnit || ch.unit === selectedUnit) &&
      (!notStartedOnly || ch.status === "Not Started") &&
      (!weakFilterActive || ch.isWeakChapter)
  );

  const weakChaptersCount = chaptersData.filter(
    ch => ch.isWeakChapter && ch.subject === activeSubject
  ).length;

  const darkModeLabel = isDark ? "🌙" : "☀️";

  return (
    <section className="flex flex-col w-full flex-1 min-h-0 items-start bg-[#f2f5fb] dark:bg-darkbg dark:text-white md:border-l md:border-solid md:border-[#A9A9A9] dark:md:border-[#23272f] overflow-y-auto [&::-webkit-scrollbar]:hidden relative">

      {/* --- Mobile Header (Sticky) --- */}
       <header className="md:hidden flex items-center justify-between w-full p-4 bg-white dark:bg-darkbg border-b dark:border-[#23272f] sticky top-0 z-20">
        <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg text-gray-900 dark:text-white">JEE Main</h1>
        {/* Mobile Dark Mode Button */}
        <Button
          className="px-3 py-1 rounded transition-colors duration-200 text-xs bg-gray-200 text-black dark:bg-[#101319] dark:text-yellow-400 dark:border dark:border-yellow-400"
          onClick={handleToggleDarkMode}
        >
          {darkModeLabel}
        </Button>
      </header>
      {/* --- Mobile Subject Tabs --- */}
      <div className="md:hidden flex flex-row items-start justify-around pt-0 pb-0 px-0 w-full bg-white dark:bg-darkbg border-b border-solid border-[#e5e7eb] dark:border-[#23272f] z-10">
        {subjectDetails.map((item) => (
          <div
            key={item.subject}
            className={`flex flex-col flex-1 items-center justify-center gap-1 px-2 py-3 border-b-2 cursor-pointer transition-colors duration-150
              ${
                item.subject === activeSubject
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-[#505d79] dark:text-[#b0b8c4]"
              }
              hover:bg-gray-100 dark:hover:bg-gray-800/50
            `}
            onClick={() => onSubjectChange(item.subject)}
          >
            <img className="w-6 h-6" alt={`${item.shortTitle} icon`} src={item.icon} />
            <div className="font-medium text-sm whitespace-nowrap">
              {item.shortTitle}
            </div>
          </div>
        ))}
      </div>

      {/* --- Desktop Header --- */}
      <header className="hidden md:flex flex-col w-full items-start pt-6 pb-4 px-6 bg-white dark:bg-darkbg dark:text-white z-10 relative border-b border-solid border-[#e5e7eb] dark:border-[#23272f]">
        <button
          className="absolute top-4 right-4 px-3 py-1 rounded transition-colors duration-200 text-xs
            bg-gray-200 text-black
            dark:bg-[#101319] dark:text-yellow-400 dark:border dark:border-yellow-400
            z-20"
          onClick={handleToggleDarkMode}
        >
          {darkModeLabel}
        </button>
        <div className="flex items-start w-full">
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="inline-flex items-center justify-center gap-4">
              <img
                className="w-6 h-6"
                alt="Subject icon"
                src={getSubjectIcon(activeSubject)}
              />
              <h1 className="w-fit font-bold text-[#101319] dark:text-white text-xl text-center tracking-[0] leading-6 whitespace-nowrap">
                {activeSubject} PYQs
              </h1>
            </div>
            <p className="w-fit font-normal text-[#505d79] dark:text-[#b0b8c4] text-sm text-center tracking-[0] leading-[18.2px] whitespace-nowrap">
              Chapter-wise Collection of {activeSubject} PYQs
            </p>
          </div>
          <div className="w-14 h-14 flex-shrink-0"></div>
        </div>
      </header>

      {/* --- Filter Section --- */}
      <div className="relative flex w-full items-center gap-2 px-4 py-7 bg-white dark:bg-darkbg dark:text-white z-10 border-b border-solid border-[#e5e7eb] dark:border-[#23272f] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden md:overflow-visible md:whitespace-normal md:flex-wrap">
        {/* Class Filter (Desktop Dropdown) */}
        <div ref={classDropdownRef} className="relative hidden md:inline-block">
          <Button
            variant="outline"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-solid transition-colors duration-150 text-sm
              ${showClassDropdown ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900" : "border-[#d1d8e0] dark:border-[#3a3f47]"}
              bg-white dark:bg-[#181c23] dark:text-white shadow-sm hover:border-blue-400`}
            onClick={() => setShowClassDropdown((prev) => !prev)}
          >
            <span className="font-medium">{selectedClass || "Class"}</span>
            <ChevronDownIcon className="w-4 h-4 opacity-70" />
          </Button>
          {showClassDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-[#23272f] border border-[#d1d8e0] dark:border-[#23272f] rounded-lg shadow-lg z-30 min-w-[140px]">
              <div
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer rounded-t-lg text-sm"
                onClick={() => { setSelectedClass(null); setShowClassDropdown(false); }}
              >
                All Classes
              </div>
              {classOptions.map(cls => (
                <div
                  key={cls}
                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer text-sm"
                  onClick={() => { setSelectedClass(cls); setShowClassDropdown(false); }}
                >
                  {cls}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Class Filter (Mobile Chip) */}
        <div className="relative md:hidden flex-shrink-0">
          <Button
            variant="outline"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-solid transition-colors duration-150 text-xs
              ${selectedClass ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "border-[#d1d8e0] dark:border-[#3a3f47] bg-white dark:bg-[#181c23] dark:text-white"}`}
            onClick={() => setShowMobileClassDropdown((prev) => !prev)}
          >
            <span>{selectedClass || "Class"}</span>
            <ChevronDownIcon className="w-3 h-3 opacity-70" />
          </Button>
          {showMobileClassDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-[#23272f] border border-[#d1d8e0] dark:border-[#23272f] rounded-lg shadow-lg z-[9999] min-w-[120px]">
              <div
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer rounded-t-lg text-xs"
                onClick={() => { setSelectedClass(null); setShowMobileClassDropdown(false); }}
              >
                All Classes
              </div>
              {classOptions.map(cls => (
                <div
                  key={cls}
                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer text-xs"
                  onClick={() => { setSelectedClass(cls); setShowMobileClassDropdown(false); }}
                >
                  {cls}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unit Filter (Desktop Dropdown) */}
        <div ref={unitDropdownRef} className="relative hidden md:inline-block">
          <Button
            variant="outline"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-solid transition-colors duration-150 text-sm
              ${showUnitDropdown ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900" : "border-[#d1d8e0] dark:border-[#3a3f47]"}
              bg-white dark:bg-[#181c23] dark:text-white shadow-sm hover:border-blue-400`}
            onClick={() => setShowUnitDropdown((prev) => !prev)}
          >
            <span className="font-medium">{selectedUnit || "Unit"}</span>
            <ChevronDownIcon className="w-4 h-4 opacity-70" />
          </Button>
          {showUnitDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-[#23272f] border border-[#d1d8e0] dark:border-[#23272f] rounded-lg shadow-lg z-50 min-w-[140px]">
              <div
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer rounded-t-lg text-sm"
                onClick={() => { setSelectedUnit(null); setShowUnitDropdown(false); }}
              >
                All Units
              </div>
              {unitOptions.map(unit => (
                <div
                  key={unit}
                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer text-sm"
                  onClick={() => { setSelectedUnit(unit); setShowUnitDropdown(false); }}
                >
                  {unit}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Unit Filter (Mobile Chip) */}
        <div className="relative md:hidden flex-shrink-0">
          <Button
            variant="outline"
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-solid transition-colors duration-150 text-xs
              ${selectedUnit ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "border-[#d1d8e0] dark:border-[#3a3f47] bg-white dark:bg-[#181c23] dark:text-white"}`}
            onClick={() => setShowMobileUnitDropdown((prev) => !prev)}
          >
            <span>{selectedUnit || "Unit"}</span>
            <ChevronDownIcon className="w-3 h-3 opacity-70" />
          </Button>
          {showMobileUnitDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-[#23272f] border border-[#d1d8e0] dark:border-[#23272f] rounded-lg shadow-lg z-[9999] min-w-[120px]">
              <div
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer rounded-t-lg text-xs"
                onClick={() => { setSelectedUnit(null); setShowMobileUnitDropdown(false); }}
              >
                All Units
              </div>
              {unitOptions.map(unit => (
                <div
                  key={unit}
                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-[#2e353e] cursor-pointer text-xs"
                  onClick={() => { setSelectedUnit(unit); setShowMobileUnitDropdown(false); }}
                >
                  {unit}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Not Started Filter Chip */}
        <Button
          variant="outline"
          className={`flex flex-shrink-0 items-center gap-2 px-3 py-1.5 rounded-full border border-solid transition-colors duration-150 text-xs md:text-sm
            ${notStartedOnly ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "border-[#d1d8e0] dark:border-[#3a3f47] bg-white dark:bg-[#181c23] dark:text-white"}`}
          onClick={() => setNotStartedOnly((prev) => !prev)}
        >
          Not Started
        </Button>
        <Button
          variant="outline"
          className={`flex flex-shrink-0 items-center gap-2 px-3 py-1.5 rounded-full border border-solid transition-colors duration-150 text-xs md:text-sm
            ${weakFilterActive ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" : "border-[#d1d8e0] dark:border-[#3a3f47] bg-white dark:bg-[#181c23] dark:text-white"}`}
          onClick={() => setWeakFilterActive((prev) => !prev)}
        >
          Weak Chapters
        </Button>

        {/* Desktop Separator */}
        <Separator
          orientation="vertical"
          className="h-6 bg-[#d1d8e0] dark:bg-[#3a3f47] rounded-xl hidden md:block mx-2"
        />
      </div>

      {/* --- Chapter Count and Sort Section --- */}
      <div className="flex w-full min-h-12 items-center justify-between px-4 py-2 bg-white dark:bg-darkbg dark:text-white z-[5] border-b border-solid border-[#e5e7eb] dark:border-[#23272f]">
        <p className="text-sm text-[#505d79] dark:text-[#b0b8c4]">
          {weakFilterActive
            ? `Showing weak chapters (${weakChaptersCount})`
            : `Showing all chapters (${filteredChapters.length})`}
        </p>
        <Button
          variant="ghost"
          className="h-9 items-center justify-center gap-0.5 px-1 py-2 rounded-[10px] border border-solid border-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <ArrowUpDownIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Sort</span>
        </Button>
      </div>

      {/* --- Chapter List --- */}
      <div className="flex flex-col w-full items-start gap-3 md:gap-4 p-4 z-0 flex-1">
        {filteredChapters.map((chapter) => {
          const trend = getTrend(chapter);
          const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((a, b) => a + b, 0);

          return (
            <Card
              key={chapter.chapter}
              className="flex items-center gap-3 p-4 w-full bg-white dark:bg-[#181c23] rounded-xl border border-solid border-[#e5e7eb] dark:border-[#23272f] shadow-sm md:gap-4"
            >
              <CardContent className="flex items-center gap-3 p-0 w-full md:gap-4">
                <img
                  className="w-6 h-6 flex-shrink-0"
                  alt={`${chapter.chapter} icon`}
                  src={chapter.icon || "/chapter-icon.svg"}
                />
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 flex-1">
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <h3 className="font-medium text-base text-[#101319] dark:text-white line-clamp-2 md:line-clamp-1">
                      {chapter.chapter}
                    </h3>
                    <div className="font-normal text-xs text-[#505d79] dark:text-[#b0b8c4] whitespace-nowrap">
                      <span>2025: </span>
                      <span>{chapter.yearWiseQuestionCount["2025"]}Qs</span>
                      {trend === "up" && <span className="text-[#007f42]"> ↑</span>}
                      {trend === "down" && <span className="text-[#e02a2f]"> ↓</span>}
                      <span className="mx-1">|</span>
                      <span>2024: </span>
                      <span>{chapter.yearWiseQuestionCount["2024"]}Qs</span>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex justify-end md:justify-start">
                    <span className="font-medium text-sm text-[#505d79] dark:text-[#b0b8c4] whitespace-nowrap mt-1 md:mt-0">
                      {chapter.questionSolved}/{totalQuestions} Qs
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
