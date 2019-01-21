import React, { Component } from "react";
import { Dropdown, Table, Input } from "semantic-ui-react";
import "./messages-panel.css";
import PropTypes from "prop-types";
import MaleIcon from "./../../images/male.svg";
import FemaleIcon from "./../../images/female.svg";
import { inject, observer } from "mobx-react";

@inject("DataModel")
@observer
export class TweetsPanel extends Component {
  static propTypes = {
    DataModel: PropTypes.any.isRequired,
    tweetLevel: PropTypes.string
  };

  createRow(tweets) {
    return tweets.map((tweet, index) => {
      const icon =
        tweet.gender === "Male" ? (
          <img className="tweet-cell-icon" src={MaleIcon} />
        ) : (
          <img className="tweet-cell-icon" src={FemaleIcon} />
        );
      return (
        <Table.Row key={index} className="tweet-row">
          <Table.Cell className="message-table-header">
            {icon} <span className="tweet-message-span">{tweet.message}</span>
          </Table.Cell>
          <Table.Cell className="time-table-header">
            <span>{tweet.timestamp}</span>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  createTweetLevelDropdown() {
    if (!!this.props.DataModel.processflow) {
      const nodes = this.props.DataModel.processflow.nodes;
      let options = nodes.map(node => {
        return { text: node.name, value: node.name };
      });
      options = [{ text: "All", value: "All" }].concat(options);
      const defaultValue = this.props.DataModel.selectedNode;
      return (
        <Dropdown
          fluid
          selection
          options={options}
          value={defaultValue}
          onChange={this.tweetLevelChanged.bind(this)}
        />
      );
    }
  }

  tweetLevelChanged(event) {
    this.props.DataModel.setSelectedNode(event.currentTarget.innerText);
    this.props.DataModel.setSearchText("");
  }

  filterQueryChanged(event) {
    this.props.DataModel.setSearchText(event.target.value);
  }

  filterTweets(options) {
    const tweetsForNode = options.tweetsForNode;
    const searchText = options.searchText;
    const tweets = this.props.DataModel.twitterMessages.map(tweet => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        minute: "2-digit",
        hour: "2-digit"
      };
      const tweetDate = new Date(Date.parse(tweet.createdAt));
      const tweetTimestampStr = tweetDate.toLocaleDateString("en", options);

      return {
        timestamp: tweetTimestampStr,
        message: tweet.text,
        gender: tweet.gender,
        username: tweet.username
      };
    });
    let filteredtweets = tweets;
    if (searchText && searchText.length > 0) {
      filteredtweets = tweets.filter(tweet => {
        return tweet.message.includes(searchText);
      });
    }

    if (tweetsForNode !== "Twitter" && tweetsForNode !== "All") {
      if (tweetsForNode === "filter") {
        return filteredtweets.filter((tweet, index) => {
          if (index < 14) {
            return false;
          } else {
            return true;
          }
        });

      } else if (tweetsForNode === "DB") {
        return filteredtweets.filter((tweet, index) => {
          if (index > 14) {
            return false;
          } else {
            return true;
          }
        });
      }
    } else {
      return filteredtweets;
    }
  }

  render() {
    const tweets = this.filterTweets({
      tweetsForNode: this.props.DataModel.selectedNode,
      searchText: this.props.DataModel.searchText
    });
    return (
      <div className="tweet-panel">
        <div className="tweet-flex-row-container">
          <div className="tweet-select-level">
            {this.createTweetLevelDropdown()}
          </div>
          <div className="tweet-table-filter">
            <Input
              focus
              fluid
              placeholder="Filter"
              onChange={this.filterQueryChanged.bind(this)}
            />
          </div>
        </div>
        <Table className="tweet-table">
          <Table.Header className="tweet-table-header">
            <Table.HeaderCell className="message-table-header">
              Message
            </Table.HeaderCell>
            <Table.HeaderCell className="time-table-header">
              Time
            </Table.HeaderCell>
          </Table.Header>

          <Table.Body>{this.createRow(tweets)}</Table.Body>
        </Table>
      </div>
    );
  }
}
