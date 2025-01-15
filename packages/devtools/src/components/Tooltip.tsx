import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren, useRef, useState } from 'react';

export interface TooltipProps {
  readonly body: string | React.ReactNode;
}

export default function Tooltip({ body, children }: PropsWithChildren<TooltipProps>) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [timeout, setTimeoutState] = useState<NodeJS.Timeout>();

  const onError = (open: boolean) => {
    clearTimeout(timeout);
    !open && triggerRef.current?.click();
  };

  const onLeave = (open: boolean) => {
    setTimeoutState(setTimeout(() => {
      open && triggerRef.current?.click()
    }, 120));
  };

  return (
    <Popover className="relative">
      {({ open }) => (
          <div
              onMouseEnter={() => onError(open)}
              onMouseLeave={() => onLeave(open)}
          >
            <PopoverButton ref={triggerRef} >
              {children}
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute left-1/2 z-50 mt-1 -translate-x-1/2 transform py-1 px-3 bg-stone-950 rounded-lg">
                 {body}
              </PopoverPanel>
            </Transition>
          </div>
        )
      }
    </Popover>
  );
}
