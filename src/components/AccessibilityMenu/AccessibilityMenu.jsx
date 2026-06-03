import MenuGroup from './MenuGroup';
import { useMenuNavigation } from './useMenuNavigation';
import './AccessibilityMenu.css';

const menuData = [
  {
    id: 'file',
    label: 'Fayl',
    items: ['Yeni sənəd', 'Aç', 'Yadda saxla']
  },
  {
    id: 'edit',
    label: 'Redaktə',
    items: ['Geri al', 'Kəs', 'Kopyala']
  }
];

export default function AccessibilityMenu() {
  // Custom Hook-dan lazım olan hər şeyi bir sətirdə çağırırıq
  const {
    openMenuId,
    liveMessage,
    showNewDocInput,
    docName,
    savedDocName,
    showSuccessToast,
    inputRef,
    setDocName,
    registerMenuRef,
    registerSubmenuRef,
    toggleMenu,
    handleKeyDown,
    handleSubmenuKeyDown,
    handleSelect,
    handleInputKeyDown
  } = useMenuNavigation(menuData);

  return (
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <nav className="nav-container" aria-label="Əsas Naviqasiya">
        <div className="sr-only" aria-live="polite">
          {liveMessage}
        </div>

        <ul className="menu-list" role="menubar">
          {menuData.map((menu, index) => (
            <MenuGroup
              key={menu.id}
              menu={menu}
              index={index}
              isOpen={openMenuId === menu.id}
              onRegisterMenuRef={registerMenuRef}
              onRegisterSubmenuRef={registerSubmenuRef}
              toggleMenu={toggleMenu}
              onKeyDown={handleKeyDown}
              onSubmenuKeyDown={handleSubmenuKeyDown}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </nav>

      {showNewDocInput && (
        <main className="workspace">
          <h2 className="workspace-title">Masaüstü İş Sahəsi</h2>
          
          <div className="input-group">
            <label htmlFor="doc-name-input" className="document-label">
              Yeni sənədin adı:
            </label>
            <input
              id="doc-name-input"
              ref={inputRef}
              type="text"
              className="document-input"
              placeholder="Sənədin adını yazıb Enter basaraq yadda saxlayın..."
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          </div>

          {showSuccessToast && (
            <div className="success-banner" role="status">
              <span className="success-icon">✓</span>
              <p className="success-text">
                <strong>Uğurlu!</strong> "{savedDocName}" yadda saxlandı.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}