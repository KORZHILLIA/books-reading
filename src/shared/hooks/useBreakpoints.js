import { useMediaPredicate } from "react-media-hook";

const useBreakpoints = () => {
  const less768px = useMediaPredicate("(max-width: 767px)");
  const bigger768px = useMediaPredicate("(min-width: 768px)");
  const bigger1280px = useMediaPredicate("(min-width: 1280px)");

  return { less768px, bigger768px, bigger1280px };
};
export default useBreakpoints;
