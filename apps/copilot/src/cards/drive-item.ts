import { Card, Column, Image, Media } from '@teams/cards';
import { formatDistanceToNowStrict } from 'date-fns';
import * as MSGraph from '@microsoft/microsoft-graph-types';

export interface DriveItemCardArgs {
  readonly item: MSGraph.DriveItem;
  readonly thumbnails: MSGraph.ThumbnailSet;
  readonly link: MSGraph.SharingLink;
}

export function driveItem({ item, thumbnails, link }: DriveItemCardArgs): Card {
  let url = item.webUrl || '#';
  let i = url.lastIndexOf('Forms/');
  const thumbnail = thumbnails.small || thumbnails.medium || thumbnails.large;

  if (i > -1) {
    url = url.slice(0, i);
    url += item.name || '#';
  }

  i = 0;
  let size = item.size || 0;
  const sizeFormats = ['bytes', 'kb', 'mb', 'gb', 'tb'];

  while (size >= 1000) {
    size = size / 1000;
    i++;
  }

  let preview: Image | Media = {
    type: 'Image',
    width: '100px',
    url: thumbnail?.url || '#',
  };

  if (item.file?.mimeType?.startsWith('audio') || item.file?.mimeType?.startsWith('video')) {
    preview = {
      type: 'Media',
      poster: thumbnail?.url?.toString() || url,
      sources: [
        {
          mimeType: item.file.mimeType,
          url,
        },
      ],
    };
  }

  const body: Column = {
    type: 'Column',
    items: [
      {
        type: 'TextBlock',
        text: item.name || '<no name>',
        style: 'heading',
        weight: 'bolder',
        horizontalAlignment: 'left',
      },
      {
        type: 'TextBlock',
        text: `${size.toFixed(2)} ${sizeFormats[i].toUpperCase()}`,
        horizontalAlignment: 'left',
      },
    ],
  };

  if (item.createdDateTime) {
    body.items?.push({
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          isSubtle: true,
          text: `created ${formatDistanceToNowStrict(item.createdDateTime)} ago`,
        },
      ],
    });
  }

  if (item.lastModifiedDateTime) {
    body.items?.push({
      type: 'Container',
      items: [
        {
          type: 'TextBlock',
          isSubtle: true,
          text: `updated ${formatDistanceToNowStrict(item.lastModifiedDateTime)} ago`,
        },
      ],
    });
  }

  return {
    type: 'AdaptiveCard',
    version: '1.6',
    body: [
      {
        type: 'ColumnSet',
        columns: [
          {
            type: 'Column',
            width: '100px',
            items: [preview],
          },
          body,
        ],
      },
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: 'Open',
        url: link.webUrl || url,
      },
      {
        id: 'summarize',
        type: 'Action.Submit',
        title: 'Summarize',
        tooltip: 'summarize the document contents',
        data: {
          id: item.id,
          name: 'summarize',
          msteams: {
            type: 'task/fetch',
          },
        },
      },
    ],
  };
}
