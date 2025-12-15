/**
 * InternalCommentPanel Component (R4.5)
 * 
 * Right panel for internal team comments:
 * - Not visible to clients
 * - For notes, handoffs, and reminders
 * - Input to add new comments
 */

import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { InternalComment } from '../../../services/mock/teamProjects';

interface InternalCommentPanelProps {
    comments: InternalComment[];
    onAddComment?: (content: string) => void;
}

// Format relative time
const formatRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
};

export const InternalCommentPanel: React.FC<InternalCommentPanelProps> = ({
    comments,
    onAddComment,
}) => {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 300)); // Simulate API call
        onAddComment?.(newComment.trim());
        setNewComment('');
        setIsSubmitting(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="bg-[#1a1b26] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <Icons.MessageSquare className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">Internal Notes</h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium">
                    Team Only
                </span>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.length === 0 ? (
                    <div className="text-center py-8">
                        <Icons.MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                        <p className="text-sm text-slate-500">No internal notes yet</p>
                        <p className="text-xs text-slate-600">Add notes for your team</p>
                    </div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                            {/* Avatar */}
                            <img
                                src={comment.userAvatar}
                                alt={comment.userName}
                                className="w-8 h-8 rounded-full shrink-0"
                            />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-white">{comment.userName}</span>
                                    <span className="text-xs text-slate-500">{formatRelativeTime(comment.timestamp)}</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">{comment.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 shrink-0">
                <div className="relative">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a note for your team..."
                        rows={2}
                        className="w-full px-3 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none transition-colors"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={!newComment.trim() || isSubmitting}
                        className="absolute right-2 bottom-2 p-1.5 rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Icons.Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] text-slate-600 mt-1.5 text-center">
                    Press Enter to send • This is only visible to team members
                </p>
            </div>
        </div>
    );
};
