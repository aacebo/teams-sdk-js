import { loader } from '@monaco-editor/react';
// import MarkdownIt from 'markdown-it';
import * as ACDesigner from 'adaptivecards-designer';

import 'adaptivecards-designer/dist/adaptivecards-designer.css';
import { useEffect, useRef } from 'react';

// ACDesigner.CardDesigner.onProcessMarkdown = (text, res) => {
//   res.outputHtml = new MarkdownIt().render(text);
//   res.didProcess = true;
// };

export default function ACBuilder() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loader.init().then(monaco => {
      if (!ref.current) return;
      const designer = new ACDesigner.CardDesigner(ACDesigner.defaultMicrosoftHosts);
      designer.attachTo(ref.current);
      designer.monacoModuleLoaded(monaco);
    });
  }, [ref]);

  return (
    <div ref={ref} />
  );
}
