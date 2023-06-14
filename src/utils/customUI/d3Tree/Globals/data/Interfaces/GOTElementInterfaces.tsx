import { TreeNodeDatum } from "react-d3-tree/lib/types/common";

export interface IDataNodeType extends TreeNodeDatum {
  __rd3t: { collapsed: boolean; depth: number; id: string };
  name: string;
  id?: string;
  attributes?: Record<string, string>;
  children?: IDataNodeType[];
}
