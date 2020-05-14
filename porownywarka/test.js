import React from 'reactttt'
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }


  fetchData() {
      console.log('works')
      fetch('http://kliwo.realizacje.grupaaf.pl/api/units').then(res => {
          console.log('data', res.json())
      })
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.fetchData() },
      'Like'
    );
  }
}




const domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);