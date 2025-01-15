import { Badge, Card, CodeBlock, Column, ColumnSet, ExecuteAction, Fact, FactSet, Icon, OpenUrlAction, TextBlock } from '@teams.sdk/cards';

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
            <AdaptiveCard
              value={
                Card([
                  ColumnSet([
                    Column([
                      TextBlock('testing123')
                    ]),
                    Column([
                      FactSet([
                        Fact('hello', 'world'),
                        Fact('Marlow', 'Nancy')
                      ], { spacing: 'large' })
                    ])
                  ]),
                  Icon('Album', { size: 'Medium' }),
                  CodeBlock({
                    language: 'TypeScript',
                    codeSnippet: 'const test = (i: number) => {};'
                  }),
                  ColumnSet([
                    Column([
                      Badge({
                        icon: 'Add',
                        text: 'Add',
                        tooltip: 'hello world!',
                        style: 'attention',
                        shape: 'rounded',
                        appearance: 'tint'
                      })
                    ])
                  ])
                ], {
                  actions: [
                    ExecuteAction({ title: 'Cancel' }),
                    OpenUrlAction('https://www.google.com', {
                      title: 'Submit',
                      style: 'positive',
                      tooltip: 'Go To Google'
                    })
                  ]
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
