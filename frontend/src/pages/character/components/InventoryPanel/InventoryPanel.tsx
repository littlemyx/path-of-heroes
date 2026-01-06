import css from "./InventoryPanel.module.css";

// Mock inventory items for display
const mockItems = [
  { id: 1, icon: "🧪", name: "Зелье здоровья" },
  { id: 2, icon: "💰", name: "Золотой мешок" },
  { id: 3, icon: "📜", name: "Свиток" },
  { id: 4, icon: "🗺️", name: "Карта" },
  { id: 5, icon: "📿", name: "Амулет" },
  { id: 6, icon: "🪵", name: "Дерево" },
];

// Total slots in inventory grid (2 columns x 4 rows)
const INVENTORY_SLOTS = 8;

export const InventoryPanel = () => {
  // Fill remaining slots with empty placeholders
  const slots = Array.from({ length: INVENTORY_SLOTS }, (_, i) => {
    const item = mockItems[i];
    return item || null;
  });

  return (
    <div className={css.inventoryPanel}>
      <h3 className={css.panelTitle}>ИНВЕНТАРЬ</h3>
      
      <div className={css.inventoryGrid}>
        {slots.map((item, index) => (
          <div 
            key={item?.id || `empty-${index}`} 
            className={`${css.inventorySlot} ${item ? css.hasItem : ''}`}
            title={item?.name}
          >
            {item && <span className={css.itemIcon}>{item.icon}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

