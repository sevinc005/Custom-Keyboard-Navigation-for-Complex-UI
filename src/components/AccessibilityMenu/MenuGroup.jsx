import Submenu from './Submenu';

export default function MenuGroup({
  menu,
  index,
  isOpen,
  onRegisterMenuRef,
  onRegisterSubmenuRef,
  toggleMenu,
  onKeyDown,
  onSubmenuKeyDown,
  onSelect
}) {
  return (
    <li className="menu-item" role="none">
      <button
        ref={(el) => onRegisterMenuRef(menu.id, el)}
        className="menu-button"
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => toggleMenu(menu.id, menu.label)}
        onKeyDown={(e) => onKeyDown(e, menu, index)}
      >
        {menu.label}
      </button>

      <Submenu
        menu={menu}
        isOpen={isOpen}
        onRegisterSubmenuRef={onRegisterSubmenuRef}
        onSubmenuKeyDown={(e, subIndex) => onSubmenuKeyDown(e, menu, subIndex)}
        onSelect={onSelect}
      />
    </li>
  );
}