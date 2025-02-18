export const EXAMPLE_MESSAGES = [
  {
    id: '9',
    from: { user: { id: 'user' } },
    body: {
      contentType: 'text' as const,
      content: `Here are some code examples:

\`\`\`typescript
interface User {
  id: string;
  name: string;
}
\`\`\`

\`\`\`css
.message {
  color: blue;
  padding: 8px;
}
\`\`\`
`
    },
    createdDateTime: new Date().toISOString()
  },
  {
    id: '8',
    from: { user: { id: 'devtools' } },
    body: {
      contentType: 'text' as const,
      content: `
Here's a message with **bold text**, *italic text*, and ~~strikethrough~~.

> This is a blockquote
> With multiple lines

And a table:
| Feature | Status |
|---------|--------|
| Lists   | ✅     |
| Tables  | ✅     |
| Code    | ✅     |

\`Inline code\` is also supported.
      `
    },
    createdDateTime: new Date().toISOString()
  },
  {
    id: '7',
    from: { user: { id: 'user' } },
    body: {
      contentType: 'text' as const,
      content: `
- Unordered list item
- Another item
  - Nested item

1. Ordered list
2. Second item
   1. Nested numbered
    `
    },
    createdDateTime: new Date().toISOString()
  },
  {
    id: '6',
    from: { user: { id: 'user' } },
    body: {
      contentType: 'text' as const,
      content: 'Single line from the user'
    },
    createdDateTime: new Date(Date.now() - 20000).toISOString(),
  },
  {
    id: '5',
    from: { user: { id: 'devtools' } },
    body: {
      contentType: 'text' as const,
      content: 'Here is a link to [Fluent UI](https://react.fluentui.dev/) documentation.'
    },
    createdDateTime: new Date(Date.now() - 20000).toISOString(),
  },
  {
    id: '4',
    from: { user: { id: 'user' } },
    body: {
      contentType: 'text' as const,
      content: 'This is a message with an attachment'
    },
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          type: 'AdaptiveCard',
          version: '1.0',
          body: [
            {
              type: 'TextBlock',
              text: 'Example Card'
            }
          ]
        }
      }
    ],
    createdDateTime: new Date(Date.now() - 15000).toISOString(),
  },
  {
    id: '3',
    from: { user: { id: 'devtools' } },
    body: {
      contentType: 'text' as const,
      content: 'This is a streaming message...'
    },
    createdDateTime: new Date(Date.now() - 10000).toISOString(),
  },
  {
    id: '2',
    from: { user: { id: 'user' } },
    body: {
      contentType: 'text' as const,
      content: 'This is a received message with markdown: \n\n```js\nconsole.log("hello");\n```'
    },
    createdDateTime: new Date(Date.now() - 5000).toISOString(),
  },
  {
    id: '1',
    from: { user: { id: 'devtools' } },
    body: {
      contentType: 'text' as const,
      content: 'Hello! This is a regular sent message.'
    },
    createdDateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '0',
    from: { user: { id: 'user' } },
    body: {
      contentType: 'text' as const,
      content: `This is an older message from last week.\n\nHere is a longer paragraph of text that provides more context about the message. It can include additional details, explanations, or any relevant information that the user might find useful. This paragraph can be as long as necessary to convey the intended message clearly and effectively, ensuring that the recipient understands the content without any ambiguity.`
    },
    createdDateTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
