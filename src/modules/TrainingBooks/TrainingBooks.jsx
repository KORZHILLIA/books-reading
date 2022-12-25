import { useSelector } from "react-redux";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import SVGCreator from "../../shared/components/SVGCreator";
import TrainingBooksTable from "../../shared/components/TrainingBooksTable";
import MobileBookItem from "../../shared/components/MobileBookItem";
import CloseBtn from "../../shared/components/CloseBtn";
import librarySelectors from "../../redux/library/library-selectors";
import styles from "./trainingBooks.module.scss";

const TrainingBooks = ({ onCloseBtnClick }) => {
  const books = useSelector(librarySelectors.libraryPresent);

  const { less768px } = useBreakpoints();

  const mobileElements = books.map(({ _id, title, author, year, pages }) => (
    <MobileBookItem
      key={_id}
      id={_id}
      title={title}
      author={author}
      year={year}
      pages={pages}
      itemStyles={styles.mobileItem}
      onCloseBtnClick={onCloseBtnClick}
    />
  ));

  const elements = books.map(({ _id, title, author, year, pages }) => (
    <tr key={_id}>
      <td className={styles.svgCell}>
        <SVGCreator iconName="library" width={22} height={22} />
      </td>
      <td className={styles.titleCell}>{title}</td>
      <td className={styles.authorCell}>{author}</td>
      <td className={styles.yearCell}>{year}</td>
      <td className={styles.pagesCell}>{pages}</td>
      <td className={styles.closeCell}>
        <CloseBtn
          onClick={() => onCloseBtnClick(_id)}
          position={{ top: 20, left: 0 }}
        />
      </td>
    </tr>
  ));
  return !books.length ? (
    less768px ? (
      <ul className={styles.list}>
        <MobileBookItem
          itemStyles={styles.mobileItem}
          isCloseBtnNeeded={false}
        />
      </ul>
    ) : (
      <TrainingBooksTable>
        <tr>
          <td className={styles.svgCell}>
            <SVGCreator iconName="library" width={22} height={22} />
          </td>
          <td className={styles.titleCell}>...</td>
          <td className={styles.authorCell}>...</td>
          <td className={styles.yearCell}>...</td>
          <td className={styles.pagesCell}>...</td>
        </tr>
      </TrainingBooksTable>
    )
  ) : less768px ? (
    <ul className={styles.list}>{mobileElements}</ul>
  ) : (
    <TrainingBooksTable>{elements}</TrainingBooksTable>
  );
};

export default TrainingBooks;
