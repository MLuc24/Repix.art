# Team Assets - Cross-Tab UX Integration

## Tổng quan
Các components mới được thêm vào để kết nối trải nghiệm giữa "My Assets" và "Team Shared" tabs.

## Components mới

### 1. ShareToTeamModal
Modal cho phép share personal assets lên team với options:
- Chọn target folder
- Thêm message cho team
- Toggle notify team members

### 2. MoveToPersonalModal
Modal cho phép save team assets về personal library với options:
- Chọn personal folder
- Toggle "Keep in Team" (copy vs move)

### 3. UnifiedSearchModal
Tìm kiếm thống nhất xuyên suốt cả personal và team assets:
- Scope filters (All/Personal/Team)
- Real-time results
- Auto switch tab khi select

### 4. SmartSuggestions
AI-powered suggestions dựa trên context:
- Personal tab: Gợi ý assets nên share
- Team tab: Gợi ý assets nên save

### 5. CrossTabActivityFeed
Real-time feed hiển thị hoạt động:
- Recent shares/saves
- Visual direction indicators
- Collapsible

## Cách sử dụng

### Quick Actions
- **Search All**: Tìm kiếm xuyên suốt cả 2 tabs
- **Quick Share**: Share top 3 pro assets (My Assets tab)
- **Quick Save**: Save top 3 popular assets (Team tab)

### Asset Card Actions
- Hover asset → Click "Share" hoặc "Save" button
- Badge góc phải hiển thị "Team" hoặc "Mine"

### Detail Panel
- Primary CTA button: "Share to Team" hoặc "Save to My Assets"
- Context-aware actions

## Technical Notes

### State Management
```typescript
const [isShareToTeamModalOpen, setIsShareToTeamModalOpen] = useState(false);
const [isMoveToPersonalModalOpen, setIsMoveToPersonalModalOpen] = useState(false);
const [isUnifiedSearchOpen, setIsUnifiedSearchOpen] = useState(false);
const [selectedAssetsForAction, setSelectedAssetsForAction] = useState<TeamAssetItem[]>([]);
```

### Action Handlers
```typescript
handleAction('share-to-team', asset);
handleAction('save-to-personal', asset);
```

## Design System

### Colors
- **Blue**: Team-related actions
- **Violet**: Personal-related actions
- **Gradient**: Primary CTAs

### Icons
- User icon cho cả personal và team (Icons.User)
- Upload/Download cho share/save actions

## Xem thêm
Chi tiết đầy đủ trong `docs/TEAM_ASSETS_UX_IMPROVEMENTS.md`
