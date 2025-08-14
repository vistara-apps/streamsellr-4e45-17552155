
"use client";

import { useState } from "react";

interface StreamReaction {
  id: string;
  emoji: string;
  count: number;
}

interface StreamPoll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
}

export function InteractiveStreamElements() {
  const [reactions, setReactions] = useState<StreamReaction[]>([
    { id: "1", emoji: "🔥", count: 23 },
    { id: "2", emoji: "❤️", count: 15 },
    { id: "3", emoji: "🛒", count: 8 },
    { id: "4", emoji: "👏", count: 12 },
  ]);

  const [poll] = useState<StreamPoll>({
    id: "1",
    question: "Which product should we feature next?",
    options: [
      { text: "Wireless Headphones", votes: 34 },
      { text: "Smart Watch", votes: 28 },
      { text: "Laptop Stand", votes: 19 },
    ],
    totalVotes: 81
  });

  const handleReaction = (reactionId: string) => {
    setReactions(prev => 
      prev.map(r => 
        r.id === reactionId 
          ? { ...r, count: r.count + 1 }
          : r
      )
    );
  };

  return (
    <div className="space-y-lg">
      {/* Quick Reactions */}
      <div className="card">
        <h3 className="text-heading mb-md">Quick Reactions</h3>
        <div className="grid grid-cols-4 gap-md">
          {reactions.map((reaction) => (
            <button
              key={reaction.id}
              onClick={() => handleReaction(reaction.id)}
              className="flex flex-col items-center p-md bg-bg rounded-md hover:bg-primary/20 transition-colors"
            >
              <span className="text-2xl mb-sm">{reaction.emoji}</span>
              <span className="text-caption text-text-secondary">{reaction.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Poll */}
      <div className="card">
        <h3 className="text-heading mb-md">Live Poll</h3>
        <p className="text-body mb-lg">{poll.question}</p>
        
        <div className="space-y-md">
          {poll.options.map((option, index) => {
            const percentage = (option.votes / poll.totalVotes) * 100;
            
            return (
              <button
                key={index}
                className="w-full text-left p-md bg-bg rounded-md hover:bg-primary/10 transition-colors relative overflow-hidden"
              >
                <div 
                  className="absolute inset-0 bg-primary/20 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
                <div className="relative flex justify-between items-center">
                  <span className="text-body">{option.text}</span>
                  <span className="text-caption text-text-secondary">
                    {option.votes} votes ({percentage.toFixed(0)}%)
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        
        <p className="text-caption text-text-secondary mt-md text-center">
          {poll.totalVotes} total votes
        </p>
      </div>

      {/* Quick Messages */}
      <div className="card">
        <h3 className="text-heading mb-md">Quick Messages</h3>
        <div className="grid grid-cols-2 gap-md">
          {[
            "Love this product! 💕",
            "When will this be available?",
            "What's the shipping cost?",
            "Show more details please!"
          ].map((message, index) => (
            <button
              key={index}
              className="p-md bg-bg rounded-md hover:bg-accent/20 transition-colors text-caption text-left"
            >
              {message}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
