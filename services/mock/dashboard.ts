
// Mock data for Dashboard

export const MOCK_USER = {
  name: "Alex Designer",
  role: "casual",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  credits: 8,
};

export const MOCK_PRO_USER = {
  name: "Sarah Pro",
  role: "pro",
  avatar: "https://i.pravatar.cc/150?img=5",
  credits: 86,
};

export const MOCK_FREELANCER_USER = {
  name: "David Freelancer",
  role: "freelancer",
  avatar: "https://i.pravatar.cc/150?img=12",
  credits: 142,
  email: "david@studio.com"
};

export const RECENT_FILES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    name: "Portrait_01.jpg",
    date: "2 mins ago",
    status: "Edited",
    size: "12MB",
    type: "image/jpeg",
    model: "RealPhoto V3",
    resolution: "4096x4096",
    tags: ["HD", "Pro Model"]
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    name: "Summer_Vibe.png",
    date: "1 hour ago",
    status: "Remixed",
    size: "4.2MB",
    type: "image/png",
    model: "Cyberpunk V2",
    tags: ["Remix"]
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    name: "Insta_Story_Final.jpg",
    date: "1 day ago",
    status: "Exported",
    size: "2.1MB",
    type: "image/jpeg",
    tags: ["Upscaled"]
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?auto=format&fit=crop&w=400&q=80",
    name: "Profile_New.png",
    date: "2 days ago",
    status: "Draft",
    size: "8.5MB",
    type: "image/png",
    model: "Nano Banana",
    tags: ["Batch x4"]
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80",
    name: "Cyberpunk_City_Batch_01.png",
    date: "3 days ago",
    status: "Generated",
    size: "16MB",
    type: "image/png",
    model: "Veo 3.1",
    tags: ["Video Frame"]
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    name: "Cyberpunk_City_Batch_02.png",
    date: "3 days ago",
    status: "Generated",
    size: "16MB",
    type: "image/png",
    model: "Veo 3.1",
    tags: ["Video Frame"]
  }
];

export const SUGGESTIONS = [
  {
    id: 'enhance',
    title: "Enhance Last Photo",
    subtitle: "Improve lighting on Portrait_01.jpg",
    iconType: 'Bolt'
  },
  {
    id: 'remix',
    title: "Try Cyberpunk Style",
    subtitle: "Trending remix for this week",
    iconType: 'Sparkles'
  },
  {
    id: 'avatar',
    title: "Create AI Avatar",
    subtitle: "Generate your digital twin",
    iconType: 'User'
  }
];

export const PRO_RECOMMENDED_TOOLS = [
  {
    id: 'pro-model',
    title: 'RealPhoto V3 Model',
    desc: 'Photorealistic generation',
    iconType: 'Image'
  },
  {
    id: 'batch-gen',
    title: 'Batch Generator',
    desc: 'Create 4 variations',
    iconType: 'Layout'
  },
  {
    id: 'upscale',
    title: '4K Upscaler',
    desc: 'Enhance resolution',
    iconType: 'Maximize'
  },
  {
    id: 'raw-edit',
    title: 'RAW Editor',
    desc: 'Manual adjustments',
    iconType: 'Sliders'
  }
];
