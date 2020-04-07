import * as React from "react";
import styles from "./CoronaCard.module.scss";

export interface CoronaCardProps {
  title: string;
  body: string;
}

export interface CoronaCardState {
  isExpanded: boolean;
}

export default class CoronaCard extends React.Component<CoronaCardProps, CoronaCardState>{
  private cardBodyRef;

  /**
   *
   */
  constructor(props) {
    super(props);
    this.cardBodyRef = React.createRef();
    this.onToggleExpand.bind(this);
    this.getCardHeightAsPixel.bind(this);
    this.renderBody.bind(this);
  }

  public readonly state: CoronaCardState = {
    isExpanded: false,
  };

  public render(): JSX.Element {
    return (
      <div className={styles.coronaCard}>
        <div className={styles["cardHeader"]} onClick={() => this.onToggleExpand()}>
          <h3 className={this.state.isExpanded ? styles["cardHeaderExpanded"] : styles["cardHeaderCollapsed"]}>
            <span>{this.props.title}</span>
          </h3>
        </div>
        <div className={styles.faqContent} style={{ "height": (this.state.isExpanded ? this.getCardHeightAsPixel() : "0px") }}>
          {this.renderBody()}
        </div>
      </div>
    );
  }

  private renderBody(): JSX.Element {
    return (<div className={styles.cardBody} ref={this.cardBodyRef}>{this.props.body.split("\n").map(line => (<p>{line}</p>))}</div>);
  }

  private getCardHeightAsPixel(): string {
    return `${this.cardBodyRef.current.clientHeight}px`;
  }

  private onToggleExpand() {
    this.setState(state => ({
      ...state,
      isExpanded: !state.isExpanded,
    }));
  }
}
