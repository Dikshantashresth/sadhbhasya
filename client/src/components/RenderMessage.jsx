import React from 'react'
const RenderMessage = ({ content }) => {
  // Simple markdown-like parsing
  const lines = content.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
          return (
            <div key={i} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{trimmed.replace(/^[-•]\s/, "")}</span>
            </div>
          );
        }

        if (trimmed.startsWith("|")) {
          // Render as table row if looks like markdown table
          const cells = trimmed.split("|").filter(Boolean);
          return (
            <div key={i} className="grid grid-cols-2 gap-4 bg-white/10 p-2 rounded-md">
              {cells.map((cell, idx) => (
                <div key={idx} className="px-2">
                  {cell.trim()}
                </div>
              ))}
            </div>
          );
        }

        if (trimmed.startsWith(">")) {
          // Quote style
          return (
            <blockquote
              key={i}
              className="pl-4 border-l-4 border-gray-500 italic text-gray-300"
            >
              {trimmed.replace(/^>\s?/, "")}
            </blockquote>
          );
        }

        return <p key={i}>{line}</p>;
      })}
    </div>
  );
};

export default RenderMessage
