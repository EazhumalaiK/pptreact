import React, { useState } from "react";

interface Slide {
  id: number;
  content: string;
  recommendations: Recommendation[];
}

interface Recommendation {
  id: string;
  category: RecommendationCategory;
  text: string;
  highlightText: string; // exact text snippet to highlight on hover
}

type RecommendationCategory = "Format" | "Numeric" | "Language" | "Narrative";

const categories: RecommendationCategory[] = [
  "Format",
  "Numeric",
  "Language",
  "Narrative",
];

// Realistic recommendations examples per category
const exampleRecommendations: {
  [key in RecommendationCategory]: (slideNum: number) => Recommendation[];
} = {
  Format: (slideNum) => [
    {
      id: `${slideNum}-Format-1`,
      category: "Format",
      text: "Fix double spaces found between words.",
      highlightText: "  ", // double space
    },
    {
      id: `${slideNum}-Format-2`,
      category: "Format",
      text: "Ensure bullet points start with capital letters.",
      highlightText: "bullet points",
    },
    {
      id: `${slideNum}-Format-3`,
      category: "Format",
      text: "Check consistent use of punctuation marks at sentence ends.",
      highlightText: ".",
    },
  ],
  Numeric: (slideNum) => [
    {
      id: `${slideNum}-Numeric-1`,
      category: "Numeric",
      text: "Incorrect numeric format found: '1000' should be '1,000'.",
      highlightText: "1000",
    },
    {
      id: `${slideNum}-Numeric-2`,
      category: "Numeric",
      text: "Percentages should include the % sign (e.g., 50%).",
      highlightText: "50",
    },
  ],
  Language: (slideNum) => [
    {
      id: `${slideNum}-Language-1`,
      category: "Language",
      text: "Grammar error: 'Ramu have problems' should be 'Ramu has problems'.",
      highlightText: "Ramu have problems",
    },
    {
      id: `${slideNum}-Language-2`,
      category: "Language",
      text: "Avoid passive voice: rewrite 'The report was completed by the team.'",
      highlightText: "was completed",
    },
    {
      id: `${slideNum}-Language-3`,
      category: "Language",
      text: "Comma splice detected: separate sentences properly.",
      highlightText: ",,",
    },
  ],
  Narrative: (slideNum) => [
    {
      id: `${slideNum}-Narrative-1`,
      category: "Narrative",
      text: "Improve flow by connecting ideas more smoothly.",
      highlightText: "connect",
    },
    {
      id: `${slideNum}-Narrative-2`,
      category: "Narrative",
      text: "Avoid jargon: explain technical terms clearly.",
      highlightText: "technical terms",
    },
    {
      id: `${slideNum}-Narrative-3`,
      category: "Narrative",
      text: "Break long paragraphs into shorter, digestible parts.",
      highlightText: "long paragraphs",
    },
  ],
};

const generateSlides = (count: number): Slide[] => {
  const baseContents = [
    `Company has been growing rapidly in the past year. However, some issues remain unresolved.`,
    `Ramu have problems with the system. He said the report was completed late, but no reason was given.`,
    `Our sales reached 1000 units this quarter, a 50 increase from last quarter.`,
    `The data was collected by the team,, and analyzed thoroughly. However, formatting errors were present.`,
    `Bullet points are important: they should be consistent and start with a capital letter.`,
    `Avoid passive voice in sentences. For example, 'The report was completed by the team.'`,
    `Long paragraphs can overwhelm readers. Break long paragraphs into shorter, digestible parts.`,
    `Technical terms should be explained or avoided when unnecessary for clarity.`,
  ];

  return Array.from({ length: count }, (_, index) => {
    const content = baseContents[index % baseContents.length];
    const recommendations = categories.flatMap((cat) =>
      exampleRecommendations[cat](index + 1)
    );

    return {
      id: index + 1,
      content: `Slide ${index + 1} Content:\n\n${content}`,
      recommendations,
    };
  });
};

