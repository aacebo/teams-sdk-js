import { Card } from '@teams/cards';

export function oauth(user: any, photo: string): Card {
  return {
    type: 'AdaptiveCard',
    version: '1.6',
    body: [
      {
        type: 'ColumnSet',
        spacing: 'small',
        columns: [
          {
            type: 'Column',
            items: [
              {
                type: 'Image',
                url: photo,
              },
            ],
          },
          {
            type: 'Column',
            width: '65px',
            items: [
              {
                type: 'TextBlock',
                text: 'Name:',
                weight: 'bolder',
              },
              {
                type: 'TextBlock',
                text: 'Title:',
                weight: 'bolder',
              },
              {
                type: 'TextBlock',
                text: 'Email:',
                weight: 'bolder',
              },
            ],
          },
          {
            type: 'Column',
            items: [
              {
                type: 'TextBlock',
                text: user.displayName,
              },
              {
                type: 'TextBlock',
                text: user.jobTitle,
              },
              {
                type: 'TextBlock',
                text: user.mail,
              },
            ],
          },
        ],
      },
    ],
  };
}
