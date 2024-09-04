import { BaseElement } from '../base';
import { HorizontalAlignment } from '../common';
import { ChartColor } from './color';

export interface DonutChart extends BaseElement {
  type: 'Chart.Donut';

  /**
   * the title of the chart.
   */
  title?: string;

  /**
   * the name of the set of colors to use.
   */
  colorSet?: string;

  /**
   * the data to display in the chart.
   */
  data: DonutChartData[];

  /**
   * the area of a `Layout.AreaGrid` layout in which an element should be displayed.
   */
  'grid.area'?: string;

  /**
   * controls how the element should be horizontally aligned.
   */
  horizontalAlignment?: HorizontalAlignment;
}

export interface DonutChartData {
  /**
   * the color to use for the data point.
   */
  color?: ChartColor;

  /**
   * the legend of the chart.
   */
  legend?: string;

  /**
   * the value associated with the data point.
   */
  value: number;
}
