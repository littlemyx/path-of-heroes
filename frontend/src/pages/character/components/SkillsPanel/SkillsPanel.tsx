import css from "./SkillsPanel.module.css";

// Mock skills data
const mockSkills = [
  { id: 1, icon: "🔥", name: "Мощный Удар", description: "Наносит двойной урон" },
  { id: 2, icon: "🛡️", name: "Салуон Щитом", description: "Блокирует следующую атаку" },
  { id: 3, icon: "👢", name: "Быстрый Шаг", description: "Увеличивает скорость" },
];

export const SkillsPanel = () => {
  return (
    <div className={css.skillsPanel}>
      <h3 className={css.panelTitle}>НАВЫКИ</h3>
      
      <div className={css.skillsRow}>
        {mockSkills.map(skill => (
          <div key={skill.id} className={css.skillItem}>
            <div className={css.skillSlot} title={skill.description}>
              <span className={css.skillIcon}>{skill.icon}</span>
            </div>
            <span className={css.skillName}>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

