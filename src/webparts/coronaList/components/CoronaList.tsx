import * as React from 'react';
import styles from './CoronaList.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICoronaListProps } from './ICoronaListProps';
import { ICoronaListState } from './ICoronaListState';

export default class CoronaList extends React.Component<ICoronaListProps, ICoronaListState> {
  constructor(props: ICoronaListProps) {
    super(props);

    this.state = {
      listItems: [
      ]
    }
  }

  componentDidMount() {
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
          this.state.listItems.map(item => {
            return (
              <div>
                <details>
                  <summary>{item.title}</summary>
                  <div>{item.body}</div>
                </details>
              </div>
            )
          }) :
          null
        }
      </div>
    );
  }
}


export interface ISectionProps {
  title: string
}

export interface ISectionState {
  open: boolean,
  class: string
}