import { useState, useEffect } from "react";
import HowToUseWindow from "../../modules/HowToUseWindow";
import AddBookForm from "../../modules/AddBookForm";
import ButtonUniversal from "../../shared/components/ButtonUniversal";
import styles from "./homePage.module.scss";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleForm = () => setIsFormOpen((prevState) => !prevState);
  const closeForm = () => setIsFormOpen(false);

  const addBook = (book) => console.log(book);

  return (
    <main className={styles.home}>
      <div className="container">
        <ButtonUniversal
          type="button"
          text="How to use the app"
          onClick={openModal}
          btnStyles={styles.upperBtn}
        />
        <ButtonUniversal
          type="button"
          text="Add books"
          onClick={toggleForm}
          btnStyles={styles.formBtn}
        />
        {isFormOpen ? (
          <AddBookForm onClose={closeForm} onSubmit={addBook} />
        ) : null}
        {isModalOpen ? <HowToUseWindow onClick={closeModal} /> : null}
      </div>
    </main>
  );
};

export default HomePage;
