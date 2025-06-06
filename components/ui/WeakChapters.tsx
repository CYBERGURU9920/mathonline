import { chaptersData } from '@/app/data/chapters';
import { ChapterData } from '@/app/types';
import { Card, CardContent } from "./card";

interface WeakChaptersProps {
  subject: string;
}

const WeakChapters = ({ subject }: WeakChaptersProps) => {
  const weakChapters = chaptersData.filter(
    ch => ch.isWeakChapter && ch.subject === subject
  );

  const getTrend = (chapter: ChapterData) => {
    const year2025 = chapter.yearWiseQuestionCount["2025"] || 0;
    const year2024 = chapter.yearWiseQuestionCount["2024"] || 0;
    if (year2025 > year2024) return "up";
    if (year2025 < year2024) return "down";
    return "none";
  };

  return (
    <section className="w-full bg-white dark:bg-darkbg dark:text-white">
     
      <div className="flex flex-col w-full items-start gap-4 p-4 bg-white dark:bg-darkbg dark:text-white z-0">
        {weakChapters.map((chapter) => {
          const trend = getTrend(chapter);
          const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((a, b) => a + b, 0);

          return (
            <Card
              key={chapter.chapter}
              className="flex items-center gap-4 p-4 w-full bg-white dark:bg-darkbg rounded-xl border border-solid border-[#d1d8e0]"
            >
              <CardContent className="flex items-center gap-4 p-0 w-full">
                <img
                  className="w-6 h-6"
                  alt={`${chapter.chapter} icon`}
                  src="/chapter-icon.svg"
                />
                <div className="flex flex-col items-start gap-2 flex-1">
                  <div className="flex items-center gap-6 w-full">
                    <h3 className="flex-1 font-label-base-16 text-[#101319] dark:text-white">
                      {chapter.chapter}
                    </h3>
                    <div className="inline-flex flex-col items-start gap-2 self-stretch">
                      <div className="w-fit font-body-xs-12 text-right whitespace-nowrap">
                        <span className="text-[#505d79] dark:text-[#b0b8c4]">2025: </span>
                        <span className="text-[#505d79] dark:text-[#b0b8c4]">
                          {chapter.yearWiseQuestionCount["2025"]}Qs
                        </span>
                        {trend === "up" && (
                          <span className="text-[#007f42]"> ↑</span>
                        )}
                        {trend === "down" && (
                          <span className="text-[#e02a2f]"> ↓</span>
                        )}
                        <span className="text-[#505d79] dark:text-[#b0b8c4]"> | 2024: </span>
                        <span className="text-[#505d79] dark:text-[#b0b8c4]">
                          {chapter.yearWiseQuestionCount["2024"]}Qs
                        </span>
                      </div>
                    </div>
                    <span className="w-fit font-body-xs-12 text-[#d1d8e0] text-right whitespace-nowrap">
                      |
                    </span>
                    <span className="w-fit font-body-xs-12 text-[#505d79] dark:text-[#b0b8c4] text-right whitespace-nowrap">
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

export default WeakChapters;
