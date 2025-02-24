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
import './Activities.css';

import { ActivityContext } from '../../Stores/Activity';
import { ActivityEvent } from '../../Types/Event';
import { getPath } from '../../Utils/get-path';
import Json from '../../Components/Json/Json';

export default function Activities() {
  const { list } = useContext(ActivityContext);
  const [selected, setSelected] = useState<ActivityEvent>();
  const [view, setView] = useState<'preview' | 'json'>('preview');
  const [params, setParams] = useSearchParams();
  const activityPaths = [...new Set(list.map((event) => getActivityPath(event.body)))].sort();

  return (
    <div className="Activities">
      <div className="activities-container">
        <div className="activities-list">
          <table className="activities-table">
            <thead className="activities-header">
              <tr>
                <th scope="col" className="activities-header-cell">
                  <Menu>
                    <MenuButton className="menu-button">
                      <span className="menu-button-text">Type</span>
                      {activityPaths.length > 0 && <FilterRegular className="filter-icon" />}
                    </MenuButton>

                    <MenuItems
                      transition
                      anchor="bottom end"
                      className="menu-items"
                    >
                      {activityPaths.map((path) => (
                        <MenuItem key={path as any}>
                          <button
                            className="menu-item"
                            onClick={() => {
                              if (params.get('path') === path) {
                                params.delete('path');
                                return setParams(params);
                              }

                              params.set('path', path as any);
                              setParams(params);
                            }}
                          >
                            <span className="menu-item-text">{path}</span>
                            {params.has('path', path as any) && (
                              <CheckmarkFilled className="checkmark-icon" />
                            )}
                          </button>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </th>
                <th scope="col" className="activities-header-cell">Chat</th>
                <th scope="col" className="activities-header-cell">From</th>
                <th scope="col" className="activities-header-cell text-right">Timestamp</th>
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
                    'activity-row',
                    event.type === 'activity.error' ? 'text-red-500' : '',
                    selected?.id === event.id ? 'active' : '',
                  ].join(' ');

                  const path = getActivityPath(event.body);

                  return (
                    <tr
                      className={classes}
                      onClick={() => {
                        if (selected && selected.id === event.id) {
                          return setSelected(undefined);
                        }

                        setSelected(event);
                      }}
                    >
                      <td className="activity-cell">
                        {event.type === 'activity.received' ? (
                          <ArrowDownFilled className="icon" />
                        ) : (
                          <ArrowUpFilled className="icon" />
                        )}
                        <div className="activity-path">{path}</div>
                      </td>
                      <td className="activity-cell">
                        <div className="my-auto">
                          {event.body.conversation?.conversationType || '??'}
                        </div>
                      </td>
                      <td className="activity-cell">
                        {!!event.body.from ? <div className="my-auto">{event.body.from.name}</div> : <div className="my-auto">Unknown</div>}
                      </td>
                      <td className="activity-cell">
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
          <div className="activities-detail">
            <div className="flex px-5 py-2">
              <div className="flex-1" />

              <div className="mr-2">
                <button
                  className="copy-button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(selected));
                  }}
                >
                  <CopyRegular className="size-5 m-auto" />
                </button>
              </div>

              <div className="flex">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={(event) => {
                      setView(event.target.checked ? 'json' : 'preview');
                    }}
                  />
                  <div className="toggle-switch" />
                  <span className="toggle-text">
                    {view === 'preview' ? 'Preview' : 'JSON'}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flec-col flex-1 overflow-y-auto">
              <Json
                className="json-component"
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
