import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

export default class ScrollLoad extends React.Component {
  render() {
    const { children, loadMore, hasMore } = this.props

    return (
      <div>
        <InfiniteScroll
          pageStart={ 0 }
          loadMore={ loadMore }
          hasMore={ hasMore }
          loader={< div key={ 0 } >Loading ...</div>}
        >
          { children }
        </InfiniteScroll>
      </div>
    )
  }
}
