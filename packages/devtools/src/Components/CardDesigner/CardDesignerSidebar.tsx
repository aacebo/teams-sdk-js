import {
  ActionSet,
  Badge,
  CodeBlock,
  ColumnSet,
  Container,
  Element,
  Fact,
  FactSet,
  Icon,
  Image,
  ImageSet,
  Media,
  RichTextBlock,
  TextBlock,
} from '@teams.sdk/cards';
import {
  FluentIcon,
  AddFilled,
  TableRegular,
  TextFontSizeRegular,
  TextWordCountRegular,
  TableLightningRegular,
  BadgeRegular,
  CodeRegular,
  ColumnTripleRegular,
  CheckboxUncheckedRegular,
  DocumentOnePageColumnsRegular,
  InfoRegular,
  ImageRegular,
  TableImageRegular,
  FilmstripPlayRegular,
} from '@fluentui/react-icons/lib/fonts';

export interface CardDesignerSidebarProps {
  readonly onSelect?: (el: Element, ts: string) => void;
}

interface CardGroup {
  readonly label: string;
  readonly cards: {
    readonly icon?: FluentIcon;
    readonly label: string;
    readonly value: Element;
    readonly typescript: string;
  }[];
}

const groups: CardGroup[] = [
  {
    label: 'Containers',
    cards: [
      {
        icon: TableLightningRegular as FluentIcon,
        label: 'ActionSet',
        value: ActionSet(),
        typescript: 'ActionSet()',
      },
      {
        icon: ColumnTripleRegular as FluentIcon,
        label: 'ColumnSet',
        value: ColumnSet(),
        typescript: 'ColumnSet()',
      },
      {
        icon: CheckboxUncheckedRegular as FluentIcon,
        label: 'Container',
        value: Container(),
        typescript: 'Container()',
      },
      {
        icon: DocumentOnePageColumnsRegular as FluentIcon,
        label: 'FactSet',
        value: FactSet([Fact('hello', 'world')]),
        typescript: 'FactSet([Fact("hello", "world")])',
      },
      {
        icon: TableImageRegular as FluentIcon,
        label: 'ImageSet',
        value: ImageSet([
          Image('https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true'),
          Image('https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true'),
        ]),
        typescript: [
          'ImageSet([',
          '\tImage("https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true"),',
          '\tImage("https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true"),',
          '])',
        ].join('\n'),
      },
      {
        icon: TableRegular as FluentIcon,
        label: 'Table',
        value: ImageSet(),
        typescript: 'ImageSet()',
      },
    ],
  },
  {
    label: 'Media',
    cards: [
      {
        icon: BadgeRegular as FluentIcon,
        label: 'Badge',
        value: Badge({
          style: 'attention',
          icon: 'Warning',
          text: 'an error badge example...',
          shape: 'rounded',
          size: 'extraLarge',
        }),
        typescript: [
          'Badge({',
          '\tstyle: "attention",',
          '\ticon: "Warning",',
          '\ttext: "an error badge example...",',
          '\tshape: "rounded",',
          '\tsize: "extraLarge"',
          '})',
        ].join('\n'),
      },
      {
        icon: CodeRegular as FluentIcon,
        label: 'CodeBlock',
        value: CodeBlock({
          codeSnippet: 'const helloWorld = () => console.log("hello, world!");',
          language: 'TypeScript',
        }),
        typescript: [
          'CodeBlock({',
          '\tcodeSnippet: "const helloWorld = () => console.log(\'hello, world!\');",',
          '\tlanguage: "TypeScript"',
          '})',
        ].join('\n'),
      },
      {
        icon: InfoRegular as FluentIcon,
        label: 'Icon',
        value: Icon('Info'),
        typescript: 'Icon("Info")',
      },
      {
        icon: ImageRegular as FluentIcon,
        label: 'Image',
        value: Image(
          'https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true'
        ),
        typescript:
          'Image("https://github.com/aacebo/teams-sdk-js/blob/main/assets/icons/teams.png?raw=true")',
      },
      {
        icon: FilmstripPlayRegular as FluentIcon,
        label: 'Media',
        value: Media(),
        typescript: 'Media()',
      },
      {
        icon: TextWordCountRegular as FluentIcon,
        label: 'RichTextBlock',
        value: RichTextBlock(),
        typescript: 'RichTextBlock()',
      },
      {
        icon: TextFontSizeRegular as FluentIcon,
        label: 'TextBlock',
        value: TextBlock('hello world!'),
        typescript: 'TextBlock("hello world!")',
      },
    ],
  },
];

export default function CardDesignerSidebar({ onSelect }: CardDesignerSidebarProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-stone-900 gap-1 border-r dark:border-stone-800 shadow-md">
      {groups.map((group) => (
        <div className="flex flex-col gap-1">
          <h2 className="text-large font-semibold bg-white dark:bg-stone-700 px-4 py-1">
            {group.label}
          </h2>

          {group.cards.map((card) => (
            <button
              className="flex gap-1 px-4 py-1 transition duration-100 group dark:hover:bg-stone-800 dark:active:bg-stone-700"
              onClick={() => onSelect && onSelect(card.value, card.typescript)}
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
