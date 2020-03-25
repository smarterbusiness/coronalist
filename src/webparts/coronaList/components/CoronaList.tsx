import * as React from 'react';
import styles from './CoronaList.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICoronaListProps } from './ICoronaListProps';
import { ICoronaListState } from './ICoronaListState';
import { sp } from "@pnp/sp";
import CoronaCard from "./CoronaCard";

export default class CoronaList extends React.Component<ICoronaListProps, ICoronaListState> {
  constructor(props: ICoronaListProps) {
    super(props);

    this.state = {
      listItems: [
      ]
    };
  }

  public componentDidMount() {
      this.loadFAQItems()
      .then(spListItems => {
        this.setState(state => (
          {
            ...state,
            listItems: spListItems.map(item => ({title: item.Title, body: item.Content}))
          }
        ));
      });
  }

  public render(): React.ReactElement<ICoronaListProps> {
    return (
      <div className={styles.coronaList}>
        {this.state.listItems.length > 0 ?
          this.state.listItems.map((item) => <CoronaCard title={item.title} body={item.body}/>) :
          null
        }
      </div>
    );
  }

  private loadFAQItems() {
    return sp.web.lists
      .getByTitle("FAQ")
      .items
      .orderBy("Abfolge")
      .get();
  }
}


export interface ISectionProps {
  title: string;
}

export interface ISectionState {
  open: boolean;
  class: string;
}
