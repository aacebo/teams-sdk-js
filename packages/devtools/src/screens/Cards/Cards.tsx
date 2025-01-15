import AdaptiveCard from '../../components/Card';

import './Cards.css';

export default function Cards() {
  return (
    <div className="Cards">
      <div className="flex flex-1">
        <div className="flex flex-col gap-1">

        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-center">
            <AdaptiveCard value={{
                $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
                version: '1.6',
                type: 'AdaptiveCard',
                body: [
                  {
                    type: 'ColumnSet',
                    columns: [
                      {
                        type: 'Column',
                        items: [
                          { type: 'TextBlock', text: '- test  - test' }
                        ]
                      },
                      {
                        type: 'Column',
                        items: [
                          {
                            type: 'FactSet',
                            spacing: 'large',
                            facts: [
                              {
                                title: 'hello',
                                value: 'world'
                              },
                              {
                                title: 'Marlow',
                                value: 'Nancy'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'Icon',
                    name: 'Album',
                    size: 'Medium'
                  },
                  {
                    type: 'CodeBlock',
                    language: 'TypeScript',
                    codeSnippet: 'const test = (i: number) => {};'
                  },
                  {
                    type: 'ColumnSet',
                    columns: [
                      {
                        type: 'Column',
                        items: [
                          {
                            type: 'Badge',
                            icon: 'Add',
                            text: 'Add',
                            tooltip: 'hello world!',
                            style: 'attention',
                            shape: 'rounded',
                            appearance: 'tint'
                          }
                        ]
                      }
                    ]
                  }
                ]
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
