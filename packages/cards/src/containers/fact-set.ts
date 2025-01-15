import { BaseElement } from '../base';

/**
 * The `FactSet` element displays a series of facts (i.e. name/value pairs) in a tabular form.
 */
export interface FactSet extends BaseElement {
  type: 'FactSet';

  /**
   * The array of `Fact`'s
   */
  facts: Fact[];
}

export type FactSetParams = Omit<FactSet, 'type'>;

/**
 * The `FactSet` element displays a series of facts (i.e. name/value pairs) in a tabular form.
 */
export function FactSet(params: FactSetParams): FactSet {
  return {
    type: 'FactSet',
    ...params,
  };
}

/**
 * Describes a `Fact` in a `FactSet` as a key/value pair.
 */
export interface Fact {
  /**
   * The title of the fact.
   */
  title: string;

  /**
   * The value of the fact.
   */
  value: string;
}
