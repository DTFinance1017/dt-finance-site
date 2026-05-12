import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      setTimeout(() => {
        el.classList.remove("fade-hidden");
        el.classList.add("fade-visible");
      }, delay);
    };

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 60px 0px" }
    );

    observer.observe(el);

    const fallback = setTimeout(() => {
      if (el.classList.contains("fade-hidden")) {
        show();
      }
    }, 800 + delay);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`fade-hidden ${className}`}>
      {children}
    </div>
  );
}
