import { useState, useRef, useCallback, useEffect } from 'react';

export function useMenuNavigation(menuData) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [liveMessage, setLiveMessage] = useState('');
  const [showNewDocInput, setShowNewDocInput] = useState(false);
  const [docName, setDocName] = useState('');
  const [savedDocName, setSavedDocName] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const menuRefs = useRef({});
  const submenuRefs = useRef({});
  const inputRef = useRef(null);

  const registerMenuRef = useCallback((id, el) => {
    if (el) menuRefs.current[id] = el;
  }, []);

  const registerSubmenuRef = useCallback((key, el) => {
    if (el) submenuRefs.current[key] = el;
  }, []);

  const toggleMenu = useCallback((menuId, label) => {
    setOpenMenuId((prev) => {
      const isOpen = prev === menuId;
      setLiveMessage(`${label} menyusu ${!isOpen ? 'açıldı' : 'bağlandı'}`);
      return isOpen ? null : menuId;
    });
  }, []);

  const closeAllMenus = useCallback(() => {
    if (openMenuId) {
      const currentMenu = menuData.find((m) => m.id === openMenuId);
      setLiveMessage(`${currentMenu?.label || ''} menyusu bağlandı`);
      setOpenMenuId(null);
    }
  }, [openMenuId, menuData]);

  const handleKeyDown = useCallback((e, menu, index) => {
    const { key } = e;

    if (key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % menuData.length;
      const nextMenuId = menuData[nextIndex].id;
      menuRefs.current[nextMenuId]?.focus();
      if (openMenuId) setOpenMenuId(nextMenuId);
    }

    if (key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + menuData.length) % menuData.length;
      const prevMenuId = menuData[prevIndex].id;
      menuRefs.current[prevMenuId]?.focus();
      if (openMenuId) setOpenMenuId(prevMenuId);
    }

    if (key === 'ArrowDown' || key === 'Enter' || key === ' ') {
      e.preventDefault();
      if (openMenuId !== menu.id) {
        toggleMenu(menu.id, menu.label);
      }
      setTimeout(() => {
        submenuRefs.current[`${menu.id}-0`]?.focus();
      }, 60);
    }

    if (key === 'Escape') {
      e.preventDefault();
      closeAllMenus();
    }
  }, [openMenuId, toggleMenu, closeAllMenus, menuData]);

  const handleSubmenuKeyDown = useCallback((e, menu, subIndex) => {
    const { key } = e;
    const totalItems = menu.items.length;

    if (key === 'ArrowDown') {
      e.preventDefault();
      const nextSub = (subIndex + 1) % totalItems;
      submenuRefs.current[`${menu.id}-${nextSub}`]?.focus();
    }

    if (key === 'ArrowUp') {
      e.preventDefault();
      const prevSub = (subIndex - 1 + totalItems) % totalItems;
      submenuRefs.current[`${menu.id}-${prevSub}`]?.focus();
    }

    if (key === 'Escape') {
      e.preventDefault();
      closeAllMenus();
      menuRefs.current[menu.id]?.focus();
    }
  }, [closeAllMenus]);

  const handleSelect = useCallback((subItem) => {
    setLiveMessage(`${subItem} seçildi`);
    closeAllMenus();

    if (subItem === 'Yeni sənəd') {
      setShowNewDocInput(true);
      setDocName('');
      setShowSuccessToast(false);
    } else {
      setShowNewDocInput(false);
    }
  }, [closeAllMenus]);

  const handleInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const finalName = docName.trim() || 'Adsız sənəd';
      setSavedDocName(finalName);
      setShowSuccessToast(true);
      setLiveMessage(`"${finalName}" adlı yeni sənəd yadda saxlandı`);
      setDocName('');
    }
  }, [docName]);

  useEffect(() => {
    if (showNewDocInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNewDocInput]);

  return {
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
  };
}