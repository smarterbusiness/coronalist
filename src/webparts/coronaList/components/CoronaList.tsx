import * as React from 'react';
import styles from './CoronaList.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICoronaListProps } from './ICoronaListProps';
import { ICoronaListState } from './ICoronaListState';
import { sp } from "@pnp/sp";

export default class CoronaList extends React.Component<ICoronaListProps, ICoronaListState> {
  constructor(props: ICoronaListProps) {
    super(props);

    this.state = {
      listItems: [
      ]
    }
  }

  componentDidMount() {
    let items = this.loadFAQItems();
    console.log(JSON.stringify(items));
    this.setState({
      listItems: [
        { title: "Test", body: "Lorem ipsum" },
        { title: "Test", body: "Lorem ipsum" },
        { title: "Test", body: "Lorem ipsum" }
      ]
    });
  }

  public render(): React.ReactElement<ICoronaListProps> {
    return (
      <div className="main">
        {this.state.listItems.length > 0 ?
          this.state.listItems.map((item, index) => {
            return (
              // <div>
              //   <details>
              //     <summary>{item.title}</summary>
              //     <div>{item.body}</div>
              //   </details>
              // </div>

              <div className={styles.card}>

                <div className={styles.cardHeader}>
                  <h3>
                    <span>{item.title}</span>
                    <button className={styles.btn} onClick={() => this.onCollapse()}>+</button>
                  </h3></div>
                <div className={styles.faqContent} id={"faq" + index + "Content"}>
                  <div className="cardBody">{item.body}</div>
                </div>
              </div>
            )
          }) :
          null
        }
      </div>
    );
  }

  private loadFAQItems() {
    return sp.web.lists
      .getByTitle("FAQ")
      .items;
  }

  private onCollapse() {

  }
}


export interface ISectionProps {
  title: string
}

export interface ISectionState {
  open: boolean,
  class: string
}