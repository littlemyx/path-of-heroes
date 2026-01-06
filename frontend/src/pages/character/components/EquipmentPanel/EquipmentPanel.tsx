import css from "./EquipmentPanel.module.css";

// Equipment slot types
type SlotType = "helmet" | "armor" | "weapon" | "shield" | "gloves" | "boots";

interface EquipmentSlot {
  type: SlotType;
  label: string;
  icon: string;
  position: "left" | "right" | "center";
}

const equipmentSlots: EquipmentSlot[] = [
  { type: "helmet", label: "Шлем", icon: "🪖", position: "left" },
  { type: "armor", label: "Броня", icon: "🛡️", position: "right" },
  { type: "weapon", label: "Оружие", icon: "⚔️", position: "left" },
  { type: "shield", label: "Щит", icon: "🛡️", position: "right" },
  { type: "gloves", label: "Перчатки", icon: "🧤", position: "left" },
  { type: "boots", label: "Сапоги", icon: "👢", position: "right" },
];

export const EquipmentPanel = () => {
  const leftSlots = equipmentSlots.filter(s => s.position === "left");
  const rightSlots = equipmentSlots.filter(s => s.position === "right");

  return (
    <div className={css.equipmentPanel}>
      <h3 className={css.panelTitle}>ЭКИПИРОВКА</h3>
      
      <div className={css.equipmentLayout}>
        {/* Left equipment slots */}
        <div className={css.slotsColumn}>
          {leftSlots.map(slot => (
            <div key={slot.type} className={css.equipmentSlot} title={slot.label}>
              <span className={css.slotIcon}>{slot.icon}</span>
            </div>
          ))}
        </div>

        {/* Character silhouette */}
        <div className={css.characterContainer}>
          <div className={css.characterSilhouette}>
            <div className={css.characterPlaceholder}>
              <span className={css.characterIcon}>🧙‍♂️</span>
            </div>
          </div>
        </div>

        {/* Right equipment slots */}
        <div className={css.slotsColumn}>
          {rightSlots.map(slot => (
            <div key={slot.type} className={css.equipmentSlot} title={slot.label}>
              <span className={css.slotIcon}>{slot.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

