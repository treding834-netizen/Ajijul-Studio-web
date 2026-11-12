import React, { useState } from 'react';
import { Review } from '../types';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReview }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [device, setDevice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      device: device.trim() || 'Android Device',
    };

    onAddReview(newRev);
    setName('');
    setComment('');
    setDevice('');
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-16 bg-slate-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            User Reviews & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Ratings</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            See what Android users are saying about Ajijul AI or share your own experience.
          </p>
        </div>

        {submitted && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Thank you! Your review has been successfully posted.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Submit Review Form */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-bold text-white">Leave Your Review</h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="e.g. Rahim Ahmed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-mono text-sm text-cyan-400 font-bold">{rating}.0 / 5.0</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Android Device (Optional)</label>
                <input
                  type="text"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="e.g. Samsung Galaxy / Xiaomi"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                  placeholder="Share how Ajijul AI helped you..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold text-white">Community Reviews ({reviews.length})</h3>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">{rev.name}</h4>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{rev.device}</span>
                        <span>·</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-amber-300 font-mono">{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
