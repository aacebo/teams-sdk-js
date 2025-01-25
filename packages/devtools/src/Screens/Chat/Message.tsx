import * as marked from 'marked';
import * as api from '@teams.sdk/api';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

import AdaptiveCard from '../../Components/Card';
import './Message.css';

export interface MessageProps {
  readonly value: api.Message;
  readonly streaming?: boolean;
  readonly react?: (id: string, type: api.MessageReactionType) => void | Promise<void>;
}

export default function Message({
  value,
  streaming = false,
  react = () => {}
}: MessageProps) {
  const dir = value.from?.user?.id === 'devtools' ? 'sent' : 'received';
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    if (value.body?.contentType === 'text') {
      setHtml(marked.parse(
        value.body?.content || '',
        { async: false, gfm: true }
      ));
    }
  }, [value]);

  return (
    <div className={classNames(
      'Message',
      {
        'flex-row': dir === 'received',
        'flex-row-reverse': dir === 'sent'
      }
    )}>
      <div
        className={classNames(
          'flex', 'flex-col', 'max-w-[80%]',
          {
            'items-start': dir === 'received',
            'items-end': dir === 'sent'
          }
        )}
      >
        <div className={classNames(
          'flex', 'mb-1',
          {
            'ml-2': dir === 'received',
            'mr-2': dir === 'sent'
          }
        )}>
          {value.createdDateTime && (
            <div className="text-xs text-stone-400">
              {formatDistanceToNow(value.createdDateTime)}
            </div>
          )}
        </div>
        <div
          className={classNames(
            'flex', 'flex-col', 'relative', 'transition-all',
            'px-4', 'py-2', 'rounded-lg', 'text-sm', 'border',
            'border-transparent', 'group',
            {
              'bg-stone-400': dir === 'received',
              'bg-indigo-800': dir === 'sent',
              'dark:bg-stone-800': dir === 'received',
              'dark:bg-indigo-800': dir === 'sent',
              'Message__streaming': streaming
            }
          )}
        >
          <div
            className={classNames(
              'hidden', 'absolute', 'z-10', 'group-hover:flex', 'translate-all',
              'text-lg', 'rounded', 'px-3', 'py-1', 'shadow-2xl', 'dark:bg-stone-800',
              '-top-6',
              {
                'left-1': dir === 'received',
                'right-1': dir === 'sent'
              }
            )}
          >
            <button
              className="mr-1 transition hover:scale-125"
              onClick={() => react(value.id, 'like')}
            >
              👍
            </button>
            <button
              className="mr-1 transition hover:scale-125"
              onClick={() => react(value.id, 'heart')}
            >
              ❤️
            </button>
            <button
              className="mr-1 transition hover:scale-125"
              onClick={() => react(value.id, 'laugh')}
            >
              😆
            </button>
            <button
              className="transition hover:scale-125"
              onClick={() => react(value.id, 'surprised')}
            >
              😮
            </button>
          </div>

          <div className="flex flex-col aboslute z-10">
            {value.body?.content && <div className="inline break-all">
              {
                html ?
                <span className="inline break-all" dangerouslySetInnerHTML={{ __html: html }} /> :
                value.body?.content
              }
              {streaming && <div className="inline-flex bg-white w-[5px] h-[13px] ml-1 animate-pulse" />}
            </div>}
            {value.attachments && (
              <div className="flex gap-1 py-px">
                {value.attachments.map(a => {
                  return <AdaptiveCard value={(a as api.CardAttachmentTypes['adaptive']).content} />;
                })}
              </div>
            )}
          </div>

          {(value.reactions?.length || 0) > 0 && (
            <div
              className={classNames(
                'absolute', 'z-10', 'flex', 'translate-all', 'text-lg',
                'rounded', '-bottom-6',
                {
                  'left-1': dir === 'received',
                  'right-1': dir === 'sent'
                }
              )}
            >
              {value.reactions!.map((r) => {
                return (
                  <button
                    className="flex justify-center px-1 py-px my-auto dark:bg-stone-800 rounded-full shadow-lg [&:not(:last-child)]:mr-1"
                    onClick={() => react(value.id, r.type)}
                  >
                    <div className="flex my-auto flex-1">
                      {r.type === 'like'
                        ? '👍'
                        : r.type === 'heart'
                          ? '❤️'
                          : r.type === 'laugh'
                            ? '😆'
                            : r.type === 'surprised'
                              ? '😮'
                              : '??'}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
