import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CustomSelect from './CustomSelect';
import { NODES } from './NodeTypes';

export default function NodeModal({ isOpen, openModal, closeModal, node }) {
  const handleSaveNode = () => {
    // TODO
    closeModal();
  };

  if (!node) {
    return <></>;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                  Node
                </Dialog.Title>
                <CustomSelect items={Object.values(NODES)} />
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eum
                    laborum sunt iusto necessitatibus totam, rerum fugit maxime architecto
                    fuga minus possimus dolorem culpa magnam repellat neque repellendus,
                    earum dignissimos.
                  </p>
                </div>

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
