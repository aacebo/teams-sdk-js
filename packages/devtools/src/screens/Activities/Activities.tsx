import { useContext, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/16/solid';

import { StateContext } from '../../state';
import { ActivitySocketEvent } from '../../client';
import './Activities.css';

export default function Activities() {
  const state = useContext(StateContext);
  const [selected, setSelected] = useState<ActivitySocketEvent>();

  return (
    <div className="Activities">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col flex-1">
          <table className="table-auto border-separate border-spacing-0 m-3 text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
            <thead className="text-xs text-stone-700 uppercase bg-stone-50 dark:bg-stone-900 dark:text-stone-400">
              <tr>
                <th scope="col" className="px-3 py-2 w-14 border-t border-b border-l dark:border-stone-700">Type</th>
                <th scope="col" className="px-3 py-2 border dark:border-stone-700">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {
                state.activities.map(event => {
                  const classes = [
                    'group',
                    'odd:bg-white',
                    'odd:dark:bg-stone-900',
                    'even:bg-stone-50',
                    'even:dark:bg-stone-800',
                    'hover:bg-stone-50',
                    'hover:cursor-pointer',
                  ];

                  if (selected?.id === event.id) {
                    classes.push('active');
                  }

                  return (
                    <tr
                      className={classes.join(' ')}
                      onClick={() => {
                        setSelected(event);
                      }}
                    >
                      <td className="px-3 py-2 flex border-b border-l dark:border-stone-700 dark:group-hover:bg-stone-700">
                        {
                          event.type === 'received' ?
                            <ArrowDownIcon className="h-4 w-4 my-auto" /> :
                            <ArrowUpIcon className="h-4 w-4 my-auto" />
                        }
                        <div className="my-auto ml-2 font-semibold">
                          {event.body.type}
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b border-l border-r dark:border-stone-700 dark:group-hover:bg-stone-700">
                        {new Date(event.sentAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>

        {
          selected && (
            <div className="flex flex-col flex-1 max-w-[50%]">
              <pre className="flex-1">
                {JSON.stringify(selected, null, 2)}
              </pre>
            </div>
          )
        }
      </div>
    </div>
  );
}
