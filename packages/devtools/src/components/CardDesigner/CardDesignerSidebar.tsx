import { ActionSet, Badge, CodeBlock, ColumnSet, Container, Element, FactSet, Icon, Image, ImageSet, Media, RichTextBlock, TextBlock } from '@teams.sdk/cards';
import { FluentIcon, AddFilled, TableRegular, TextFontSizeRegular, TextWordCountRegular, TableLightningRegular, BadgeRegular, CodeRegular, ColumnTripleRegular, CheckboxUncheckedRegular, DocumentOnePageColumnsRegular, InfoRegular, ImageRegular, TableImageRegular, FilmstripPlayRegular } from '@fluentui/react-icons';

export interface CardDesignerSidebarProps {
  readonly onSelect?: (el: Element) => void;
}

interface CardGroup {
  readonly label: string;
  readonly cards: {
    readonly icon?: FluentIcon;
    readonly label: string;
    readonly value: Element;
  }[];
}

const groups: CardGroup[] = [
  {
    label: 'Containers',
    cards: [
      {
        icon: TableLightningRegular,
        label: 'ActionSet',
        value: ActionSet()
      },
      {
        icon: ColumnTripleRegular,
        label: 'ColumnSet',
        value: ColumnSet(),
      },
      {
        icon: CheckboxUncheckedRegular,
        label: 'Container',
        value: Container(),
      },
      {
        icon: DocumentOnePageColumnsRegular,
        label: 'FactSet',
        value: FactSet(),
      },
      {
        icon: TableImageRegular,
        label: 'ImageSet',
        value: ImageSet([
          Image('https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true'),
          Image('https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true'),
        ]),
      },
      {
        icon: TableRegular,
        label: 'Table',
        value: ImageSet(),
      }
    ]
  },
  {
    label: 'Media',
    cards: [
      {
        icon: BadgeRegular,
        label: 'Badge',
        value: Badge({
          style: 'attention',
          icon: 'Warning',
          text: 'an error badge example...',
          shape: 'rounded',
          size: 'extraLarge'
        }),
      },
      {
        icon: CodeRegular,
        label: 'CodeBlock',
        value: CodeBlock({
          codeSnippet: 'const helloWorld = () => console.log("hello, world!");',
          language: 'TypeScript',
        }),
      },
      {
        icon: InfoRegular,
        label: 'Icon',
        value: Icon('Info'),
      },
      {
        icon: ImageRegular,
        label: 'Image',
        value: Image('https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true'),
      },
      {
        icon: FilmstripPlayRegular,
        label: 'Media',
        value: Media(),
      },
      {
        icon: TextWordCountRegular,
        label: 'RichTextBlock',
        value: RichTextBlock(),
      },
      {
        icon: TextFontSizeRegular,
        label: 'TextBlock',
        value: TextBlock('hello world!'),
      }
    ]
  }
];

export default function CardDesignerSidebar({ onSelect }: CardDesignerSidebarProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-stone-900 gap-1 border-r dark:border-stone-800 shadow-md">
      {groups.map(group => (
        <div className="flex flex-col gap-1">
          <h2 className="text-large font-semibold bg-white dark:bg-stone-700 px-4 py-1">
            {group.label}
          </h2>

          {group.cards.map(card => (
            <button
              className="flex gap-1 px-4 py-1 transition duration-100 group dark:hover:bg-stone-800 dark:active:bg-stone-700"
              onClick={() => onSelect && onSelect(card.value)}
            >
              {card.icon && <card.icon className="my-auto" />}
              <div className="flex-1 my-auto text-start">{card.label}</div>
              <AddFilled className="my-auto ml-2 invisible transition duration-100 group-hover:visible " />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