const Slides: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(generateSlides(20));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<RecommendationCategory>("Format");
  const [hoveredRecommendationId, setHoveredRecommendationId] = useState<
    string | null
  >(null);

  const currentSlide = slides[currentIndex];
  const filteredRecommendations = currentSlide.recommendations.filter(
    (r) => r.category === selectedCategory
  );

  const moveToNextSlide = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const moveToPreviousSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const getPreviewSlides = () => {
    const start = Math.max(currentIndex - 2, 0);
    const end = Math.min(currentIndex + 3, slides.length);
    return slides.slice(start, end);
  };

  const contentLines = currentSlide.content.split("\n");

  const hoveredRecommendation = hoveredRecommendationId
    ? currentSlide.recommendations.find(
        (r) => r.id === hoveredRecommendationId
      ) || null
    : null;

  const isLineHighlighted = (line: string) => {
    if (!hoveredRecommendation) return false;
    const snippet = hoveredRecommendation.highlightText;
    return line.toLowerCase().includes(snippet.toLowerCase());
  };

  const handleApprove = (slideId: number, recommendationId: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              content:
                slide.recommendations.find((r) => r.id === recommendationId)
                  ?.text || slide.content,
              recommendations: slide.recommendations.filter(
                (r) => r.id !== recommendationId
              ),
            }
          : slide
      )
    );
  };

  const handleReject = (slideId: number, recommendationId: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === slideId
          ? {
              ...slide,
              recommendations: slide.recommendations.filter(
                (r) => r.id !== recommendationId
              ),
            }
          : slide
      )
    );
  };

  const handleApproveAll = () => {
    setSlides((prev) =>
      prev.map((slide) => ({
        ...slide,
        content: slide.recommendations.map((r) => r.text).join(" "), // Join all recommendations text into content
        recommendations: [], // Clear all recommendations
      }))
    );
  };

  const handleRejectAll = () => {
    setSlides((prev) =>
      prev.map((slide) => ({
        ...slide,
        recommendations: [], // Remove all recommendations
      }))
    );
  };

  return (
    <div className="h-[90vh] w-[90vw] mx-auto bg-white rounded-lg overflow-hidden shadow-xl flex flex-col mt-10">
      <div className="flex flex-1 overflow-hidden rounded-lg bg-orange-50">
        {/* Left Side: Slide Content */}
        <div className="flex-1 flex flex-col p-6 border-r border-gray-300 bg-gradient-to-r from-white via-gray-50 to-orange-50 overflow-hidden">
          <h2 className="text-2xl font-semibold text-orange-700 mb-6">
            Original Content (Slide {currentSlide.id})
          </h2>

          <div className="flex-1 w-full max-w-5xl aspect-video bg-white border border-gray-300 rounded-lg shadow-lg p-6 overflow-y-auto text-left mx-auto text-sm leading-relaxed select-text">
            {contentLines.map((line, i) => {
              const highlight = isLineHighlighted(line);
              return (
                <p
                  key={i}
                  className={`mb-2 ${
                    highlight
                      ? "bg-yellow-200 rounded px-1 font-semibold transition-colors duration-200"
                      : ""
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={moveToPreviousSlide}
              disabled={currentIndex === 0}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded disabled:opacity-50 transition"
            >
              Previous
            </button>
            <button
              onClick={moveToNextSlide}
              disabled={currentIndex === slides.length - 1}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>

          {/* Mini Slide Card Carousel */}
          <div className="flex gap-4 overflow-x-auto py-4 mt-4 border-t border-gray-300">
            {getPreviewSlides().map((slide) => {
              const isActive = slide.id - 1 === currentIndex;
              return (
                <div
                  key={slide.id}
                  onClick={() => setCurrentIndex(slide.id - 1)}
                  className={`relative cursor-pointer transition-all duration-300 border rounded-md flex items-center justify-center text-sm font-semibold text-gray-700 bg-white hover:shadow select-none
                  ${
                    isActive
                      ? "w-28 h-16 border-orange-600 ring-2 ring-orange-400 scale-105"
                      : "w-20 h-14 border-gray-300"
                  }`}
                  title={`Slide ${slide.id} - ${slide.recommendations.length} recommendations`}
                >
                  Slide {slide.id}
                  <span className="absolute top-1 right-2 bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                    {slide.recommendations.length}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Recommendations */}
        <div className="w-2/5 bg-white p-6 overflow-y-auto relative flex flex-col ">
          <div className="sticky top-0 z-10 bg-white pb-4 border-b border-gray-200 flex flex-col ml-5">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Recommendations{" "}
              <span className="text-sm font-normal text-gray-500">
                (Category: {selectedCategory})
              </span>
            </h3>

            {/* Approve / Reject All Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleApproveAll}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition"
              >
                Approve All
              </button>
              <button
                onClick={handleRejectAll}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
              >
                Reject All
              </button>
            </div>

            {/* Category Buttons */}
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => {
                const catCount = currentSlide.recommendations.filter(
                  (r) => r.category === cat
                ).length;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-semibold text-sm cursor-pointer
                      ${
                        isActive
                          ? "bg-orange-600 text-white shadow"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }
                    `}
                    title={`${cat} recommendations (${catCount})`}
                  >
                    {cat}
                    <span className="inline-block bg-gray-300 rounded-full px-2 text-xs font-semibold text-gray-800">
                      {catCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommendations List */}
          <div className="flex-1 mt-4 overflow-y-auto no-scrollbar">
            {filteredRecommendations.length === 0 && (
              <p className="text-gray-500 text-center mt-10">
                No recommendations in this category.
              </p>
            )}

            {filteredRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                onMouseEnter={() =>
                  setHoveredRecommendationId(recommendation.id)
                }
                onMouseLeave={() => setHoveredRecommendationId(null)}
                className="border border-gray-300 rounded-lg p-4 mb-4 hover:bg-gray-100 transition"
              >
                <p className="text-gray-700">{recommendation.text}</p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() =>
                      handleApprove(currentSlide.id, recommendation.id)
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleReject(currentSlide.id, recommendation.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slides;
