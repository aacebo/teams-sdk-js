import { ComponentProps, useState } from 'react';

import Json from './Json';

export interface JsonObjectProps extends ComponentProps<'div'> {
  readonly value: Record<string, any>;
}

export default function JsonObject(props: JsonObjectProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ });
  const classes = props.className?.split(' ') || [];
  const hasObjectProperty = Object.values(props.value).some(v => typeof v === 'object');

  return (
    <div
      className={[
        ...classes,
        ...['flex', 'flex-col', 'overflow-y-auto'],
      ].join(' ')}
    >
      {
        Object.entries(props.value).map(([key, value]) => {
          const isObject = typeof value === 'object';
          const isExpanded = !!expanded[key];

          return (
            <div className="flex flex-col">
              <button
                className="flex"
                disabled={!isObject}
                onClick={() => {
                  setExpanded({
                    ...expanded,
                    [key]: !isExpanded,
                  });
                }}
              >
                {
                  isObject && (
                    <div className={['mr-2', 'my-auto', 'text-xs', 'transition', !isExpanded ? '-rotate-90' : ''].join(' ')}>
                      &#9660;
                    </div>
                  )
                }
                <div className={['text-sky-600', !isObject && hasObjectProperty ? 'ml-5' : ''].join(' ')}>
                  {key}
                </div>
                <span className="mr-2">:</span>
                {
                  (!isExpanded && isObject) && (
                    <div className="text-sm ny-auto truncate opacity-50 italic hover:underline">
                      {JSON.stringify(value, null, 2)}
                    </div>
                  )
                }
                {!isObject && <Json className="truncate hover:underline" value={value} />}
              </button>

              {isExpanded && <Json className="ml-7 truncate" value={value} />}
            </div>
          );
        })
      }
    </div>
  );
}
