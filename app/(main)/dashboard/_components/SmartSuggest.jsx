"use client";
import { smartSuggestions } from "@/data/smartSuggetsion";
import React from "react";

const SmartSuggestion = () => {
  const today = new Date().toISOString().slice(0, 10);
  const todaySuggestions = smartSuggestions.filter(s => s.date === today);

  return (
    <div className="rounded-xl bg-[#1e1b29] p-4 shadow-md mb-16 border border-purple-900/30">
      <h2 className="text-sm font-semibold text-purple-400 mb-2">📢 Smart Finance Tips</h2>
      <ul className="space-y-1">
        {todaySuggestions.map((tip) => (
          <li
            key={tip.id}
            className="text-sm text-gray-300 flex items-start gap-2 leading-snug"
          >
            <span className="text-purple-500">•</span>
            {tip.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartSuggestion;
