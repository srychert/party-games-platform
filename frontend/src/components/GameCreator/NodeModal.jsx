import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useState } from 'react';
import NodeTypeSelect from './NodeTypeSelect';
import { NODES } from './NodeTypes';
import Heal from './Nodes/Heal';
import Merchant from './Nodes/Merchant';

export default function NodeModal({ isOpen, openModal, closeModal, node, setNodes }) {
  const [currentNode, setCurrentNode] = useState(node);

  const handleSaveNode = () => {
    setNodes((nds) => [...nds.filter((n) => n.id !== node.id), currentNode]);

    closeModal();
  };

  const handelClose = () => {
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

      default:
        return null;
    }
  }, [currentNode]);

  if (!node) {
    return <></>;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handelClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-4 text-lg font-medium leading-6 text-gray-900"
                >
                  Node {currentNode.data.node.type}
                </Dialog.Title>

                <div className="mb-6">
                  <NodeTypeSelect
                    items={Object.values(NODES)}
                    setNode={setCurrentNode}
                    node={currentNode}
                  />
                </div>

                <div className="grid gap-4">{renderFields()}</div>

                <div className="mt-4">
                  <button type="button" className="button" onClick={handleSaveNode}>
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
