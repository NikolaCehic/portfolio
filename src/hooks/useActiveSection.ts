import { useEffect, useState } from 'react';

export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observed: Element[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) setActive(en.target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        io.observe(el);
        observed.push(el);
      }
    }
    return () => io.disconnect();
  }, [ids]);

  return active;
}
