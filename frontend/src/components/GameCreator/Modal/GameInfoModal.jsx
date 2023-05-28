import { useState } from 'react';
import BaseModal from './BaseModal';

export default function GameInfoModal({ isOpen, closeModal, gameInfo, setGameInfo }) {
  const [title, setTitle] = useState(gameInfo.title);
  const [description, setDescription] = useState(gameInfo.description);

  const handleSaveInfo = () => {
    setGameInfo({
      ...gameInfo,
      title,
      description,
    });

    closeModal();
  };

  const handelClose = () => {
    setTitle(gameInfo.title);
    setDescription(gameInfo.description);

    closeModal();
  };

  return (
    <BaseModal isOpen={isOpen} handleClose={handelClose} title="Game Info">
      <div className="grid h-full gap-4">
        <div className="form-input-container">
          <label htmlFor="title">Title</label>
          <input
            className="form-input border"
            type="text"
            name="title"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-input border"
            type="text"
            name="description"
            id="description"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <button type="button" className="button" onClick={handleSaveInfo}>
          Save
        </button>
      </div>
    </BaseModal>
  );
}
