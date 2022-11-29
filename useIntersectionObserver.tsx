export const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverInit
): [Dispatch<SetStateAction<T | null>>, boolean] => {
  const [ref, setRef] = useState<T | null>(null);
  const [isIntersect, setIsIntersect] = useState(false);

  useEffect(() => {
    if (!ref) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      setIsIntersect(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      if (!ref) {
        return;
      }

      observer.unobserve(ref);
      observer.disconnect();
    };
  }, [ref]);

  return [setRef, isIntersect];
};
