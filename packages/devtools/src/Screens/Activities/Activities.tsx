import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Activity } from '@teams.sdk/api';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ArrowDownFilled,
  ArrowUpFilled,
  CheckmarkFilled,
  CopyRegular,
  FilterRegular,
} from '@fluentui/react-icons';
import '../../tailwind.css';
import './Activities.css';

import { ActivityContext } from '../../Stores';
import { ActivityEvent } from '../../Types';
import { getPath } from '../../Utils/get-path';
import Json from '../../Components/Json';

export default function Activities() {
  const { list } = useContext(ActivityContext);
  const [selected, setSelected] = useState<ActivityEvent>();
  const [view, setView] = useState<'preview' | 'json'>('preview');
  const [params, setParams] = useSearchParams();
  const activityPaths = [...new Set(list.map((event) => getActivityPath(event.body)))].sort();

  return (
    <div className="Activities">
      <div className="flex flex-col sm:flex-row flex-1 overflow-y-auto">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <table className="table-auto border-separate border-spacing-0 m-3 text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
            <thead className="text-xs text-stone-700 uppercase bg-stone-50 dark:bg-stone-900 dark:text-stone-400">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 w-14 border-t border-b border-l dark:border-stone-700"
                >
                  <Menu>
                    <MenuButton className="flex w-full text-left">
                      <span className="flex-1 uppercase font-bold">Type</span>
                      {activityPaths.length > 0 && <FilterRegular className="ml-2 size-4" />}
                    </MenuButton>

                    <MenuItems
                      transition
                      anchor="bottom end"
                      className="origin-top-right p-1 dark:bg-stone-800 rounded shadow-2xl text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      {activityPaths.map((path) => (
                        <MenuItem>
                          <button
                            key={path}
                            className="group flex w-full items-center gap-2 rounded py-px px-3 data-[focus]:bg-white/10"
                            onClick={() => {
                              if (params.get('path') === path) {
                                params.delete('path');
                                return setParams(params);
                              }

                              params.set('path', path);
                              setParams(params);
                            }}
                          >
                            <span className="flex-1 text-left">{path}</span>
                            {params.has('path', path) && (
                              <CheckmarkFilled className="ml-1 size-3" />
                            )}
                          </button>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </th>
                <th scope="col" className="px-3 py-2 w-64 text-nowrap border dark:border-stone-700">
                  Chat
                </th>
                <th scope="col" className="px-3 py-2 w-64 text-nowrap border dark:border-stone-700">
                  From
                </th>
                <th scope="col" className="px-3 py-2 border dark:border-stone-700 text-right">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {list
                .slice()
                .reverse()
                .filter((event) => {
                  for (const [key, filter] of params.entries()) {
                    const value = getPath(
                      {
                        ...event,
                        path: getActivityPath(event.body),
                      },
                      key
                    );

                    if (value != filter) {
                      return false;
                    }
                  }

                  return true;
                })
                .map((event) => {
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

                  if (event.type === 'activity.error') {
                    classes.push('text-red-500');
                  }

                  const path = getActivityPath(event.body);

                  return (
                    <tr
                      className={classes.join(' ')}
                      onClick={() => {
                        if (selected && selected.id === event.id) {
                          return setSelected(undefined);
                        }

                        setSelected(event);
                      }}
                    >
                      <td className="px-3 py-2 flex border-b border-l dark:border-stone-700 dark:group-hover:bg-stone-700 text-nowrap">
                        {event.type === 'activity.received' ? (
                          <ArrowDownFilled className="h-4 w-4 my-auto" />
                        ) : (
                          <ArrowUpFilled className="h-4 w-4 my-auto" />
                        )}
                        <div className="my-auto ml-2 font-semibold">{path}</div>
                      </td>
                      <td className="px-3 py-2 text-nowrap border-b border-l border-r dark:border-stone-700 dark:group-hover:bg-stone-700">
                        <div className="my-auto">
                          {event.body.conversation?.conversationType || '??'}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-nowrap border-b border-l border-r dark:border-stone-700 dark:group-hover:bg-stone-700">
                        {!!event.body.from && <div className="my-auto">{event.body.from.name}</div>}
                      </td>
                      <td className="px-3 py-2 border-b border-l border-r dark:border-stone-700 dark:group-hover:bg-stone-700">
                        <div className="flex">
                          <div className="flex-1 text-nowrap text-right">
                            {new Date(event.sentAt).toLocaleString()}
                          </div>
                          {event.type === 'activity.sending' && (
                            <div className="animate-spin my-auto inline-block size-4 border-[3px] border-current border-t-transparent text-indigo-500 rounded-full dark:text-indigo-500" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="flex flex-col flex-1 dark:border-stone-800 sm:max-w-[50%] sm:border-l">
            <div className="flex px-5 py-2">
              <div className="flex-1" />

              <div className="mr-2">
                <button
                  className="flex px-1.5 py-1 transition text-stone-400 hover:text-white hover:bg-stone-700 active:bg-stone-600 rounded-full"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(selected));
                  }}
                >
                  <CopyRegular className="size-5 m-auto" />
                </button>
              </div>

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
                className="mx-1"
                value={selected.type === 'activity.error' ? selected.error : selected.body}
                stringify={view === 'json'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getActivityPath(activity: Activity) {
  const path: Array<string> = [activity.type];

  if (activity.type === 'invoke' || activity.type === 'event' || activity.type === 'command') {
    path.push(activity.name);
  }

  if (activity.type === 'installationUpdate') {
    path.push(activity.action);
  }

  if (
    activity.type === 'messageDelete' ||
    activity.type === 'messageUpdate' ||
    activity.type === 'conversationUpdate'
  ) {
    path.push(activity.channelData.eventType);
  }

  return path.join('/');
}
