import { useContext, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/16/solid';

import { ActivitiesContext } from '../../state';
import { ActivitySocketEvent } from '../../socket-client';
import Json from '../../components/Json';
import './Activities.css';

export default function Activities() {
  const { activities } = useContext(ActivitiesContext);
  const [selected, setSelected] = useState<ActivitySocketEvent>();
  const [view, setView] = useState<'preview' | 'json'>('preview');

  return (
    <div className="Activities">
      <div className="flex flex-col sm:flex-row overflow-y-auto">
        <div className="flex flex-col md:flex-1 overflow-y-auto">
          <table className="table-auto border-separate border-spacing-0 m-3 text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
            <thead className="text-xs text-stone-700 uppercase bg-stone-50 dark:bg-stone-900 dark:text-stone-400">
              <tr>
                <th scope="col" className="px-3 py-2 w-14 border-t border-b border-l dark:border-stone-700">
                  Type
                </th>
                <th scope="col" className="px-3 py-2 border dark:border-stone-700">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {
                activities.slice().reverse().map(event => {
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

                  const path: Array<string> = [event.body.type];

                  if (
                    event.body.type === 'invoke' ||
                    event.body.type === 'event' ||
                    event.body.type === 'command'
                  ) {
                    path.push(event.body.name);
                  }

                  if (event.body.type === 'installationUpdate') {
                    path.push(event.body.action);
                  }

                  if (
                    event.body.type === 'messageDelete' ||
                    event.body.type === 'messageUpdate' ||
                    event.body.type === 'conversationUpdate'
                  ) {
                    path.push(event.body.channelData.eventType);
                  }

                  return (
                    <tr
                      className={classes.join(' ')}
                      onClick={() => setSelected(event)}
                    >
                      <td className="px-3 py-2 flex border-b border-l dark:border-stone-700 dark:group-hover:bg-stone-700 text-nowrap">
                        {
                          event.type === 'received' ?
                            <ArrowDownIcon className="h-4 w-4 my-auto" /> :
                            <ArrowUpIcon className="h-4 w-4 my-auto" />
                        }
                        <div className="my-auto ml-2 font-semibold">
                          {path.join('/')}
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b border-l border-r dark:border-stone-700 dark:group-hover:bg-stone-700">
                        <div className="flex">
                          <div className="flex-1 text-nowrap">
                            {new Date(event.updatedAt || event.sentAt).toLocaleString()}
                          </div>
                          {
                            event.type === 'sending' && (
                              <div className="animate-spin my-auto inline-block size-4 border-[3px] border-current border-t-transparent text-indigo-500 rounded-full dark:text-indigo-500" />
                            )
                          }
                        </div>
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
            <div className="flex flex-col flex-1 sm:max-w-[50%]">
              <div className="flex px-5 py-2">
                <div className="flex-1" />
                <div className="flex">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onChange={(event) => {
                        setView(event.target.checked ? 'json' : 'preview');
                      }}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {view === 'preview' ? 'Preview' : 'JSON'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flec-col flex-1 overflow-y-auto">
                <Json
                  value={selected.body}
                  stringify={view === 'json'}
                />
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
