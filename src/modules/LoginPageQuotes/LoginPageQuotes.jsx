import { useState, useEffect } from "react";
import SVGCreator from "../../shared/components/SVGCreator";
import styles from "./loginPageQuotes.module.scss";

const LoginPageQuotes = ({ quotes, isPsnAdjustNeeded }) => {
  const total = quotes.length;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      const newIdx = idx + 1 === total ? 0 : idx + 1;
      setIdx(newIdx);
    }, 5000);
    return () => clearTimeout(id);
  }, [idx, total]);

  const elements = quotes.map(({ id, text, author }) => (
    <li
      key={id}
      className={styles.item}
      style={{ transform: `translateX(-${idx * 100}%)` }}
    >
      <p className={styles.text}>{text}</p>
      <p className={styles.author}>{author}</p>
    </li>
  ));

  return (
    <div
      className={styles.general}
      style={{ transform: `translateY(${isPsnAdjustNeeded ? "10vh" : "0vh"})` }}
    >
      <SVGCreator iconName="quote" />
      <ul className={styles.list}>{elements}</ul>
    </div>
  );
};

export default LoginPageQuotes;
