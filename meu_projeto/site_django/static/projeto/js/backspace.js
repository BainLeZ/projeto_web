document.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      const el = document.activeElement;
      if (!['INPUT', 'TEXTAREA'].includes(el.tagName) && !el.isContentEditable) {
        e.preventDefault();
        history.back();
      }
    }
  });