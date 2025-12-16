/**
 * EditorTeamCommentPanel
 * R4.10 — TEAM EDITOR CONTEXT (FOUNDATION)
 * 
 * Panel nhỏ bên phải cho internal comments:
 * - Hiển thị comments từ team members
 * - Hỗ trợ mention @member (mock)
 * - Không hiển thị cho client (isInternal = true)
 */

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { EditorTeamCommentPanelProps, TeamMember } from '../types';

export const EditorTeamCommentPanel: React.FC<EditorTeamCommentPanelProps> = ({
  comments,
  teamMembers,
  onAddComment,
  isOpen = true,
  onToggle,
}) => {
  const [newComment, setNewComment] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Parse @ mentions in text
  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewComment(value);

    // Check for @ trigger
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
      setShowMentions(true);
      setMentionSearch('');
    } else if (lastAtIndex !== -1) {
      const textAfterAt = value.substring(lastAtIndex + 1);
      if (!textAfterAt.includes(' ')) {
        setShowMentions(true);
        setMentionSearch(textAfterAt);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (member: TeamMember) => {
    const lastAtIndex = newComment.lastIndexOf('@');
    const newText = newComment.substring(0, lastAtIndex) + `@${member.name.split(' ')[0].toLowerCase()} `;
    setNewComment(newText);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    
    // Extract mentions
    const mentionRegex = /@(\w+)/g;
    const mentions: string[] = [];
    let match;
    while ((match = mentionRegex.exec(newComment)) !== null) {
      const mentionName = match[1].toLowerCase();
      const member = teamMembers.find(
        (m) => m.name.split(' ')[0].toLowerCase() === mentionName
      );
      if (member) mentions.push(member.id);
    }

    onAddComment?.(newComment.trim(), mentions);
    setNewComment('');
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const highlightMentions = (content: string) => {
    return content.replace(
      /@(\w+)/g,
      '<span class="text-violet-400 font-medium">@$1</span>'
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-violet-600 hover:bg-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30 z-30 transition-all"
        title="Open Team Comments"
      >
        <Icons.MessageSquare className="w-5 h-5 text-white" />
        {comments.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {comments.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      className="w-72 bg-[#0e0f13]/95 backdrop-blur-xl border-l border-white/5 flex flex-col h-full pointer-events-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Icons.MessageSquare className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold text-white">Team Comments</span>
          <span className="px-1.5 py-0.5 bg-violet-500/20 text-violet-400 text-[10px] font-medium rounded">
            Internal
          </span>
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
        >
          <Icons.Close className="w-4 h-4" />
        </button>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <Icons.MessageSquare className="w-8 h-8 text-slate-700 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No comments yet</p>
            <p className="text-[10px] text-slate-600">Start a conversation with your team</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="flex items-start gap-2">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-medium text-slate-300">
                      {comment.author.name}
                    </span>
                    <span className="text-[10px] text-slate-600">
                      {formatTimeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p
                    className="text-xs text-slate-400 leading-relaxed break-words"
                    dangerouslySetInnerHTML={{ __html: highlightMentions(comment.content) }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-white/5 relative">
        {/* Mention Dropdown */}
        {showMentions && filteredMembers.length > 0 && (
          <div className="absolute bottom-full left-3 right-3 mb-1 bg-[#1a1b26] border border-white/10 rounded-lg shadow-xl overflow-hidden z-10">
            {filteredMembers.slice(0, 4).map((member) => (
              <button
                key={member.id}
                onClick={() => insertMention(member)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 transition-colors"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-xs text-slate-300">{member.name}</span>
                <span className="text-[10px] text-slate-500 capitalize ml-auto">
                  {member.role}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-violet-500/50 transition-colors">
            <textarea
              ref={inputRef}
              value={newComment}
              onChange={handleInputChange}
              placeholder="Add a comment... Use @ to mention"
              className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 resize-none outline-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="p-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Icons.Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-[10px] text-slate-600 mt-1.5 text-center">
          Comments are only visible to team members
        </p>
      </div>
    </div>
  );
};

export default EditorTeamCommentPanel;
