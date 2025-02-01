import { Popover, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren, useState } from 'react';

export interface TooltipProps {
  readonly body: string | React.ReactNode;
}

export default function Tooltip({ body, children }: PropsWithChildren<TooltipProps>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover className="relative">
      {() => (
        <>
          <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {children}
          </div>
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              static
              className="absolute left-1/2 z-50 mt-1 -translate-x-1/2 transform text-sm py-1 px-3 bg-stone-950 rounded-lg"
            >
              {body}
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
