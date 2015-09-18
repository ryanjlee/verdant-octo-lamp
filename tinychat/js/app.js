var ChatApp = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      last_seen: null,
      name: null
    };
  },

  componentDidMount: function() {
    var name = prompt('Please enter your name:') || 'Anonymous';
    this.setState({name: name});
    this.loadMessages();

    // "Realtime"/checking for new messages in non-existant server
    // ===========================================================
    // setInterval(this.loadMessages, 1000);
  },

  loadMessages: function() {
    // Stub AJAX call that demos getting the fixture data
    $.getJSON("fixtures/fakedata.json", function(data) {
      // console.log(data.messages);
      this.setState({
        messages: data.messages,
        last_seen: data.last_seen
      });
    }.bind(this))
    .fail(function(err) {
      console.error('error: ', err);
    });
  },

  handleMessageSubmit: function(data) {
    data.id = this.state.messages.length + 1;
    var messages = this.state.messages;
    var updatedMessages = messages.concat([data]);
    this.setState({messages: updatedMessages});

    // Post request to currently non-existant server
    // ========================================================
    // $.post( "fixtures/fakedata.json", data, function(data) {
    //   this.setState({
    //     messages: data.messages,
    //     last_seen: data.last_seen
    //   });
    // }.bind(this))
    // .fail(function(err) {
    //   console.error('error: ', err);
    // });
  },
  
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top header">
          <div className="container">
            <div className="navbar-header">
              <h1>
                tinychat
                <span className="glyphicon glyphicon-bullhorn"></span>
                <span className="glyphicon glyphicon-globe"></span>
                <span className="glyphicon glyphicon-heart"></span>
              </h1>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 chat" >
              <MessageList messages={this.state.messages} />
              <ChatForm name={this.state.name} onMessageSubmit={this.handleMessageSubmit} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});


var MessageList = React.createClass({
  render: function() {
    var messages = this.props.messages.sort(function(a, b) {
      return a.id - b.id;
    }).map(function(message) {
      return (
        <Message message={message}>
        </Message>
      )
    });

    return (
      <div className="message-list">
        {messages}
      </div>
    )
  }
});

var Message = React.createClass({
  timeSince: function (date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  },

  convertLinks: function(string) {
    var regex = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.\-\?\=\&]*)*\/?/ig;
    var matches = string.match(regex);
    if (matches && !(/https?:\/\//).test(matches[0])) {
      var url = 'http://' + matches[0];
    }

    if (matches) {
      console.log(matches[0]);
      var remaining = string.split(regex);
      var content = <p><span className="author">{this.props.message.author}</span>: {remaining[0]}<a href={url}>{matches[0]}</a>{remaining[remaining.length - 1]}</p>;
    } else {
      content = <p><span className="author">{this.props.message.author}</span>: {string}</p>;
    }

    return content;
  },

  render: function() {
    var time = this.timeSince(this.props.message.timestamp) + ' ago';
    var content = this.convertLinks(this.props.message.content);
    
    return (
      <div className="row message">
        <div className="col-xs-8 col-sm-9">
          {content}
        </div>
        <div className="col-xs-4 col-sm-3">{time}</div>
      </div>
    )
  }
});


var ChatForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.text).value;
    var author = this.props.name;
    this.props.onMessageSubmit({
      author: author,
      timestamp: Date.now(),
      content: text
    });
    React.findDOMNode(this.refs.text).value = '';
  },

  render: function() {
    return (
      <div className="chat-form">
        <form className="navbar-form navbar-left" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter message" ref="text" />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
});


React.render(
  <ChatApp />,
  document.body
);
