import { BaseElement } from '../base';
import { HorizontalAlignment } from '../common';
import { ChartColor } from './color';

export interface LineChart extends BaseElement {
  type: 'Chart.Line';

  /**
   * the title of the chart.
   */
  title?: string;

  /**
   * the color to use for all data points.
   */
  color?: ChartColor;

  /**
   * the name of the set of colors to use.
   */
  colorSet?: string;

  /**
   * the data to display in the chart.
   */
  data: LineChartData[];

  /**
   * the area of a `Layout.AreaGrid` layout in which an element should be displayed.
   */
  'grid.area'?: string;

  /**
   * controls how the element should be horizontally aligned.
   */
  horizontalAlignment?: HorizontalAlignment;
}

export interface LineChartData {
  /**
   * the color to use for the data point.
   */
  color?: ChartColor;

  /**
   * the legend of the chart.
   */
  legend?: string;

  /**
   * the data points in the series.
   */
  values: {
    /**
     * the x axis value of the data point.
     */
    x: number | string;

    /**
     * the y axis value of the data point.
     */
    y: number;
  }[];
}
