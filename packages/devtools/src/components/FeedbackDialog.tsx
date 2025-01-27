import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

export interface FeedbackDialogProps {
  readonly type: 'like' | 'dislike';
  readonly open?: boolean;
  readonly onClose?: (value: boolean) => void;
  readonly onSubmit?: (value?: string) => void | Promise<void>;
}

export default function FeedbackDialog({
  type,
  open = false,
  onClose = () => {},
  onSubmit = () => {}
}: FeedbackDialogProps) {
  const [value, setValue] = useState('');

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-12">
        <DialogPanel className="max-w-lg relative flex flex-col text-sm px-10 py-6 space-y-4 rounded-lg shadow-2xl dark:text-white overflow-hidden dark:bg-stone-900">
          <DialogTitle className="font-semibold text-base">
            Submit Feedback
          </DialogTitle>

          <label
            htmlFor="description"
            className="font-semibold text-stone-400"
          >
            {type === 'like' ? 'What did you like?' : 'What went wrong?'}
          </label>

          <textarea
            id="description"
            className="mb-2 transition bg-stone-900 rounded px-3 py-2 border-2 border-stone-800 resize-none focus:border-b-3 focus:border-b-indigo-800"
            rows={5}
            placeholder="Give as much detail as you can, but don't include any private or sensitive information."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <p className="font-semibold mb-2 text-stone-400">
            We'll also share the content you're providing feedback on to help improve future responses.
          </p>

          <div className="flex">
            <div className="flex-1" />
            <button
              className="flex px-2 py-1.5 transition-all rounded text-sm my-auto bg-indigo-800 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-stone-700 active:bg-indigo-600"
              onClick={() => {
                onSubmit(value);
                setValue('');
              }}
            >
              Submit
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
