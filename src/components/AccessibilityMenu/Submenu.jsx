export default function Submenu({ menu, isOpen, onRegisterSubmenuRef, onSubmenuKeyDown, onSelect }) {
  return (
    <ul
      className={`submenu ${isOpen ? 'is-open' : ''}`}
      role="menu"
      aria-label={`${menu.label} alt menyusu`}
    >
      {menu.items.map((subItem, subIndex) => (
        <li role="none" key={subItem}>
          <button
            ref={(el) => onRegisterSubmenuRef(`${menu.id}-${subIndex}`, el)}
            className="submenu-item"
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => onSelect(subItem)}
            onKeyDown={(e) => onSubmenuKeyDown(e, subIndex)}
          >
            {subItem}
          </button>
        </li>
      ))}
    </ul>
  );
}