import { useCallback, useState } from 'react';
import NodeTypeSelect from '../Select/NodeTypeSelect';
import { NODES } from '../../../enums/NodeTypes';
import Heal from '../Nodes/Heal';
import Merchant from '../Nodes/Merchant';
import Fight from '../Nodes/Fight';
import BaseModal from './BaseModal';

export default function NodeModal({ isOpen, closeModal, node, setNodes }) {
  const [currentNode, setCurrentNode] = useState(node);

  const handleSaveNode = () => {
    setNodes((nds) => [...nds.filter((n) => n.id !== node.id), currentNode]);

    closeModal();
  };

  const handleClose = () => {
    setCurrentNode(node);
    closeModal();
  };

  const renderFields = useCallback(() => {
    switch (currentNode.data.node.type) {
      case NODES.SKIP:
        return null;

      case NODES.HEAL:
        return <Heal node={currentNode} setNode={setCurrentNode} key={currentNode.id} />;

      case NODES.MERCHANT:
        return (
          <Merchant node={currentNode} setNode={setCurrentNode} key={currentNode.id} />
        );

      case NODES.FIGHT:
        return <Fight node={currentNode} setNode={setCurrentNode} key={currentNode.id} />;

      default:
        return null;
    }
  }, [currentNode]);

  if (!node) {
    return <></>;
  }

  return (
    <BaseModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={`Node ${currentNode.data.node.type}`}
    >
      <div className="mb-6">
        <NodeTypeSelect node={currentNode} setNode={setCurrentNode} />
      </div>

      <div className="grid gap-4">{renderFields()}</div>

      <div className="mt-4">
        <button type="button" className="button" onClick={handleSaveNode}>
          Save
        </button>
      </div>
    </BaseModal>
  );
}
