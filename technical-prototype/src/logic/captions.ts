import * as _ from "lodash";
import * as t from "@/logic/types";


const headElemets = ["█", "▓", "▒", "░"];
const tailEements = ['▮', '▯', '▭', '▬', '▫', '▪', '▩', '▨', '▧', '▦', '▥', '▤', '▣', '▢', '□', '■', '▟', '▞', '▝', '▜', '▛', '▚', '▙', '▘', '▗', '▖', '▔', '▓', '▒', '░', '▐', '▌', '▋', '▊', '▉', '█', '▇', '▆', '▅', '▄', '▃', '▂', '▁', '█'];


function block(n: number): string {
  const text = [_.sample(headElemets)];

  for (let i = 0; i < n; i++) {
    text.push(_.sample(tailEements));
  }

  return text.join('');
}


export interface CaptionPart {
  readonly text: string;
  readonly classes: string[];
};


export function buildBlock(): string {
  const blockSize = Math.floor(Math.random() * 5) + 1;
  const blockText = block(blockSize);
  return {text: blockText, classes: []};
}


export function caption({themes, gameState}:
                        {themes: {[key: t.MaterialTheme]: t.MaterialThemeConnotation},
                         gameState: t.GameState}): string {
  const parts: CaptionPart[] = [];

  const randomizedThemes = _.shuffle(Object.keys(themes)).filter(theme => themes[theme] !== t.MaterialThemeConnotation.neutral);

  for (const theme of randomizedThemes) {
    const connotation = themes[theme];

    parts.push(buildBlock());

    const classes = [];

    if (connotation === t.MaterialThemeConnotation.positive) {
      classes.push('text-green-800');
    }
    else if (connotation === t.MaterialThemeConnotation.negative) {
      classes.push('text-red-800');
    }
    else {
      throw new Error(`Unknown connotation ${connotation}`);
    }

    let text = '';

    if (t.isPersonId(theme)) {
      text = gameState.persons[theme].name;
    }
    else if (t.isOrganizationId(theme)) {
      text = gameState.organizations[theme].name;
    }
    else if (t.isStatementId(theme)) {
      text = gameState.statements[theme].name({gameState});
    }

    parts.push({text: text, classes: classes});
  }

  if (Math.random() < 0.5) {
    parts.shift();
  }

  if (Math.random() < 0.5) {
    parts.push(buildBlock());
  }

  if (parts.length <= 1) {
    // push block to the beginning or the end
    if (Math.random() < 0.5) {
      parts.unshift(buildBlock());
    }
    else {
      parts.push(buildBlock());
    }
  }

  return parts.map(part => `<span class="${part.classes.join(' ')}">${part.text}</span>`).join(' ');
};
